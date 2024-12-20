import {TestimonialsClient} from "@/app/[locale]/(home)/components/testimonialsClient";
import {getDictionary} from "@repo/i18n/translations";
import {LocaleCode} from "@repo/i18n/middleware";

interface TestimonialsProps {
    locale: LocaleCode
}

export const Testimonials = async ({locale}: TestimonialsProps) => {
    const d = await getDictionary(locale)
    return (
        <TestimonialsClient text={d.web.home.testimonials}/>
    );
};
