'use client';

import {MoonIcon, SunIcon} from '@radix-ui/react-icons';
import {useTheme} from 'next-themes';
import {Button} from './button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './dropdown-menu';
import {ReactNode} from "react";
import Link from "next/link";
import {Bell} from "lucide-react";

const themes = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
    {label: 'System', value: 'system'},
];

export interface GenericModeToggleProps {
    trigger: ReactNode
}

export const GenericModeToggle = ({trigger}: GenericModeToggleProps) => {

    const {setTheme} = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {themes.map(({label, value}) => (
                    <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const ModeToggle = () => {
    return (
        <GenericModeToggle trigger={
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 text-foreground"
            >
                <SunIcon
                    className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"/>
                <MoonIcon
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                <span className="sr-only">Toggle theme</span>
            </Button>
        }/>
    );
};

export const ModeToggleDirect = () => {

    const {setTheme} = useTheme();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Link href={'#'} className={'w-full flex items-center gap-2'}>
                    <Bell/>
                    Theme
                </Link>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    {themes.map(({label, value}) => (
                        <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
                            {label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    )
}