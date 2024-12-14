import '@repo/design-system/styles/globals.css';
import './[locale]/styles/web.css';
import {DesignSystemProvider} from '@repo/design-system';
import {fonts} from '@repo/design-system/lib/fonts';
import type {ReactNode} from 'react';

type RootLayoutProperties = {
    readonly children: ReactNode;
};

const RootLayout = async ({children}: RootLayoutProperties) => {
    return (
        <html className={fonts} suppressHydrationWarning>
        <body>
        <DesignSystemProvider authDisabled={true}>
            {children}
        </DesignSystemProvider>
        </body>
        </html>
    );
};

export default RootLayout;
