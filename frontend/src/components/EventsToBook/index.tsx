'use client';

import instance from "@/lib/axios";
import { BookEventType, EVENT_ROOMS, EVENT_TYPES, EventRoomType, getFormattedRoomType, getFormattedType } from "@/types/Event";
import { FunctionComponent, useEffect, useState } from "react";
import BookEventItem from "../BookEventItem";
import { Button } from "../ui/button";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/navigation";

interface EventsToBookProps {
}

const eventToBookSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    dates: z.object({}).nullable().default({}),
    organizer_id: z.number().min(1, { message: "Organizer ID must be a positive integer" }),
    location: z.string().min(1, { message: "Location cannot be empty" }).nullable().default(''),
    capacity: z.number().min(1, { message: "Capacity must be a positive integer" }).nullable(),
    type: z.string().min(2, { message: "Type cannot be empty" }),
    registration_deadline: z.date().nullable().default(new Date()),
    registration_fee: z.number().nonnegative({ message: "Registration fee must be non-negative" }).nullable(),
    tags: z.array(z.string()).nullable().default([]),
    rooms: z.array(z.enum([
        EVENT_ROOMS.CAFE,
        EVENT_ROOMS.MUSIC_STUDIO,
        EVENT_ROOMS.PODCAST_ROOM,
        EVENT_ROOMS.UPSTAIRS_BAR,
        EVENT_ROOMS.STAGE_HALL,
        EVENT_ROOMS.UPSTAIRS_BACK_ROOM,
    ])).nonempty({ message: "Rooms cannot be an empty array" }),
    attendees_count: z.number().nonnegative({ message: "Attendees count must be non-negative" }).nullable().default(0),
    thumbnail: z.string().url({ message: "Thumbnail must be a valid URL" }).nullable().default(''),
    documents: z.record(z.string(), z.string()).nullable().default({})
})

const EventsToBook: FunctionComponent<EventsToBookProps> = () => {
    const router = useRouter();
    const [eventsToBook, setEventsToBook] = useState<BookEventType[]>([]);
    const [showCreateEventToBookForm, setShowCreateEventToBookForm] = useState<boolean>(false);
    const [eventToBook, setEventToBook] = useState<BookEventType | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const getEventsToBook = async () => {
        try {
            const res = await instance.get('/events-to-book');
            setEventsToBook(res.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    const eventToBookForm = useForm<z.infer<typeof eventToBookSchema>>({
        resolver: zodResolver(eventToBookSchema),
        mode: 'all',
        defaultValues: {
            title: '',
            description: '',
            dates: {},
            organizer_id: 0,
            location: '',
            capacity: 0,
            type: '',
            registration_deadline: new Date(),
            registration_fee: 0,
            tags: [],
            rooms: [],
            attendees_count: 0,
            thumbnail: '',
            documents: {}
        },
    })

    const eventToBookIsvalid = (): boolean => {
        const { title, description, rooms, type } = eventToBookForm.getValues();
        return (title.length > 2 && description.length > 2 && rooms.length > 0 && type.length > 0);
    }

    const handleSubmitEventToBookClick = async (values: z.infer<typeof eventToBookSchema>) => {
        try {
            setErrors({});
            await instance.post('/event-to-book', { ...values });
            setShowCreateEventToBookForm(false);
            router.refresh();
            getEventsToBook();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                err.errors.forEach((error) => {
                    console.log(error)
                    if (error.path[0]) {
                        newErrors[error.path[0]] = error.message;
                    }
                });
                setErrors(newErrors);
                return;
            }
        }
    };

    useEffect(() => {
        setEventToBook(null);
    }, [showCreateEventToBookForm])

    useEffect(() => {
        getEventsToBook();
    }, [])


    return (
        <div className='flex flex-col w-full items-center'>
            {!showCreateEventToBookForm && <Button variant={'outline'} className='w-fit px-6 my-3' onClick={() => setShowCreateEventToBookForm(true)}>Create New Event For People To Book</Button>}
            {showCreateEventToBookForm && (
                <div className='w-full border rounded-md p-3 my-3'>
                    <Button variant={'outline'} onClick={() => setShowCreateEventToBookForm(false)} className='text-yellow-500 border-yellow-500 hover:border-yellow-600 my-3 hover:text-yellow-600'>Cancel</Button>
                    <Form {...eventToBookForm}>
                        <form className="relative w-full space-y-4">
                            <Controller
                                control={eventToBookForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="required">Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the Title" {...field} />
                                        </FormControl>
                                        {eventToBookForm.formState.errors.title && <FormMessage className="text-red-500 text-sm">{eventToBookForm.formState.errors.title.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={eventToBookForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel className="required">Description</FormLabel>
                                        <FormControl>
                                            <textarea 
                                                {...field} 
                                                placeholder="Enter the Description"
                                                className='border w-3/4 h-24 rounded-md focus:border-green-500 active:border-green-500 outline-none p-2'
                                                style={{
                                                    resize: 'both',
                                                    maxHeight: '201px',
                                                    maxWidth: '90%',
                                                    fontFamily: 'Palantino'
                                                }}
                                            />
                                        </FormControl>
                                        {eventToBookForm.formState.errors.description && <FormMessage className="text-red-500 text-sm">{eventToBookForm.formState.errors.description.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={eventToBookForm.control}
                                name="rooms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="required">Rooms</FormLabel>
                                        <FormControl>
                                            <div className='flex flex-col'>
                                                {Object.values(EVENT_ROOMS).map((room, i) => (
                                                    <div key={i} className='flex items-center'>
                                                        <Checkbox
                                                            value={room}
                                                            checked={field.value.includes(room)}
                                                            onCheckedChange={(checked) => { 
                                                                if (checked) {
                                                                    field.onChange([...field.value, room]);
                                                                } else {
                                                                    field.onChange(field.value.filter((r: string) => r !== room));
                                                                }
                                                            }}
                                                        />
                                                        <p className='ml-2'>{getFormattedRoomType(room)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </FormControl>
                                        {eventToBookForm.formState.errors.rooms && (
                                            <FormMessage className="text-red-500 text-sm">
                                                {eventToBookForm.formState.errors.rooms.message}
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <Controller
                                control={eventToBookForm.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="required">Type</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-fit my-3 p-4">
                                                    <SelectValue placeholder="Select Event Type" defaultValue={''} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectGroup>
                                                        {Object.values(EVENT_TYPES).map((type, i) => (
                                                            <SelectItem key={i} value={type}>{getFormattedType(type)}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        {eventToBookForm.formState.errors.type && (
                                            <FormMessage className="text-red-500 text-sm">
                                                {eventToBookForm.formState.errors.type.message}
                                            </FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center w-full">
                                <Button
                                    variant={!eventToBookIsvalid() ? 'disabled' : 'submit'}
                                    className={`my-4 w-4/5`}
                                    disabled={!eventToBookIsvalid()}
                                    onClick={(e: any) => {e.preventDefault(); handleSubmitEventToBookClick(eventToBookForm.getValues());}}
                                >
                                    Create Event For Uers To Book
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
            <ul className='h-fit w-full flex flex-col p-2 pb-52'>
                <div className='flex flex-col w-full h-fit pt-9 px-3'>
                    {eventsToBook.map((event: BookEventType, i: number) => (
                        <BookEventItem key={i} event={event}/>
                    ))}
                </div>
            </ul>
        </div>
    );
}
 
export default EventsToBook;