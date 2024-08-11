import React from 'react';
import { Event } from '@/types/Event';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserType } from '@/types/User';

interface Props {
  event: Event;
  eventCreator: UserType | null;
}

const EventSingleBanner: React.FC<Props> = ({ event, eventCreator }) => {
  return (
    <div className='w-full min-h-[150px] px-16'>
      {/* <Image
        src={event.thumbnail || ''} 
        alt={event.title || 'event image'}
        height={100}
        width={100}
      /> */}
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <h2 className='w-fit text-2xl font-light mb-12 md:mb-1 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap'>{event.title}</h2>
            <div className='absolute top-0 right-0 flex flex-col items-end'>
              <Avatar className='h-12 w-12 border rounded-full'>
                <AvatarImage height={21} src={eventCreator?.profile_picture || ''} />
                <AvatarFallback>
                  <Image
                    src={'/images/user-icon-96-white.png'}
                    height={21}
                    width={21}
                    alt="user profile icon/image"
                    priority
                  />
                </AvatarFallback>
              </Avatar>
              <p className='text-sm font-light'>
                created by: {eventCreator?.first_name}{' '}{eventCreator?.last_name}
              </p>
            </div>
          </div>
          <div className='flex flex-wrap items-center w-4/5'>
            <p className='text-md font-light text-gray-600 cursor-text'>Dates:&nbsp;</p>
            {event.dates.selectedDates.map((date, i) => (
              <h4 key={i} className={`cursor-text text-sm md:text-md ${(i + 1) < event.dates.selectedDates.length ? 'mr-1' : ''}`}>
                {new Date(date).toLocaleDateString() + ((i + 1) < event.dates.selectedDates.length ? ',' : '')}
              </h4>
            ))}
          </div>
        </div>
        {/* <Link href={encodeURI(ROUTE_PATHS.EVENTS.TICKETS.replace('{slug}', event.title))} passHref>
          <Button variant='outline' className='max-w-fit'>Get Tickets</Button>
        </Link> */}
      </div>
    </div>
  )
};

export default EventSingleBanner;