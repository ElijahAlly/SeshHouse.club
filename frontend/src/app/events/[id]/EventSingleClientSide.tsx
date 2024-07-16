'use client'

import EventSingle from '@/components/EventSingle';
import instance from '@/lib/axios';
import { EventType } from '@/types/Event';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventSingleClientSide: React.FC = () => {
    const pathname = usePathname();
    const [event, setEvent] = useState<EventType | null>(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                // console.log('api call for single event', decodeURI(pathname))
                const res = await instance.get(decodeURI(pathname));
                // console.log('event res', res);
                setEvent(res.data);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvent();
    }, []);

    if (!event) return <p>No Events</p>

    // console.log('event', event);
    return (
        <EventSingle event={event} />
    )
}

export default EventSingleClientSide;