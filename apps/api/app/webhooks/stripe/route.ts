import {analytics} from '@repo/analytics/posthog/server';
import {database} from '@repo/database';
import {env} from '@repo/env';
import {parseError} from '@repo/observability/error';
import {log} from '@repo/observability/log';
import type {Stripe} from '@repo/payments';
import {stripe} from '@repo/payments';

export const POST = async (request: Request): Promise<Response> => {
  try {
    log.debug("Received Stripe webhook event request")

    const signature = request.headers.get('Stripe-Signature');
    if (!signature) {
      log.error("Failed to get Stripe webhook signature");
      return Response.json(null, {status: 404});
    }

    const event = await stripe.webhooks.constructEventAsync(
      await request.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        return handleCheckoutSessionCompleted(event, event.data.object);
      }
      default: {
        log.warn(`[${event.id}] Unhandled event type ${event.type}`);
        return Response.json({ok: true}, {status: 200});
      }
    }

  } catch (error) {
    log.error(`Failed to process Stripe webhook event request: ${parseError(error)}`);

    return Response.json(
      {message: 'Something went wrong', ok: false},
      {status: 500}
    );
  }
};

const handleCheckoutSessionCompleted = async (
  event: Stripe.Event,
  data: Stripe.Checkout.Session
) => {

  log.debug(`[${event.id}][${event.type}][${data.id}]`, event, data)

  if (data.payment_status !== 'paid') {
    log.warn(`[${event.id}][${event.type}][${data.id}] Unexpected payment_status ${data.payment_status}`)
    return Response.json({ok: false}, {status: 200})
  }
  let lineItems: Array<Stripe.LineItem> = []
  if (data.line_items == undefined) {
    log.debug(`[${event.id}][${event.type}][${data.id}] Retrieving line items for session ${data.id}`, data.line_items)
    let hasMore = false
    do {
      const items = await stripe.checkout.sessions
        .listLineItems(data.id, {
          expand: ['data.price'],
          starting_after: lineItems.length > 0 ? lineItems[lineItems.length - 1].id : undefined
        })
      lineItems.push(...items.data)
      hasMore = items.has_more
    } while (hasMore)
  }

  log.debug(`[${event.id}][${event.type}][${data.id}] Line items`, lineItems)

  const user = data.customer_details ?
    await getUserFromCustomerEmail(data.customer_details) :
    await getUserFromCustomerEmail(data.customer_email)
  if (!user) {
    log.error(`[${event.id}][${event.type}][${data.id}] user cannot be found`)
    return Response.json({ok: false}, {status: 500})
  }

  for (let li of lineItems) {
    if (li.quantity == null || li.quantity <= 0) {
      log.warn(`[${event.id}][${event.type}][${data.id}][${user.stripeCustomerId}] Skipping null or 0 line item quantity`)
      continue
    }

    const product = await database.product.upsert({
      where: {
        stripeProductId: (typeof li.price?.product === 'string' ? li.price?.product : li.price?.product.id) ?? '',
      },
      update: {
        stripeProductId: (typeof li.price?.product === 'string' ? li.price?.product : li.price?.product.id) ?? '',
      },
      create: {
        stripeProductId: (typeof li.price?.product === 'string' ? li.price?.product : li.price?.product.id) ?? '',
      }
    })
    log.debug(`[${event.id}][${event.type}][${data.id}][${user.stripeCustomerId}] Database product ${product.id}`)

    const price = await database.price.upsert({
      where: {
        stripePriceId: li.price?.id ?? '',
      },
      update: {
        stripePriceId: li.price?.id ?? '',
        product: {
          connect: product,
        }
      },
      create: {
        stripePriceId: li.price?.id ?? '',
        product: {
          connect: product,
        }
      }
    })
    log.debug(`[${event.id}][${event.type}][${data.id}][${user.stripeCustomerId}] Database price ${price.id}`)

    const transaction = await database.transaction.create({
      data: {
        quantity: li.quantity,
        price: {
          connect: {id: price.id},
        },
        user: {
          connect: {id: user.id},
        },
      }
    })

    analytics.capture({
      event: stripeAnalyticsEvent(event),
      distinctId: user.id,
      properties: {
        stripeEventId: event.id,
        stripeCustomerId: user.stripeCustomerId,
        stripeProductId: product.stripeProductId,
        stripePriceId: price.stripePriceId,
        transactionId: transaction.id,
      },
    })

  }

  return Response.json({ok: true}, {status: 200});
};

interface Customer {
  email: string | null
}

const getUserFromCustomerEmail = async (customer: string | Customer | null) => {
  if (!customer) {
    throw new Error('expected customer');
  }

  const customerEmail = typeof customer === 'string' ? customer : customer.email;
  if (!customerEmail) {
    throw new Error('expected customer email');
  }

  return database.user.findUnique({
    where: {
      email: customerEmail,
    },
  });
};

function stripeAnalyticsEvent(event: Stripe.Event) {
  return `stripe-${event.type}`
}