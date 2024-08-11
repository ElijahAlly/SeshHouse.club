'use client';

import Events from "@/components/Events";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEventStore } from "@/stores/event";
import { Hour } from "@/types/Date";
import { UserType } from "@/types/User";
import { getFullHoursRange, getHoursForDayOfWeek } from "@/util/date";
import { getUrlToDisplay } from "@/util/routes";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { IconLeft, IconRight } from "react-day-picker";

interface EventCalendarClientSideProps {
    user: UserType | null;
}

const EventCalendarClientSide: FunctionComponent<EventCalendarClientSideProps> = ({ user }) => {
    const router = useRouter();
    const path = usePathname();
    const eventTitle = getUrlToDisplay(path.split('/')[2]);
    const { selectedTimes, selectedDates } = useEventStore();
    
    const maxDatesToSelect = 3;
    const numberOfMonthsToDisplayAfterCurrent = 3;
    const mobileScreenWidth = 450;
    const mediumScreenWidth = 699;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const [dates, setDate] = useState<Date[] | undefined>(selectedDates.length > 0 ? selectedDates.map((date) => new Date(date)) : [currentDate]);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + numberOfMonthsToDisplayAfterCurrent);
    const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date().getMonth());
    const [selectTimes, setSelectTimes] = useState<{[key: string]: string}>(selectedTimes);
    const [isCalendarValid, setIsCalendarValid] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    // opening and closing hours in state to change dynamically for weekends/holidays/etc
    const [openingHours, setOpeningHours] = useState<Hour[]>([]);
    const [closingHours, setClosingHours] = useState<Hour[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileScreenWidth);
    const [isMediumScreenSize, setIsMediumScreenSize] = useState(window.innerWidth <= mobileScreenWidth);
    const { setSelectedTimes, setSelectedDates } = useEventStore();

    const handleSelectTimeChange = (value: string, dateKey: string) => {
        let newSelectTimes = {};
        setSelectTimes(prev => {
            prev[dateKey] = value;
            newSelectTimes = prev;
            return prev;
        });
        setSelectedTimes(newSelectTimes);
        setIsCalendarValid(checkCalendarValid());
    }

    const handleMonthToggle = (date: Date) => {
        setCurrentCalendarMonth(date.getMonth());
    }

    const getDateKey = (date: Date): string => {
        return `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
    }

    const getHoursOnDate = (dates: Date[]) => {
        const newOpeningHours: Hour[] = [];
        const newClosingHours: Hour[] = [];
        const newSelectedTimes: {[key: string]: string} = {};

        dates.map(date => {
            const dateKey = getDateKey(date);
            // TODO: update getHoursForDayOfWeek to change logic to handle hours for holidays/weekends/etc.
            const hoursForDay = getHoursForDayOfWeek(date);
            newOpeningHours.push(hoursForDay.openingHour);
            newClosingHours.push(hoursForDay.closingHour);
            if (selectTimes[dateKey]) {
                newSelectedTimes[dateKey] = selectTimes[dateKey];
            }
        })
        
        setSelectTimes(newSelectedTimes);
        setSelectedDates(dates);
        setSelectedTimes(newSelectedTimes);
        setOpeningHours(newOpeningHours);
        setClosingHours(newClosingHours);
    }

    useEffect(() => {
        if (dates) getHoursOnDate(dates);
        setIsCalendarValid(checkCalendarValid());
    }, [dates])

    const handleResize = () => {
        setIsMobile(window.innerWidth <= mobileScreenWidth);
        setIsMediumScreenSize(window.innerWidth <= mediumScreenWidth);
    };

    const checkCalendarValid = () => {
        if (dates) {
            return dates.every((date: Date) => !!selectTimes[getDateKey(date)]);
        }
        return false;
    };

    const setShowConflictingDatesWarning = (shouldShow: boolean) => {
        setShowWarning(shouldShow);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <h2 className="text-xl m-6 mb-12 mt-0 text-center">Choose at least 1 day to hold {eventTitle}. (Select up to {maxDatesToSelect})</h2>
            <div className='flex flex-col items-center'>
                <div className={`flex ${isMobile && 'flex-col'} items-center`}><p className="text-lg font-light mr-2">Selected Dates & Times: </p><span className='text-red-500'>{dates && dates.length === 3 && `Max Dates Selected ${maxDatesToSelect}`}</span></div>
                <div className="flex flex-col border rounded-md p-3 m-3">
                    {dates && dates.map((date, i) => (
                        <div key={i}>
                            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center my-2`}>
                                <p className="text-md text-green-900 mr-3">{date.toLocaleDateString()} <span className="text-black font-extralight text-md">({date.toDateString()})</span>:</p>
                                {openingHours[i] && closingHours[i] && (
                                    <Select onValueChange={(value: string) => handleSelectTimeChange(value, getDateKey(date))} value={selectTimes[getDateKey(date)] || ''}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Choose Time of Day" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectGroup>
                                                <SelectLabel>Choose Time of Day</SelectLabel>
                                                <SelectItem
                                                    value={`${openingHours[i].formatted} - ${closingHours[i].formatted}`}
                                                >
                                                    All Day ({openingHours[i].formatted} - {closingHours[i].formatted})
                                                </SelectItem>
                                                {getFullHoursRange(openingHours[i], closingHours[i]).map((time, i: number) => (
                                                    <SelectItem value={time.formatted} key={i}>
                                                        {time.numberValue === 12 ? (
                                                            time.formatted === '12 PM' ? '12 PM (noon)' : '12 AM (midnight)'
                                                        ) :
                                                            time.formatted
                                                        }
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                            {i + 1 < dates.length && i + 1 < maxDatesToSelect && (
                                <hr />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Calendar
                mode='multiple'
                min={1}
                max={3}
                selected={dates}
                onSelect={setDate}
                onMonthChange={handleMonthToggle}
                className="flex items-center rounded-md border shadow"
                numberOfMonths={isMediumScreenSize ? 1 : 2}
                fromDate={currentDate}
                toMonth={endDate}
                showOutsideDays={true}
                components={{
                    IconLeft(props: any) {
                        if (currentMonth === currentCalendarMonth) return (
                            <IconLeft style={{ opacity: '0.3', color: 'gray' }} />
                        );
                        return <IconLeft {...props} />
                    },
                    IconRight(props: any) {
                        if (endDate.getMonth() === currentCalendarMonth) return (
                            <IconRight style={{ opacity: '0.3', color: 'gray' }} />
                        );
                        return <IconRight {...props} />
                    },
                }}
            />
            {showWarning && (
                <div className='flex flex-col my-3 mx-9 text-center md:text-left'>
                    <p className='text-sm md:text-md text-red-500 font-sans my-1'>
                        Please understand you are booking an event on the same day as other events. 
                    </p>
                    <p className='text-sm md:text-md text-red-500 font-sans my-1'>
                        Even if they are at different times, our team may reject your booking. 
                    </p>
                    <p className='text-sm md:text-md text-red-500 font-sans my-1'>
                        Consider choosing a day where no other events are taking place.
                    </p>
                    <p className='text-sm md:text-md font-thin my-1'>
                        (See Conflicting Events Below)
                    </p>
                </div>
            )}
            <div className='w-2/5 flex justify-end m-6'>
                <Button 
                    variant={!isCalendarValid ? 'disabled' : 'submit'}
                    onClick={() => router.push(path + '/your-info' + (user?.id ? '/confirm' : ''))} 
                    disabled={!isCalendarValid}
                    className={`${isCalendarValid ? '' : 'opacity-40 cursor-default'}`}
                >
                    Continue
                </Button>
            </div>
            <Events 
                user={user} 
                isOnAdminPage={false} 
                onlyCurrentUsersEvents={false} 
                isBooking={true}
                setShowConflictingDatesWarning={setShowConflictingDatesWarning}
            />
        </>
    );
}

export default EventCalendarClientSide;