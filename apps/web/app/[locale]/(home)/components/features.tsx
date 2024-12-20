import {User} from 'lucide-react';
import {getDictionary} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";

interface FeaturesProps {
    locale: LocaleCode
}

export const Features = async ({locale}: FeaturesProps) => {
    const d = await getDictionary(locale)
    const t = d.web.home.features

    return (
        <div className="w-full py-20 lg:py-30">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                                {t.header}
                            </h2>
                            <p
                                className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
                                {t.paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div
                            className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto">
                            <User className="h-8 w-8 stroke-1"/>
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight">{t.feature1.header}</h3>
                                <p className="max-w-xs text-base text-muted-foreground">
                                    {t.feature1.paragraph}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6">
                            <User className="h-8 w-8 stroke-1"/>
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight">{t.feature2.header}</h3>
                                <p className="max-w-xs text-base text-muted-foreground">
                                    {t.feature2.paragraph}
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex aspect-square flex-col justify-between rounded-md bg-muted p-6">
                            <User className="h-8 w-8 stroke-1"/>
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight">{t.feature3.header}</h3>
                                <p className="max-w-xs text-base text-muted-foreground">
                                    {t.feature3.paragraph}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex aspect-square h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2 lg:aspect-auto">
                            <User className="h-8 w-8 stroke-1"/>
                            <div className="flex flex-col">
                                <h3 className="text-xl tracking-tight">{t.feature4.header}</h3>
                                <p className="max-w-xs text-base text-muted-foreground">
                                    {t.feature4.paragraph}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
