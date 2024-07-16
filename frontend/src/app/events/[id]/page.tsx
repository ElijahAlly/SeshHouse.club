import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

const EventSingleClientSide = dynamic(() => import('./EventSingleClientSide'), { ssr: false })

export const metadata: Metadata = {
  title: 'Event | SeshHouse',
}

const EventsPage: React.FC = async () => {
    return (
        <EventSingleClientSide />
    )
}

export default EventsPage;