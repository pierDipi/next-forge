'use client';

import {ModeToggle} from '@repo/design-system/components/ui/mode-toggle';
import {Button} from '@repo/design-system/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@repo/design-system/components/ui/navigation-menu';
import {env} from '@repo/env';
import {Menu, MoveRight, X} from 'lucide-react';
import Link from 'next/link';
import {useState} from 'react';

import Image from 'next/image';
import Logo from './logo.svg';
import {LocaleCode} from "@repo/i18n/middleware";

interface HeaderProps {
    locale: LocaleCode

    contact: string
    cta: string
    navigationItems: {
        title?: string
        href?: string
        description?: string
        items?: {
            title: string
            href: string
        }[]
    }[]
}

export const HeaderClient = ({locale, navigationItems, contact, cta}: HeaderProps) => {

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="sticky top-0 left-0 z-40 w-full border-b bg-background">
            <div
                className="container relative mx-auto flex min-h-20 flex-row items-center gap-4 lg:grid lg:grid-cols-3">
                <div className="hidden flex-row items-center justify-start gap-4 lg:flex">
                    <NavigationMenu className="flex items-start justify-start">
                        <NavigationMenuList className="flex flex-row justify-start gap-4">
                            {navigationItems
                                .filter(item => item.title !== undefined)
                                .map((item) => (
                                    <NavigationMenuItem key={item.title}>
                                        {item.href ? (
                                            <>
                                                <NavigationMenuLink asChild>
                                                    <Button variant="ghost" asChild>
                                                        <Link href={item.href}>{item.title}</Link>
                                                    </Button>
                                                </NavigationMenuLink>
                                            </>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger
                                                    className="font-medium text-sm">
                                                    {item.title}
                                                </NavigationMenuTrigger>
                                                <NavigationMenuContent className="!w-[450px] p-4">
                                                    <div
                                                        className="flex grid-cols-2 flex-col gap-4 lg:grid">
                                                        <div
                                                            className="flex h-full flex-col justify-between">
                                                            <div className="flex flex-col">
                                                                <p className="text-base">{item.title}</p>
                                                                <p className="text-muted-foreground text-sm">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="flex h-full flex-col justify-start text-sm">
                                                            {item.items?.map((subItem) => (
                                                                <NavigationMenuLink
                                                                    href={subItem.href}
                                                                    key={subItem.title}
                                                                    className="flex flex-row items-center justify-between rounded px-4 py-2 hover:bg-muted"
                                                                >
                                                                    <span>{subItem.title}</span>
                                                                    <MoveRight
                                                                        className="h-4 w-4 text-muted-foreground"/>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </NavigationMenuContent>
                                            </>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-2 lg:justify-center">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={24}
                        height={24}
                        className="dark:invert"
                    />
                    <p className="whitespace-nowrap font-semibold">next-forge</p>
                </div>
                <div className="flex w-full justify-end gap-4">
                    <Button variant="ghost" className="hidden md:inline" asChild>
                        <Link href={`/${locale}/contact`}>{contact}</Link>
                    </Button>
                    <div className="hidden border-r md:inline"/>
                    <div className="hidden md:inline">
                        <ModeToggle/>
                    </div>
                    <Button asChild>
                        <Link href={`${env.NEXT_PUBLIC_APP_URL}/${locale}/sign-in`}>{cta}</Link>
                    </Button>
                </div>
                <div className="flex w-12 shrink items-end justify-end lg:hidden">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                    </Button>
                    {isOpen && (
                        <div
                            className="container absolute top-20 right-0 flex w-full flex-col gap-8 border-t bg-background py-4 shadow-lg">
                            {navigationItems
                                .filter(item => item.title !== undefined)
                                .map((item) => (
                                    <div key={item.title}>
                                        <div className="flex flex-col gap-2">
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-between"
                                                    target={
                                                        item.href.startsWith('http') ? '_blank' : undefined
                                                    }
                                                    rel={
                                                        item.href.startsWith('http')
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                    onClick={() => setOpen(!isOpen)}
                                                >
                                                    <span className="text-lg">{item.title}</span>
                                                    <MoveRight
                                                        className="h-4 w-4 stroke-1 text-muted-foreground"/>
                                                </Link>
                                            ) : (
                                                <p className="text-lg">{item.title}</p>
                                            )}
                                            {item.items?.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex items-center justify-between"
                                                    onClick={() => setOpen(!isOpen)}
                                                >
                                                <span className="text-muted-foreground">
                                                  {subItem.title}
                                                </span>
                                                    <MoveRight className="h-4 w-4 stroke-1"/>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
