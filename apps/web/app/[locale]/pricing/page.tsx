import {Button} from '@repo/design-system/components/ui/button';
import {Check, MoveRight} from 'lucide-react';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary, locales} from "@repo/i18n/translations";
import {Badge} from "@repo/design-system/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@repo/design-system/components/ui/card";
import Link from "next/link";
import {createMetadata} from "@repo/seo/metadata";

interface PricingProps {
    params: Promise<{
        locale: LocaleCode;
    }>
}

export async function generateMetadata({params}: PricingProps) {
    const {locale} = await params
    const d = await getDictionary(locale)
    return createMetadata({
        title: d.web.pricing.metadata.title,
        description: d.web.pricing.metadata.description,
        locale: locale
    })
}

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
}

const Pricing = async ({params}: PricingProps) => {
    const {locale} = await params
    const d = await getDictionary(locale)

    return (
        <div className="w-full py-20 lg:py-30">
            <div className="container mx-auto">
                <div className="flex text-center justify-center items-center gap-4 flex-col">
                    <Badge>Pricing</Badge>
                    <div className="flex gap-2 flex-col">
                        <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
                            {d.web.pricing.header}
                        </h2>
                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
                            {d.web.pricing.paragraph}
                        </p>
                    </div>
                    <div className="grid pt-14 text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
                        {d.web.pricing.plans.map(p => {
                            return (
                                <Card key={p.header} className="w-full rounded-md flex flex-col">
                                    <CardHeader>
                                        <CardTitle>
                                            <span
                                                className="flex flex-row gap-4 items-center font-medium text-xl">
                                                {p.header}
                                            </span>
                                        </CardTitle>
                                        <CardDescription>
                                            {p.paragraph}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-1">
                                        <div className="flex flex-col flex-1">
                                            <p className="flex flex-row items-center gap-2 text-xl">
                                                <span className="text-4xl">{p.price}</span>
                                                {
                                                    p.cadence ?
                                                        <span
                                                            className="text-sm text-muted-foreground">{" /"} {p.cadence}</span>
                                                        : null
                                                }
                                            </p>
                                            <div
                                                className="flex flex-col gap-4 justify-start mt-8 mb-8">
                                                {p.features.map(f => (
                                                    <div key={f.header}
                                                         className="flex flex-row gap-4">
                                                        {f.icon ? (
                                                            f.icon
                                                        ) : (
                                                            <Check
                                                                className="w-4 h-4 mt-2 text-primary"/>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <p>{f.header}</p>
                                                            {f.paragraph ? (
                                                                <p className="text-muted-foreground text-sm">
                                                                    {f.paragraph}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <Button className="gap-4 mt-auto" variant="default"
                                                    asChild>
                                                <Link href={p.cta.href}>
                                                    {p.cta.text} <MoveRight className="w-4 h-4"/>
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;
