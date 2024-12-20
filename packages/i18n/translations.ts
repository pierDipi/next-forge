import {LocaleCode, LocaleConfig} from "./middleware.js";
import React from "react";
import {env} from "@repo/env";

interface PageMetadata {
    title: string
    description: string
}

export interface Translation {
    web: {
        header: {
            home: string
            product: {
                title: string
                description: string
            }
            pricing: string
            blog: string
            docs?: string
            cta: string
            contact: string
        }
        footer: {
            legal: {
                title: string
                terms: string
                privacy: string
                acceptableUse: string
            }
            pages: {
                title: string
            }
            paragraph: string
        }
        home: {
            metadata: PageMetadata
            hero: {
                header: string
                paragraph: string
                badge: string
                contact: string
                cta: string
            }
            cases: {
                header: string
            }
            features: {
                header: string
                paragraph: string
                feature1: {
                    header: string
                    paragraph: string
                }
                feature2: {
                    header: string
                    paragraph: string
                }
                feature3: {
                    header: string
                    paragraph: string
                }
                feature4: {
                    header: string
                    paragraph: string
                }
            }
            stats: {
                header: string
                paragraph: string
                stat1: {
                    header: string
                    subheader: string
                    paragraph: string
                }
                stat2: {
                    header: string
                    subheader: string
                    paragraph: string
                }
                stat3: {
                    header: string
                    subheader: string
                    paragraph: string
                }
                stat4: {
                    header: string
                    subheader: string
                    paragraph: string
                }
            },
            testimonials: {
                header: string
                testimonials: {
                    header: string
                    paragraph: string
                    avatarImage?: string
                    name: string
                }[]
            }
            faq: {
                header: string
                paragraph: string
                contactCTA: string
                faqs: {
                    header: string
                    paragraph: string
                }[]
            },
            cta: {
                header: string
                paragraph: string
                contactCTA: string
                signupCTA: string
            }
        },
        pricing: {
            metadata: PageMetadata
            header: string
            paragraph: string
            plans: {
                header: string
                paragraph: string
                price: string
                cadence?: string
                features: {
                    icon?: React.ReactNode
                    header: string
                    paragraph?: string
                }[]
                cta: {
                    text: string
                    href: string
                }
            }[]
        }
        contact: {
            metadata: PageMetadata
            header: string
            paragraph: string
            advantages?: {
                icon?: React.ReactNode
                header: string
                paragraph?: string
            }[]
        }
    }
    app: {
        signin: {
            with: string
        }
        checkout: {
            action: {
                promptComplete: string
            }
        }
    }
}

// When adding new languages, make sure Stripe Checkout supports it.
const dictionaries = {
    en: async () => enTranslation,
}

// @ts-ignore
export const languages: LocaleCode[] = Object.keys(dictionaries)

export const locales: LocaleConfig = {
    locales: languages.map(value => {
        return {id: value}
    }),
    defaultLocale: {id: 'en'}
}


export const getDictionary = async (locale: LocaleCode): Promise<Translation> => {
    // @ts-ignore
    return dictionaries[locale]()
}

const enTranslation: Translation = {
    web: {
        header: {
            home: "Home",
            pricing: "Pricing",
            blog: "Blog",
            docs: "Docs",
            product: {
                title: "Product",
                description: "Managing a small business today is already tough."
            },
            cta: "Get started",
            contact: "Contact us",
        },
        footer: {
            paragraph: "This is the start of something new.",
            legal: {
                title: "Legal",
                terms: "Terms of Service",
                privacy: "Privacy Policy",
                acceptableUse: "Acceptable Use"
            },
            pages: {
                title: "Pages",
            },
        },
        home: {
            metadata: {
                title: "From zero to production in minutes.",
                description: "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, and more. It's all here.",
            },
            hero: {
                header: "This is the start of something!",
                paragraph:
                    `Managing a small business today is already tough. Avoid further
            complications by ditching outdated, tedious trade methods. Our
            goal is to streamline SMB trade, making it easier and faster than
            ever.`,
                badge: "We're live!",
                contact: "Get in touch",
                cta: "Sign up here"
            },
            cases: {
                header: "Trusted by thousands of businesses worldwide"
            },
            features: {
                header: "Something new!",
                paragraph: "Managing a small business today is already tough.",
                feature1: {
                    header: "Pay supplier invoices (1)",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever. (1)",
                },
                feature2: {
                    header: "Pay supplier invoices (2)",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever. (2)"
                },
                feature3: {
                    header: "Pay supplier invoices (3)",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever. (3)"
                },
                feature4: {
                    header: "Pay supplier invoices (4)",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever. (4)"
                }
            },
            stats: {
                header: "This is the start of something new",
                paragraph:
                    `Managing a small business today is already tough. Avoid further
                  complications by ditching outdated, tedious trade methods. Our
                  goal is to streamline SMB trade, making it easier and faster than
                  ever.`,
                stat1: {
                    header: "500.000",
                    subheader: "+20.1%",
                    paragraph: "Monthly active users"
                },
                stat2: {
                    header: "20.105",
                    subheader: "-2%",
                    paragraph: "Daily active users"
                },
                stat3: {
                    header: "$523.520",
                    subheader: "+8%",
                    paragraph: "Monthly recurring revenue"
                },
                stat4: {
                    header: "$1052",
                    subheader: "+2%",
                    paragraph: "Cost per acquisition"
                },
            },
            testimonials: {
                header: "Loved by thousands of users worldwide",
                testimonials: [
                    {
                        header: "Best decision",
                        paragraph:
                            `Our goal was to streamline SMB trade, making it easier
                    and faster than ever and we did it together.`,
                        avatarImage: "/blog/gdpr.png",
                        name: "John Johnsen"
                    },
                    {
                        header: "Best tool",
                        paragraph:
                            `Our goal was to streamline SMB trade, making it easier
                    and faster than ever and we did it together.`,
                        name: "John no image"
                    },
                ],
            },
            faq: {
                header: "This is the start of something new",
                paragraph:
                    `Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster
                than ever.`,
                contactCTA: "Any questions? Reach out",
                faqs: [
                    {
                        header: "This is the start of something new",
                        paragraph:
                            `Managing a small business today is already tough. Avoid further
                         complications by ditching outdated, tedious trade methods. Our
                         goal is to streamline SMB trade, making it easier and faster
                         than ever.`,
                    },
                ],
            },
            cta: {
                header: "Try our platform today!",
                paragraph:
                    `Managing a small business today is already tough. Avoid further
                 complications by ditching outdated, tedious trade methods. Our
                 goal is to streamline SMB trade, making it easier and faster
                 than ever.`,
                contactCTA: "Contact us",
                signupCTA: "Sign up here"
            }
        },
        pricing: {
            metadata: {
                title: "Pricing | From zero to production in minutes.",
                description: "next-forge is a production-grade boilerplate for modern Next.js apps. It's designed to have everything you need to build your new SaaS app as quick as possible. Authentication, billing, analytics, SEO, and more. It's all here.",
            },
            header: "Prices that make sense!",
            paragraph: "Managing a small business today is already tough.",
            plans: [
                {
                    header: "Startup",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.",
                    price: "$40",
                    cadence: "month",
                    features: [
                        {
                            header: "Fast and reliable",
                            paragraph: "We've made it fast and reliable."
                        }
                    ],
                    cta: {
                        text: "Sign up today",
                        href: `${env.NEXT_PUBLIC_APP_URL}/en/sign-in?plan=startup`
                    }
                },
                {
                    header: "Growth",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.",
                    price: "$40",
                    cadence: "month",
                    features: [
                        {
                            header: "Fast and reliable (1)",
                            paragraph: "We've made it fast and reliable."
                        },
                        {
                            header: "Fast and reliable (2)",
                            paragraph: "We've made it fast and reliable."
                        },
                        {
                            header: "Fast and reliable (3)",
                            paragraph: "We've made it fast and reliable."
                        }
                    ],
                    cta: {
                        text: "Sign up today",
                        href: `${env.NEXT_PUBLIC_APP_URL}/en/sign-in?plan=growth`
                    }
                },
                {
                    header: "One time",
                    paragraph: "Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.",
                    price: "$100",
                    features: [
                        {
                            header: "Fast and reliable (1)",
                            paragraph: "We've made it fast and reliable."
                        },
                        {
                            header: "Fast and reliable (2)",
                            paragraph: "We've made it fast and reliable."
                        },
                        {
                            header: "Fast and reliable (3)",
                        }
                    ],
                    cta: {
                        text: "Sign up today",
                        href: `${env.NEXT_PUBLIC_APP_URL}/en/sign-in?plan=onetime`
                    }
                }
            ]
        },
        contact: {
            metadata: {
                title: "Contact",
                description: "Let us know what's on your mind. We'll get back to you as soon as possible.",
            },
            header: "Something new",
            paragraph:
                `Managing a small business today is already tough. Avoid
             further complications by ditching outdated, tedious trade
             methods.`,
            advantages: [
                {
                    header: "Easy to use",
                    paragraph: "We've made it easy to use and understand."
                },
                {
                    header: "Fast and reliable",
                    paragraph: "We've made it easy to use and understand."
                },
                {
                    header: "Beautiful and modern",
                    paragraph: "We've made it easy to use and understand."
                },
            ],
        },
    },
    app: {
        signin: {
            with: "Sign in with",
        },
        checkout: {
            action: {
                promptComplete: "Complete your purchase"
            }
        }
    }
}
