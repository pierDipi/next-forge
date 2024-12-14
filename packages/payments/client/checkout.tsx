"use client";

import {useCallback} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import {env} from "@repo/env";
import {log} from "@repo/observability/log";
import {LocaleCode} from "@repo/i18n/middleware";


interface CheckoutProps {
    path: string
    title: string
    locale: LocaleCode
}

export const Checkout = ({title, path, locale}: CheckoutProps) => {
    const options = {
        fetchClientSecret: createCheckoutSession(path),
    };

    const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
        locale: 'it'
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="w-full max-w-2xl p-6 bg-card border border-border rounded-lg shadow-lg">
                <h1 className="mb-4 text-xl font-semibold text-center text-primary">
                    {title}
                </h1>
                <div id="checkout">
                    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                        <EmbeddedCheckout/>
                    </EmbeddedCheckoutProvider>
                </div>
            </div>
        </div>
    );
};


function createCheckoutSession(path: string) {
    log.debug(`Create checkout session, fetching checkout session from ${path}`);

    return useCallback(async () => {
        let res = await fetch(path, {method: "POST",});
        let data: any = await res.json();
        return await data.clientSecret;
    }, []);
}
