import Events from '@/components/Events';
import { getSessionFromCookies } from '@/lib/crypt';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Events | SeshHouse',
}

const EventsPage: React.FC = async () => {
  const user = await getSessionFromCookies();

  return (
    <div className='w-full p-3 overflow-hidden'>
      <Events user={user} isOnAdminPage={false} />
    </div>
  )
}

export default EventsPage;