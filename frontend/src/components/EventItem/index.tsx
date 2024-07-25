import React from 'react';
import { EventType } from '@/types/Event';
import { getRandomPlaceholderImage } from '@/util/image';
import { formatDescription } from '@/util/text';
import Image from 'next/image';
// import Link from 'next/link';
import { ROUTE_PATHS } from '@/util/routes';
import { useRouter } from 'next/navigation';

interface Props {
  event: EventType;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const router = useRouter();
  const eventUrl = encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title));
  // console.log('event on eventItem', event)
  // console.log('event single link', encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title)))

  const handleOuterClick = () => {
    router.push(eventUrl);
  };

  const handleInnerClick = (e: any) => {
    e.stopPropagation(); // Prevents the outer link click event
    router.push(eventUrl);
  };

  return (
    <div
      className="relative h-[180px] max-h-[180px] w-full mb-12 p-6 flex align-top border rounded-md shadow-sm hover:shadow-md cursor-pointer" 
      // href={encodeURI(ROUTE_PATHS.EVENTS.SINGlE.replace('{slug}', event.title))}
      onClick={handleOuterClick}
    >
      <Image
        src={event.event_image || getRandomPlaceholderImage()} 
        alt={event.title}
        height={100}
        width={100}
      />
      <div className="flex flex-col ml-12 w-full lg:w-3/5 xl:w-2/5 h-fit">
        <h2 className='w-fit text-2xl font-light mb-1 flex flex-nowrap overflow-hidden text-ellipsis whitespace-nowrap cursor-text'>{event.title}</h2>
        <div className='flex'>
          <p className='text-md font-light text-gray-600 cursor-text'>Date:&nbsp;</p>
          <h4 className='mb-3 text-green-600 cursor-text'>
            {new Date(event.date).toLocaleDateString()}
          </h4>
        </div>
        <p className='text-md font-light text-gray-600 cursor-text'>Description:</p>
        <p className='min-w-fit w-full cursor-text'>
          {formatDescription(event.description + " && " + (event.id % 2 !== 0 ? `
          Id non reprehenderit magna pariatur cupidatat duis commodo sint adipisicing in. Fugiat sint nulla velit adipisicing anim adipisicing. Sit velit non aliqua amet voluptate esse irure eiusmod occaecat elit. Aute et tempor aute nostrud sint aliquip occaecat elit est duis. Anim aliquip minim pariatur dolor tempor excepteur velit sint consectetur laboris laborum laborum laborum minim. Proident officia qui do minim nisi veniam dolore exercitation adipisicing quis sint ea.
          \n
          Ipsum nisi et adipisicing consequat aliquip exercitation proident est. Pariatur do est do in exercitation exercitation esse nisi labore excepteur amet minim non. Et exercitation ipsum eu id dolor id nostrud ea tempor ut cupidatat nostrud. Eu esse fugiat consequat ut sunt dolor laboris consectetur culpa labore quis officia quis laboris.
          \n
          Minim reprehenderit exercitation nisi adipisicing non id dolore excepteur proident commodo nisi sunt. Adipisicing fugiat esse irure in ex dolore proident duis fugiat eu. Anim excepteur tempor Lorem cillum velit dolore in in ullamco. Velit incididunt officia sit esse. Est exercitation sint ad irure nulla.
          ` : ''), 120)} 
        </p>
        <div className="inner-link text-green-500 hover:text-green-600 underline" onClick={handleInnerClick}>
          view more
        </div>
      </div>
      <div className='hidden lg:flex items-center justify-center w-2/5 h-full border rounded-md mx-3 hover:shadow-md p-3 text-center cursor-text'>
        some content here
      </div>
      <div className='hidden xl:flex items-center justify-center w-1/5 h-full border rounded-md hover:shadow-md p-3 text-center cursor-text'>
        different content here
      </div>
    </div>
  )
};

export default EventItem;