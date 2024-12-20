import {Button} from '@repo/design-system/components/ui/button';
import {env} from '@repo/env';
import {MessageCircleMore, MoveRight} from 'lucide-react';
import Link from 'next/link';
import {LocaleCode} from "@repo/i18n/middleware";
import {Badge} from "@repo/design-system/components/ui/badge";
import {getDictionary} from "@repo/i18n/translations";

interface HeroProps {
    locale: LocaleCode
}

export const Hero = async ({locale}: HeroProps) => {
    const d = await getDictionary(locale)
    const t = d.web.home.hero

    return (
        <div className="w-full  py-20 lg:py-30">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                    <div className="flex gap-4 flex-col">
                        <div>
                            <Badge variant="outline">{t.badge}</Badge>
                        </div>
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                                {t.header}
                            </h1>
                            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                                {t.paragraph}
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">

                            <Link href={`/${locale}/contact`}>
                                <Button size="lg_md" className="gap-4" variant="outline">
                                    {t.contact} <MessageCircleMore className="h-4 w-4"/>
                                </Button>
                            </Link>

                            <Link href={`${env.NEXT_PUBLIC_APP_URL}/${locale}`}>
                                <Button size="lg_md" className="gap-4">
                                    {t.cta} <MoveRight className="w-4 h-4"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-muted rounded-md aspect-square"></div>
                </div>
            </div>
        </div>
    )
}
