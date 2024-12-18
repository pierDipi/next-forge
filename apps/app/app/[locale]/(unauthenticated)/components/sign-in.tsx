import {providers, signIn} from '@repo/auth';
import {Button} from '@repo/design-system/components/ui/button';
import Image from 'next/image';
import {getDictionary} from "@repo/i18n/dictionaries";
import {LocaleCode} from "@repo/i18n/middleware";

interface SignInProps {
    locale: LocaleCode
}

export const SignIn = async ({locale}: SignInProps) => {
    const d = await getDictionary(locale)
    return (
        <div className="flex flex-col space-y-2 text-center mx-12">
            {providers.map((provider) => (
                <form
                    key={provider.id}
                    action={async () => {
                        'use server';
                        await signIn(provider.id, {redirectTo: `/`});
                    }}
                    className="flex flex-col space-y-2 text-center"
                >
                    <Button
                        variant="default"
                        size="lg"
                        className={
                            'sm:text-sm text-md flex-grow bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 dark:bg-primary dark:text-primary-foreground dark:shadow dark:hover:bg-primary/90'
                        }
                        type="submit"
                    >
                        <div className="relative w-6 h-6 shrink-0">
                            <Image
                                src={'/signin/' + provider.id + '.svg'}
                                alt={ d.signin.with + ' ' + provider.name}
                                fill
                                style={{objectFit: 'contain'}}
                            />
                        </div>
                        {d.signin.with + ' ' + provider.name}
                    </Button>
                </form>
            ))}
        </div>
    );
}
