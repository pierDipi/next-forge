import {createCheckoutSession, retrieveCheckoutSession} from "@repo/payments/route"
import {env} from "@repo/env";

export const POST = createCheckoutSession(async (req) => {
    return {
        ui_mode: 'embedded',
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of
                // the product you want to sell
                price: 'price_1QC1NZBhAQUWkBBSns1U5Ntr',
                quantity: 1,
            },
        ],
        mode: 'payment',
        return_url:
            `${env.NEXT_PUBLIC_APP_URL}?session_id={CHECKOUT_SESSION_ID}`,
    }
})

export const GET = retrieveCheckoutSession({}, {})
