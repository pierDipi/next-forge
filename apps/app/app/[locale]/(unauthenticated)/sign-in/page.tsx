import {SignIn} from '../components/sign-in';
import {createMetadata} from '@repo/seo/metadata';
import type {Metadata} from 'next';
import {auth} from "@repo/auth";
import {redirect} from "next/navigation";
import {LocaleCode} from "@repo/i18n/middleware";

const title = 'Welcome back';
const description = 'Enter your details to sign in.';

export const metadata: Metadata = createMetadata({title, description});

interface SignInPageProps {
    params: Promise<{
        locale: LocaleCode
    }>;
}

const SignInPage = async ({params}: SignInPageProps) => {
    const {locale} = await params

    const session = await auth();
    if (session && session.user) {
        return redirect(`/${locale}`);
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
                <p className="text-muted-foreground text-md">{description}</p>
            </div>
            <SignIn locale={locale}/>
        </>
    );
}

export default SignInPage;
