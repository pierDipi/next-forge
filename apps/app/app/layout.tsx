import '@repo/design-system/styles/globals.css';
import {DesignSystemProvider} from '@repo/design-system';
import {fonts} from '@repo/design-system/lib/fonts';
import type {ReactNode} from 'react';
import Script from 'next/script';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({children}: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
  <Script src="https://js.stripe.com/v3/" async={true} strategy={'lazyOnload'}/>
  <body>
  <DesignSystemProvider>{children}</DesignSystemProvider>
  </body>
  </html>
);

export default RootLayout;
