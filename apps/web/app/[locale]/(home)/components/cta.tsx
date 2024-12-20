import {Button} from '@repo/design-system/components/ui/button';
import {env} from '@repo/env';
import {MoveRight, PhoneCall} from 'lucide-react';
import Link from 'next/link';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary} from "@repo/i18n/translations";

interface CTAProps {
  locale: LocaleCode
}

export const CTA = async ({locale}: CTAProps) => {
  const d = await getDictionary(locale)
  const t = d.web.home.cta
  return (
      <div className="w-full py-20 lg:py-30">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
            <div className="flex flex-col gap-2">
              <h3 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">
                {t.header}
              </h3>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed tracking-tight">
                {t.paragraph}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <Button className="gap-4" variant="outline" asChild>
                <Link href={`/${locale}/contact`}>
                  {t.contactCTA} <PhoneCall className="h-4 w-4"/>
                </Link>
              </Button>
              <Button className="gap-4" asChild>
                <Link href={env.NEXT_PUBLIC_APP_URL + `/${locale}/sign-in`}>
                  {t.signupCTA} <MoveRight className="h-4 w-4"/>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
}
