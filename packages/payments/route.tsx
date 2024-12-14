import {stripe, Stripe} from "./index";
import {log} from "@repo/observability/log";
import {auth} from "@repo/auth";
import {getLocaleFromPath} from "@repo/i18n/middleware";
import {locales} from "@repo/i18n/translations";
import {NextRequest} from "next/server";

export function createCheckoutSession(params: (req: NextRequest) => Promise<Stripe.Checkout.SessionCreateParams>,
                                      options?: Stripe.RequestOptions): (req: NextRequest) => Promise<Response> {
  return async function POST(req: NextRequest): Promise<Response> {
    try {
      const userSession = await auth()
      if (!userSession) {
        return Response.json({error: "Authentication failed."}, {status: 401});
      }

      const p = await params(req)

      const locale = getLocaleFromPath(locales, req.nextUrl.pathname)
      p.locale = locale.id

      p.customer_email = userSession?.user?.email ?? undefined;
      const session = await stripe.checkout.sessions.create(p, options);

      return Response.json({clientSecret: session.client_secret})
    } catch (err) {
      log.error("Failed to create session", {err: err});
      return Response.json({error: "Failed to create session"}, {status: 500})
    }
  }
}

export function retrieveCheckoutSession(params?: Stripe.Checkout.SessionRetrieveParams,
                                        options?: Stripe.RequestOptions): (req: Request) => Promise<Response> {
  return async function GET(req: Request): Promise<Response> {
    try {
      const {searchParams} = new URL(req.url);
      const sessionID = searchParams.get('session_id')

      if (!sessionID) {
        return Response.json({error: "Empty session ID"}, {status: 400});
      }

      const session = await stripe.checkout.sessions.retrieve(sessionID, params, options);

      return Response.json({
        status: session.status,
        customer_email: session.customer_details?.email
      })
    } catch (err) {
      log.error("Failed to retrieve session", {err: err});
      return Response.json({error: "Failed to retrieve session"}, {status: 500})
    }
  }
}