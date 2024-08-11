'use client';

import React, { useEffect, useState } from 'react';
import { Event, EVENT_STATUSES, EventStatusType, getFormattedStatusType } from '@/types/Event';
import { formatDescription } from '@/util/text';
import Image from 'next/image';
import { ROUTE_PATHS } from '@/util/routes';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import instance from '@/lib/axios';
import { Button } from '../ui/button';

interface Props {
  user: UserType | null;
  event: Event;
  isOnAdminPage: boolean;
  isViewingOwnEvents: boolean;
  isBooking?: boolean;
  refreshEvents: () => void;
}

const EventItem: React.FC<Props> = ({ event, user: currentUser, isOnAdminPage, isViewingOwnEvents, refreshEvents, isBooking = false }) => {
  const router = useRouter();
  const eventUrl = encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title));
  // console.log('event on eventItem', event)
  // console.log('event single link', encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title)))
  const [eventCreator, setEventCreator] = useState<UserType | null>(null);
  const isCurrentUser = eventCreator?.id === currentUser?.id;

  const handleOuterClick = () => {
    router.push(eventUrl);
  };

  const handleInnerClick = (e: any) => {
    e.stopPropagation(); // Prevents the outer link click event
    router.push(eventUrl);
  };

  useEffect(() => {
    const getEventCreator = async () => {
      if (!event || !Number(event.id)) return;
      try {
        const res = await instance.get('/user?exact_match=true&id=' + event.organizer_id);
        // console.log('user res', res);
        setEventCreator(res.data.data[0]);
      } catch (err) {
        console.error('There was an error fetching the events!', err);
      }
    }
    getEventCreator();
  }, [])

  const updateEventStatus = async (status: EventStatusType) => {
    try {
      await instance.put('/event', {
        id: event.id,
        status
      });
      refreshEvents();
    } catch (err) {
      console.error('There was an error fetching the events!', err);
    }
  }

  return (
    <div className={`h-fit w-full flex flex-col border rounded-md ${isBooking ? 'mb-3' : 'my-3'}`}>
      {isOnAdminPage && !isViewingOwnEvents && (
        <>
          <div className='h-fit w-full p-3 flex justify-between'>
            <Button variant='submit' onClick={() => updateEventStatus(EVENT_STATUSES.APPROVED)}>Approve</Button>
            <Button className='text-white bg-red-500 hover:bg-red-600' onClick={() => updateEventStatus(EVENT_STATUSES.DENIED)}>Reject</Button>
          </div>
          <hr />
        </>
      )}
      {isViewingOwnEvents && (
        <>
          <div className='h-fit w-full p-3 flex justify-between'>
            <p className={`text-lg font-semibold ${event.status === EVENT_STATUSES.APPROVED ? 'text-green-500' : event.status === EVENT_STATUSES.PENDING ? 'text-yellow-500' : 'text-red-500'}`}>{getFormattedStatusType(event.status)}</p>
          </div>
          <hr />
        </>
      )}
      <div
        className={`h-[180px] max-h-[180px] w-full p-6 flex align-top shadow-sm hover:shadow-md ${isOnAdminPage || isBooking ? 'cursor-default' : 'cursor-pointer'}`}
        // href={encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title))}
        onClick={() => !isOnAdminPage && !isBooking && handleOuterClick()}
      >
        {/* <Image
          src={event.thumbnail || getRandomPlaceholderImage()} 
          alt={event.title}
          height={100}
          width={100}
        /> */}
        <div className="relative flex flex-col w-full h-fit">
          {/* lg:w-3/5 xl:w-2/5  */}
          <div className='flex justify-between'>
            <h2 className={`w-fit text-2xl font-light mb-12 md:mb-1 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap ${isBooking ? 'cursor-default' : 'cursor-pointer'}`}>{event.title}</h2>
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
                created by:
                {isCurrentUser ? ' (You)' : ' ' + (eventCreator ? eventCreator.first_name : ' ')}{' '}
                {isCurrentUser ? '' : (eventCreator ? eventCreator.last_name : '')}
              </p>
            </div>
          </div>
          <div className='flex flex-col w-4/5'>
            <p className='text-md font-light text-gray-600 cursor-text'>Dates:&nbsp;</p>
            {event.dates.selectedDates.map((date, i) => {
              const newDate = new Date(date);
              return (
                <div className='flex ml-6 items-center' key={i}>
                  <h4 className={`cursor-text text-sm md:text-md mr-1`}>
                    {newDate.toLocaleDateString()}{':'}
                  </h4>
                  <h3 className='text-sm md:text-md font-light'>{event.dates.selectedTimes[Number(`${newDate.getDate()}${newDate.getMonth()}${newDate.getFullYear()}`)]}</h3>
                </div>
              )
            })}
          </div>
          {!isBooking && (
            <>
              <p className='text-md font-light text-gray-600 cursor-text'>Description:</p>
              <p className='min-w-fit w-full cursor-text text-sm md:text-md mb-6 md:mb-12'>
                {formatDescription(event.description, 120)} 
              </p>
              <div className="h-fit w-fit cursor-pointer text-sm md:text-md inner-link text-green-500 hover:text-green-600 underline" onClick={handleInnerClick}>
                view more
              </div>
            </>
          )}
        </div>
        {/* <div className='hidden lg:flex items-center justify-center w-2/5 min-h-full border rounded-md mx-3 hover:shadow-md p-3 text-center cursor-help'>
          some content here when screen is md-lg
        </div>
        <div className='hidden xl:flex items-center justify-center w-1/5 min-h-full border rounded-md hover:shadow-md p-3 text-center cursor-help'>
          more content here when screen is xl
        </div> */}
      </div>
    </div>
  )
};

export default EventItem;