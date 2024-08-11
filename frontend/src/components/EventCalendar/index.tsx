'use client';

import { Calendar } from "@/components/ui/calendar";
import { Event } from "@/types/Event";
import { UserType } from "@/types/User";
import { FunctionComponent, useEffect, useState } from "react";
import { IconLeft } from "react-day-picker";

interface EventCalendarProps {
    user: UserType | null;
    events: Event[];
    updateDatesSelected: (dates: Date[]) => void; 
}

const EventCalendar: FunctionComponent<EventCalendarProps> = ({ user, events, updateDatesSelected }) => {
    const mobileScreenWidth = 450;
    const mediumScreenWidth = 699;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const [dates, setDate] = useState<Date[] | undefined>([currentDate]);
    
    const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date().getMonth());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileScreenWidth);
    const [isMediumScreenSize, setIsMediumScreenSize] = useState(window.innerWidth <= mobileScreenWidth);

    const handleMonthToggle = (date: Date) => {
        setCurrentCalendarMonth(date.getMonth());
    }

    const handleResize = () => {
        setIsMobile(window.innerWidth <= mobileScreenWidth);
        setIsMediumScreenSize(window.innerWidth <= mediumScreenWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dates && updateDatesSelected(dates);
    }, [dates])

    // console.log(dates);

    return (
        <Calendar
            mode='multiple'
            min={0}
            selected={dates}
            onSelect={setDate}
            onMonthChange={handleMonthToggle}
            className="flex items-center rounded-md border shadow mb-4"
            numberOfMonths={isMediumScreenSize ? 1 : 2}
            fromDate={currentDate}
            showOutsideDays={true}
            components={{
                IconLeft(props: any) {
                    if (currentMonth === currentCalendarMonth) return (
                        <IconLeft style={{ opacity: '0.3', color: 'gray' }} />
                    );
                    return <IconLeft {...props} />
                },
            }}
        />
    );
}

export default EventCalendar;