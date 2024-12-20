import {MoveDownLeft, MoveUpRight} from 'lucide-react';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary} from "@repo/i18n/translations";

interface StatsProps {
    locale: LocaleCode
}

export const Stats = async ({locale}: StatsProps) => {
    const d = await getDictionary(locale)
    const t = d.web.home.stats

    return (
        <div className="w-full py-20 lg:py-30">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-left font-regular text-xl tracking-tighter md:text-5xl lg:max-w-xl">
                                {t.header}
                            </h2>
                            <p
                                className="text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-sm">
                                {t.paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div
                            className="grid w-full grid-cols-1 gap-2 text-left sm:grid-cols-2 lg:grid-cols-2">
                            <div
                                className="flex flex-col justify-between gap-0 rounded-md border p-6">
                                <MoveUpRight className="mb-10 h-4 w-4 text-primary"/>
                                <h2
                                    className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                                    {t.stat1.header}
                                    <span
                                        className="text-muted-foreground text-sm tracking-normal">{t.stat1.subheader}</span>
                                </h2>
                                <p
                                    className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                                    {t.stat1.paragraph}
                                </p>
                            </div>
                            <div
                                className="flex flex-col justify-between gap-0 rounded-md border p-6">
                                <MoveDownLeft className="mb-10 h-4 w-4 text-destructive"/>
                                <h2
                                    className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                                    {t.stat2.header}
                                    <span className="text-muted-foreground text-sm tracking-normal">{t.stat2.subheader}</span>
                                </h2>
                                <p
                                    className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                                    {t.stat2.paragraph}
                                </p>
                            </div>
                            <div
                                className="flex flex-col justify-between gap-0 rounded-md border p-6">
                                <MoveUpRight className="mb-10 h-4 w-4 text-primary"/>
                                <h2
                                    className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                                    {t.stat3.header}
                                    <span className="text-muted-foreground text-sm tracking-normal">{t.stat3.subheader}</span>
                                </h2>
                                <p
                                    className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                                    {t.stat3.paragraph}
                                </p>
                            </div>
                            <div
                                className="flex flex-col justify-between gap-0 rounded-md border p-6">
                                <MoveUpRight className="mb-10 h-4 w-4 text-primary"/>
                                <h2
                                    className="flex max-w-xl flex-row items-end gap-4 text-left font-regular text-4xl tracking-tighter">
                                    {t.stat4.header}
                                    <span className="text-muted-foreground text-sm tracking-normal">{t.stat4.subheader}</span>
                                </h2>
                                <p
                                    className="max-w-xl text-left text-base text-muted-foreground leading-relaxed tracking-tight">
                                    {t.stat4.paragraph}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
