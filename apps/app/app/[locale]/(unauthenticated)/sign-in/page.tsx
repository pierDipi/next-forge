import {SignIn} from '../components/sign-in';
import {createMetadata} from '@repo/seo/metadata';
import {auth} from "@repo/auth";
import {redirect} from "next/navigation";
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary, locales} from "@repo/i18n/translations";

const title = 'Welcome back';
const description = 'Enter your details to sign in.';

interface SignInPageProps {
    params: Promise<{
        locale: LocaleCode
    }>;
}

export async function generateMetadata({params}: SignInPageProps) {
    const {locale} = await params
    const d = await getDictionary(locale)
    return createMetadata({
        title: title,
        description: description,
        locale: locale
    })
}

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
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
