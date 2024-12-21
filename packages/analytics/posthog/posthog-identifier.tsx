'use client';

import {analytics} from './client';
import {useSession} from '@repo/auth/client';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';

export const PostHogIdentifier = () => {
    return (
        <PostHogPageView/>
    )
};

const PostHogPageView = () => {
    const session = useSession();
    const identified = useRef(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log("tracking page view", pathname, searchParams.toString());
        // Track pageviews
        if (pathname && analytics) {
            let url = window.origin + pathname;
            if (searchParams.toString()) {
                url = `${url}?${searchParams.toString()}`;
            }
            analytics.capture('$pageview', {
                $current_url: url,
            });
        }
    }, [pathname, searchParams]);

    useEffect(() => {
        try {
            console.log("identify here")
            if (identified.current || !session?.data?.user?.email) {
                return;
            }
            const encoder = new TextEncoder();
            const data = encoder.encode(session.data.user.email);
            crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
                const id = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
                analytics.identify(id);

                console.log("user_id", id)

                identified.current = true;
            });
        } catch (error) {
            console.error(error);
        }

    }, [session]);

    return null;
}