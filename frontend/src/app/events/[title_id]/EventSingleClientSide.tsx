'use client'

import EventSingle from '@/components/EventSingle';
import instance from '@/lib/axios';
import { Event } from '@/types/Event';
import { UserType } from '@/types/User';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EventSingleClientSide: React.FC = () => {
    const pathname = usePathname();
    const eventTitleAndIdArr = pathname.split('/')[2].split('_');
    const [event, setEvent] = useState<Event | null>(null);
    const [eventCreator, setEventCreator] = useState<UserType | null>(null);

    useEffect(() => {
        const getEvent = async () => {
            try {
                const res = await instance('GET', `/event?id=${eventTitleAndIdArr[1]}`);
                setEvent(res.data[0]);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvent();
    }, []);

    useEffect(() => {
        const getEventCreator = async () => {
        if (!event || !Number(event.id)) return;
        try {
            const res = await instance('GET', '/user?exact_match=true&id=' + event.organizer_id);
            setEventCreator(res.data[0]);
        } catch (err) {
            console.error('There was an error fetching the events!', err);
        }
        }
        getEventCreator();
    }, [])

    if (!event) return <p>No Events</p>

    return (
        <EventSingle event={event} eventCreator={eventCreator} />
    )
}

export default EventSingleClientSide;