import { BookEventType } from "@/types/Event";
import { getTitleToUrl, ROUTE_PATHS } from "@/util/routes";
import { formatDescription } from "@/util/text";
import Link from "next/link";
import { FunctionComponent } from "react";

interface BookEventItemProps {
    event: BookEventType;
}

const BookEventItem: FunctionComponent<BookEventItemProps> = ({ event }) => {
    const slugFriendlyTitle = getTitleToUrl(event.title);

    return ( 
        <Link 
            href={encodeURI(ROUTE_PATHS.EVENTS.CALENDAR.replace('{slug}', slugFriendlyTitle))} 
            className={`border hover:shadow-md transition duration-300 rounded-md p-3 mb-4`}
            passHref
        >
            <h3 className='text-lg font-semibold'>{event.title}</h3>
            <div className='flex flex-col'>
                <p className='text-md w-4/5'>{formatDescription(event.description, 150)}</p>
                <p className='text-sm font-thin self-end mt-2'>Book Now! Choose Your Dates -{'>'}</p>
            </div>
        </Link>
    );
}

export default BookEventItem;