import LogoutButton from '@/components/LogoutButton';
import { getSessionFromCookies } from '@/lib/crypt';
import { UserType } from '@/types/User';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'My Profile | SeshHouse',
}

const EventsPage: React.FC = async () => {
    const user: UserType | null = await getSessionFromCookies();

    return (
        <div className='w-full p-20 pt-12'>
            <LogoutButton />
            <h3>{user?.first_name}</h3>
            <h3>{user?.last_name}</h3>
            <h3>{user?.email}</h3>
            <h3>{user?.username}</h3>
        </div>
    )
}

export default EventsPage;