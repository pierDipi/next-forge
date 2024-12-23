"use client";

import React, {type ReactNode, useEffect, useState} from "react";
import {Button} from "./button";
import {Switch} from "./switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "./dialog";

export interface CookieBannerState {
  captureAnalytics: boolean;
}

export type CookieBannerProps = {
  title: string;
  text: string | ReactNode;
  accept: string

  essentialLabel: string;
  analyticsLabel: string;

  setCookieBannerState?: (state: CookieBannerState) => void;
};

const cookieConsentStorageKey = "cookie-consent";

const CookieBanner = ({
                        title,
                        text,
                        essentialLabel,
                        analyticsLabel,
                        accept,
                        setCookieBannerState
                      }: CookieBannerProps) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(cookieConsentStorageKey);
    if (storedConsent == null) {
      setIsBannerVisible(true); // Show banner if no consent is stored
    } else {
      const consentData: CookieBannerState = JSON.parse(storedConsent);
      if (setCookieBannerState) {
        setCookieBannerState(consentData);
      }
    }
  }, []);

  const handle = () => {
    const state: CookieBannerState = {captureAnalytics: analyticsConsent};
    localStorage.setItem(cookieConsentStorageKey, JSON.stringify(state));
    if (setCookieBannerState) {
      setCookieBannerState(state);
    }
    setIsBannerVisible(false);
  };

  if (!isBannerVisible) return null;

  return (
    <Dialog open={isBannerVisible}>
      <DialogContent aria-describedby={title} className="bg-white p-6 shadow-lg rounded-lg max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {text}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{essentialLabel}</span>
            <Switch checked={true} disabled className="pointer-events-none"/>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{analyticsLabel}</span>
            <Switch
              checked={analyticsConsent}
              onCheckedChange={setAnalyticsConsent}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant={'ghost'} onClick={handle}>
            {accept}
          </Button>
          <Button onClick={handle}>
            {accept}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CookieBanner;
