import React from 'react';
import { EventType } from '@/types/Event';
import EventSingleBanner from '../EventSingleBanner';

interface Props {
  event: EventType;
}

const EventSingle: React.FC<Props> = ({ event }) => {
  // console.log('event on single', event)
  return (
    <div
      className='flex flex-col h-[180px] max-h-[180px] w-full mb-16 p-12'
    >
      <EventSingleBanner event={event} />
      <div className='flex flex-col w-full'>
        {/* // TODO: add gap (same color as bg) */}
        <h3 className='font-bold mb-6'>Description:</h3>
        <p className='min-w-fit max-w-[555px] p-16'>
          {event.description + (event.id % 2 !== 0 ? `
          Id non reprehenderit magna pariatur cupidatat duis commodo sint adipisicing in. Fugiat sint nulla velit adipisicing anim adipisicing. Sit velit non aliqua amet voluptate esse irure eiusmod occaecat elit. Aute et tempor aute nostrud sint aliquip occaecat elit est duis. Anim aliquip minim pariatur dolor tempor excepteur velit sint consectetur laboris laborum laborum laborum minim. Proident officia qui do minim nisi veniam dolore exercitation adipisicing quis sint ea.
          \n
          Ipsum nisi et adipisicing consequat aliquip exercitation proident est. Pariatur do est do in exercitation exercitation esse nisi labore excepteur amet minim non. Et exercitation ipsum eu id dolor id nostrud ea tempor ut cupidatat nostrud. Eu esse fugiat consequat ut sunt dolor laboris consectetur culpa labore quis officia quis laboris.
          \n
          Minim reprehenderit exercitation nisi adipisicing non id dolore excepteur proident commodo nisi sunt. Adipisicing fugiat esse irure in ex dolore proident duis fugiat eu. Anim excepteur tempor Lorem cillum velit dolore in in ullamco. Velit incididunt officia sit esse. Est exercitation sint ad irure nulla.
          ` : '')}
        </p>
      </div>
    </div>
  )
};

export default EventSingle;
