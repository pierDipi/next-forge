'use client';

import {Button} from '@repo/design-system/components/ui/button';
import {Calendar} from '@repo/design-system/components/ui/calendar';
import {Input} from '@repo/design-system/components/ui/input';
import {Label} from '@repo/design-system/components/ui/label';
import {Popover, PopoverContent, PopoverTrigger,} from '@repo/design-system/components/ui/popover';
import {cn} from '@repo/design-system/lib/utils';
import {format} from 'date-fns';
import {CalendarIcon, MoveRight} from 'lucide-react';
import React, {useState} from 'react';

interface ContactFormProps {

}

export const ContactForm = (p: ContactFormProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex items-center justify-center">
            <div className="flex max-w-sm flex-col gap-4 rounded-md border p-8">
                <p>Book a meeting</p>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="picture">Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    'w-full max-w-sm justify-start text-left font-normal',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" type="text"/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" type="text"/>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1">
                    <Label htmlFor="picture">Upload resume</Label>
                    <Input id="picture" type="file"/>
                </div>

                <Button className="w-full gap-4">
                    Book the meeting <MoveRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
};
