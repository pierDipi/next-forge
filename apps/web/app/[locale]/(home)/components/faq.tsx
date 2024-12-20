import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/design-system/components/ui/accordion';
import {Button} from '@repo/design-system/components/ui/button';
import {PhoneCall} from 'lucide-react';
import Link from 'next/link';
import {LocaleCode} from "@repo/i18n/middleware";
import {getDictionary} from "@repo/i18n/translations";

interface FAQProps {
  locale: LocaleCode
}

export const FAQ = async ({locale}: FAQProps) => {
  const d = await getDictionary(locale)
  const t = d.web.home.faq
  return (
      <div className="w-full py-20 lg:py-30">
        <div className="container mx-auto">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                    {t.header}
                  </h4>
                  <p
                      className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
                    {t.paragraph}
                  </p>
                </div>
                <div className="">
                  <Button className="gap-4" variant="outline" asChild>
                    <Link href={`/${locale}/contact`}>
                      {t.contactCTA} <PhoneCall className="h-4 w-4"/>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {t.faqs.map((f, index) => (
                  <AccordionItem key={index} value={`index-${index}`}>
                    <AccordionTrigger>
                      {f.header}
                    </AccordionTrigger>
                    <AccordionContent>
                      {f.paragraph}
                    </AccordionContent>
                  </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
  );
}
