'use client';

import {Avatar, AvatarFallback, AvatarImage,} from '@repo/design-system/components/ui/avatar';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@repo/design-system/components/ui/carousel';
import {CircleUser, User} from 'lucide-react';
import {useEffect, useState} from 'react';

export interface TestimonialsClientProps {
    text: {
        header: string
        testimonials: {
            header: string
            paragraph: string
            avatarImage?: string
            name: string
        }[]
    }
}

export const TestimonialsClient = ({text}: TestimonialsClientProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 4000);
    }, [api, current]);

    return (
        <div className="w-full py-20 lg:py-30">
            <div className="container mx-auto">
                <div className="flex flex-col gap-10">
                    <h2 className="text-left font-regular text-3xl tracking-tighter md:text-5xl lg:max-w-xl">
                        {text.header}
                    </h2>
                    <Carousel setApi={setApi} className="w-full">
                        <CarouselContent>
                            {text.testimonials.map((h, index) => (
                                <CarouselItem className="lg:basis-1/2" key={index}>
                                    <div
                                        className="flex aspect-video h-full flex-col justify-between rounded-md bg-muted p-6 lg:col-span-2">
                                        <User className="h-8 w-8 stroke-1"/>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col">
                                                <h3 className="text-xl tracking-tight">
                                                    {h.header}
                                                </h3>
                                                <p className="max-w-xs text-base text-muted-foreground">
                                                    {h.paragraph}
                                                </p>
                                            </div>
                                            <p className="flex flex-row items-center gap-2 text-sm">
                                                <span className="text-muted-foreground">By</span>
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={h.avatarImage}/>
                                                    <AvatarFallback>
                                                        <CircleUser/>
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{h.name}</span>
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};
