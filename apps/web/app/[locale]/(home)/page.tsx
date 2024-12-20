import {Cases} from './components/cases';
import {CTA} from './components/cta';
import {FAQ} from './components/faq';
import {Features} from './components/features';
import {Hero} from './components/hero';
import {Stats} from './components/stats';
import {Testimonials} from './components/testimonials';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary, locales} from "@repo/i18n/translations";

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
}

interface HomeProps {
    params: Promise<{
        locale: LocaleCode
    }>;
}

export async function generateMetadata({params}: HomeProps) {
    const {locale} = await params
    const d = await getDictionary(locale)
    return d.web.home.metadata
}

const Home = async ({params}: HomeProps) => {
    const {locale} = await params
    const d = await getDictionary(locale)

    return (
        <>
            <Hero locale={locale}/>
            <Cases header={d.web.home.cases.header}/>
            <Features locale={locale}/>
            <Stats locale={locale}/>
            <Testimonials locale={locale}/>
            <FAQ locale={locale}/>
            <CTA locale={locale}/>
        </>
    );
};

export default Home;
