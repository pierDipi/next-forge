import {createMetadata} from '@repo/seo/metadata';
import {getDictionary} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";
import {Check} from "lucide-react";
import {ContactForm} from "@/app/[locale]/contact/components/contact-form";

interface ContactProps {
    params: Promise<{
        locale: LocaleCode;
    }>
}

export async function generateMetadata({params}: ContactProps) {
    const {locale} = await params
    const d = await getDictionary(locale)
    return createMetadata({
        title: d.web.contact.metadata.title,
        description: d.web.contact.metadata.description,
        locale: locale
    })
}

interface ContactProps {
    params: Promise<{
        locale: LocaleCode;
    }>
}

const Contact = async ({params}: ContactProps) => {
    const {locale} = await params
    const d = await getDictionary(locale)
    const t = d.web.contact

    return (
        <div className="w-full py-20 lg:py-40">
            <div className="container mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h4
                                    className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                                    {t.header}
                                </h4>
                                <p
                                    className="max-w-sm text-left text-lg text-muted-foreground leading-relaxed tracking-tight">
                                    {t.paragraph}
                                </p>
                            </div>
                        </div>
                        {t.advantages?.map(a => (
                            <div key={a.header}
                                 className="flex flex-row items-start gap-6 text-left">
                                {a.icon ?? <Check className="mt-2 h-4 w-4 text-primary"/>}
                                <div className="flex flex-col gap-1">
                                    <p>{a.header}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {a.paragraph}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <ContactForm/>

                </div>
            </div>
        </div>
    )
};

export default Contact;
