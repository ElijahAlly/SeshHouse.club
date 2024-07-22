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
                const res = await instance.get(`/event?title=${pathname.split('/')[2]}`);
                setEvent(res.data.data[0]);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvent();
    }, []);

    if (!event) return <p>No Events</p>

    return (
        <EventSingle event={event} />
    )
}

export default EventSingleClientSide;