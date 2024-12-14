import type {ReactNode} from 'react';
import {Footer} from './components/footer';
import {Header} from './components/header';
import {LocaleCode} from "@repo/i18n/middleware";

type RootLayoutProperties = {
    readonly children: ReactNode;
    params: Promise<{
        locale: LocaleCode
    }>
};

const Layout = async ({children, params}: RootLayoutProperties) => {
    const {locale} = await params
    return (
        <div>
            <Header locale={locale}/>
            {children}
            <Footer locale={locale}/>
        </div>
    );
};

export default Layout;
