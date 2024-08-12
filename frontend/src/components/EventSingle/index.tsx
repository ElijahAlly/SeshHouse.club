import React from 'react';
import { Event } from '@/types/Event';
import EventSingleBanner from '../EventSingleBanner';
import { UserType } from '@/types/User';

interface Props {
  event: Event;
  eventCreator: UserType | null;
}

const EventSingle: React.FC<Props> = ({ event, eventCreator }) => {
  return (
    <div
      className='flex flex-col h-[180px] max-h-[180px] w-full my-16 p-12'
    >
      <EventSingleBanner event={event} eventCreator={eventCreator}/>
      <div className='flex flex-col w-full px-16 mt-16'>
        <h3 className='font-bold'>Description:</h3>
        <p className='min-w-fit max-w-[555px] p-16'>
          {event.description}
        </p>
      </div>
    </div>
  )
};

export default EventSingle;
