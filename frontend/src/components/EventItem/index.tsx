import React from 'react';
import { EventType } from '@/types/Event';
import { getRandomPlaceholderImage } from '@/util/image';
import { formatDescription } from '@/util/text';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/util/routes';

interface Props {
  event: EventType;
}

const EventItem: React.FC<Props> = ({ event }) => {
  // console.log('event on eventItem', event)
  // console.log('event single link', encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title)))
  return (
    <Link
      className="relative h-[180px] max-h-[180px] w-full mb-12 px-12 flex align-top" 
      href={encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title))}
      passHref
    >
      <Image
        src={event.event_image || getRandomPlaceholderImage()} 
        alt={event.title}
        height={100}
        width={100}
      />
      <div className="flex flex-col ml-12">
        <h2>
          {event.title}
        </h2>
        <h4>
          Date: {new Date(event.date).toLocaleDateString()}
        </h4>
        <p className='min-w-fit max-w-[555px]'>
          {formatDescription(event.description + (event.id % 2 !== 0 ? `
          Id non reprehenderit magna pariatur cupidatat duis commodo sint adipisicing in. Fugiat sint nulla velit adipisicing anim adipisicing. Sit velit non aliqua amet voluptate esse irure eiusmod occaecat elit. Aute et tempor aute nostrud sint aliquip occaecat elit est duis. Anim aliquip minim pariatur dolor tempor excepteur velit sint consectetur laboris laborum laborum laborum minim. Proident officia qui do minim nisi veniam dolore exercitation adipisicing quis sint ea.
          \n
          Ipsum nisi et adipisicing consequat aliquip exercitation proident est. Pariatur do est do in exercitation exercitation esse nisi labore excepteur amet minim non. Et exercitation ipsum eu id dolor id nostrud ea tempor ut cupidatat nostrud. Eu esse fugiat consequat ut sunt dolor laboris consectetur culpa labore quis officia quis laboris.
          \n
          Minim reprehenderit exercitation nisi adipisicing non id dolore excepteur proident commodo nisi sunt. Adipisicing fugiat esse irure in ex dolore proident duis fugiat eu. Anim excepteur tempor Lorem cillum velit dolore in in ullamco. Velit incididunt officia sit esse. Est exercitation sint ad irure nulla.
          ` : ''), 270)}
        </p>
      </div>
    </Link>
  )
};

export default EventItem;
