'use client'

import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import { EventType } from '@/types/Event';
import EventItem from '../EventItem';

const Events = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get('/events')
                // console.log('events res', res);
                setEvents(res.data);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvents();
    }, []);

    // console.log('events on EventsPage', events)

    return (
        <div className='relative flex flex-col items-center h-full w-full overflow-y-auto'>
            <h1 className='sticky top-0 text-3xl font-semibold'>All Events</h1>
            <ul className='w-full'>
                {events.map(event => (
                    <EventItem key={event.id} event={event}/>
                ))}
            </ul>
        </div>
    );
}

export default Events;