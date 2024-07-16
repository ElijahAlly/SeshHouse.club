import { getSessionFromCookies } from '@/lib/crypt';
import { UserType } from '@/types/User';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Get Tickets | SeshHouse',
}

const TicketsPage: React.FC = async () => {
    const user: UserType | null = await getSessionFromCookies();

    return (
        <div className='w-full p-20 pt-12'>
            get tickets to your event here....
        </div>
    )
}

export default TicketsPage;