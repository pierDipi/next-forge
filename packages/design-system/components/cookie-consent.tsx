"use client";

import {analytics} from "@repo/analytics/posthog/client";
import CookieBanner, {CookieBannerProps} from "@repo/design-system/components/ui/cookie-banner";

export const CookieConsent = (props: CookieBannerProps) => {
  return <CookieBanner
    {...props}
    setCookieBannerState={(state) => {
      if (!state.captureAnalytics) {
        analytics.consent.optInOut(false)
        analytics.opt_out_capturing()
      } else {
        analytics.set_config({

        })
        analytics.opt_in_capturing({
          captureEventName: "nf_cookie_consent",
          captureProperties: state
        })
      }
    }}
  />
}
