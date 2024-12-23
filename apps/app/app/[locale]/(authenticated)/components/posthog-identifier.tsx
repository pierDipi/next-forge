'use client';

import {analytics} from '@repo/analytics/posthog/client';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';
import {useSession} from "@repo/auth/client";

export const PostHogIdentifier = () => {
  const {data: session} = useSession();
  const identified = useRef(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
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
    if (!session || !session.user || identified.current) {
      return;
    }

    analytics.identify(session.user.id);

    identified.current = true;
  }, [session]);

  return null;
};
