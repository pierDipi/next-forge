import {showBetaFeature} from '@repo/feature-flags';
import {createMetadata} from '@repo/seo/metadata';
import type {Metadata} from 'next';
import {Cases} from './components/cases';
import {CTA} from './components/cta';
import {FAQ} from './components/faq';
import {Features} from './components/features';
import {Hero} from './components/hero';
import {Stats} from './components/stats';
import {Testimonials} from './components/testimonials';
import {LocaleCode} from "@repo/i18n/middleware";
import {locales} from "@repo/i18n/translations";

const meta = {
  title: 'From zero to production in minutes.',
  description:
    "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, and more. It's all here.",
};

export async function generateStaticParams() {
    return locales.locales.map((l) => ({locale: l.id}))
}

export const metadata: Metadata = createMetadata(meta);

interface HomeProps {
    params: Promise<{
        locale: LocaleCode
    }>;
}

const Home = async ({params}: HomeProps) => {
  const betaFeature = await showBetaFeature();

  const {locale} = await params

  return (
    <>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      <Hero locale={locale}/>
      <Cases/>
      <Features/>
      <Stats/>
      <Testimonials/>
      <FAQ/>
      <CTA/>
    </>
  );
};

export default Home;
