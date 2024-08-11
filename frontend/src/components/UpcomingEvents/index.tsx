'use client';

import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { CalendarIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Event } from "@/types/Event";
import instance from "@/lib/axios";
import { formatDescription } from "@/util/text";
import Image from "next/image";

interface UpcomingEventsProps {
}

const UpcomingEvents: FunctionComponent<UpcomingEventsProps> = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const getEarliestDate = (event: Event) => {
        return Math.min(...event.dates.selectedDates.map(date => new Date(date).getTime()));
    }

    const getEvents = async () => {
        try {
            const res = await instance('GET', '/event?status=APPROVED', null);
            const newEvents = res.data.sort((eventA: Event, eventB: Event) => {
                // Get the earliest date in each event's selectedDates array
                const earliestDateA = getEarliestDate(eventA);
                const earliestDateB = getEarliestDate(eventB);
                return earliestDateA - earliestDateB;
            }).slice(0, 3);
            setEvents(newEvents);
        } catch (err) {
            console.error('There was an error fetching the events!', err);
        }
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <section className="mx-6 pt-16">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
            <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8">
                {events.map((event, i) => (
                    <Card key={i} className='my-3'>
                        <Image
                            src={event.thumbnail || '/images/seshhouse-logo.jpg'} 
                            alt="Event thumbnail" 
                            className="w-full h-48 object-cover rounded-t-md"
                            height={300}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{formatDescription(event.description, 60)}</p>
                            <div className="flex items-center text-gray-600 text-sm space-x-2">
                                <CalendarIcon className="w-5 h-5" /> 
                                <span>{new Date(getEarliestDate(event)).toDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm space-x-2 mt-2">
                                <DrawingPinIcon className="w-5 h-5" /> 
                                <span>Kearny, NJ (SeshHouse)</span>
                            </div>
                            <Button variant='default' size="sm" className="mt-4 w-full">
                                Learn More
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
 
export default UpcomingEvents;