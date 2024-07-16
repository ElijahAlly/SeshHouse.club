import React from 'react';
import { EventType } from '@/types/Event';
import { getRandomPlaceholderImage } from '@/util/image';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/util/routes';

interface Props {
  event: EventType;
}

const EventSingleBanner: React.FC<Props> = ({ event }) => {
  return (
    <div className='w-full min-h-[150px] px-16'>
      <Image
        src={event.event_image || getRandomPlaceholderImage()} 
        alt={event.title}
        height={100}
        width={100}
      />
      <div className='flex flex-col ml-12 justify-between'>
        <div className='flex flex-col'>
          <h2>
            {event.title}
          </h2>
          <h4>
            Date: {new Date(event.date).toLocaleDateString()}
          </h4>
        </div>
        <Link href={encodeURI(ROUTE_PATHS.EVENTS.TICKETS.replace('{slug}', event.title))} passHref>
          <Button variant='outline' className='max-w-fit'>Get Tickets</Button>
        </Link>
      </div>
    </div>
  )
};

export default EventSingleBanner;