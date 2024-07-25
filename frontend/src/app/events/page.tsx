import Events from '@/components/Events';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Events | SeshHouse',
}

const EventsPage: React.FC = async () => {
  return (
    <div className='w-full p-12 overflow-hidden'>
      <Events />
    </div>
  )
}

export default EventsPage;