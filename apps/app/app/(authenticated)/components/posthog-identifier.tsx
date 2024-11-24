'use client';

import {analytics} from '@repo/analytics/posthog/client';
import {useUser} from '@repo/auth/client';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useRef} from 'react';

export const PostHogIdentifier = () => {
  const user = useUser();
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
    if (!user || identified.current) {
      return;
    }

    analytics.identify(user.id, {
      email: user.email,
    });

    identified.current = true;
  }, [user]);

  return null;
};
