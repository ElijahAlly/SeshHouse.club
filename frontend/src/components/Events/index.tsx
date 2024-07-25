'use client'

import { useEffect, useState } from 'react';
import { EventType } from '@/types/Event';
import EventItem from '../EventItem';
import instance from '../../lib/axios';
import Filters from '../Filters';

const Events = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await instance.get('/events')
                // console.log('events res', res);
                setEvents(res.data.data);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvents();
    }, []);

    return (
        <div className='relative flex flex-col items-center h-full w-full overflow-hidden'>
            <h1 className='h-full sticky top-0 left-0 text-4xl font-light mb-12'>All Events</h1>
            <ul className='h-full w-full flex flex-col md:flex-row overflow-hidden p-2'>
                <Filters type={'events'} />
                <div className='flex flex-col w-full h-96 md:h-screen pb-72 overflow-y-auto pt-9 px-3'>
                    {events.map(event => (
                        <EventItem key={event.id} event={event}/>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default Events;