import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { getSessionFromCookies } from "@/lib/crypt";

const EventCalendarClientSide = dynamic(() => import('./EventCalendarClientSide'), { ssr: false })

interface EventCalendarProps {
}

const EventCalendar: FunctionComponent<EventCalendarProps> = async () => {
    const user = await getSessionFromCookies();

    return (
        <div className="w-full h-fit flex flex-col items-center mt-20 md:mt-24 overflow-y-scroll">
            <EventCalendarClientSide user={user} />
        </div>
    );
}

export default EventCalendar;