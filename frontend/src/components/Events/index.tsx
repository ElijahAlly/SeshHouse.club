'use client'

import { useEffect, useState } from 'react';
import { BookEventType, Event, EVENT_STATUSES, EventRoomType, EventStatusType, EventType } from '@/types/Event';
import EventItem from '../EventItem';
import instance from '../../lib/axios';
import Filters from '../Filters';
import BookEventItem from '../BookEventItem';
import axios from 'axios';
import EventCalendar from '../EventCalendar';
import { UserType } from '@/types/User';
import { usePathname, useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';
import { useEventStore } from '@/stores/event';

interface Props {
    user: UserType | null;
    isOnAdminPage: boolean;
    onlyCurrentUsersEvents?: boolean;
    isBooking?: boolean;
    setShowConflictingDatesWarning?: (val: boolean) => void;
}

interface Filters {
    eventType: EventType | 'ALL' | undefined;
    eventStatus: EventStatusType | 'ALL' | undefined;
    eventRooms: EventRoomType[];
}

const Events: React.FC<Props> = ({ user, isOnAdminPage, onlyCurrentUsersEvents, isBooking = false, setShowConflictingDatesWarning }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { selectedTimes, selectedDates } = useEventStore();
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [showAllBookings, setShowAllBookings] = useState<boolean>(false);
    const [dates, setDates] = useState<Date[]>([]);
    const [eventsToBook, setEventsToBook] = useState<BookEventType[]>([]);
    const [section, setSection] = useState<'book' | 'view'>('book');
    const [filters, setFilters] = useState<Filters>({ eventType: undefined, eventStatus: undefined, eventRooms: [] });

    const updateDatesSelected = (dates: Date[]) => {
        setDates(dates);
    }

    const filterEvents = () => {
        // console.log('should filter', filters);
        let newFilteredEvents = events;

        // if (filters.eventType && filters.eventType !== 'ALL') {
        //     newFilteredEvents = newFilteredEvents.filter(event => event.type === filters.eventType);
        // }

        // if (filters.eventStatus && filters.eventStatus !== 'ALL') {
        //     newFilteredEvents = newFilteredEvents.filter(event => event.status === filters.eventStatus);
        // }

        // if (filters.eventRooms.length && !filters.eventRooms.includes('ALL')) {
        //     newFilteredEvents = newFilteredEvents.filter(event => event.rooms.rooms.some(eventRoom => filters.eventRooms.includes(eventRoom)));
        // }

        // Filter by selected dates on calendar
        newFilteredEvents = newFilteredEvents.filter(event => {
            return event.dates.selectedDates.some(date => {
                const eventDate = new Date(date);
                return dates.some(filteredDate => {
                    return (filteredDate.getFullYear() === eventDate.getFullYear()
                        && filteredDate.getMonth() === eventDate.getMonth()
                        && filteredDate.getDate() === eventDate.getDate()
                    )
                });
            });
        });

        // sort event by earliest date // ? this happens when events are first fetched but may need to be done again if user sorts events by date
        // newFilteredEvents.sort((eventA, eventB) => {
        //     // Get the earliest date in each event's selectedDates array
        //     const earliestDateA = Math.min(...eventA.dates.selectedDates.map(date => new Date(date).getTime()));
        //     const earliestDateB = Math.min(...eventB.dates.selectedDates.map(date => new Date(date).getTime()));
        //     return earliestDateA - earliestDateB;
        // });

        setFilteredEvents(newFilteredEvents);
    }

    const getEvents = async () => {
        try {
            const res = await instance.get('/event' 
                + (onlyCurrentUsersEvents ? `?organizer_id=${user?.id}` : `?status=${isOnAdminPage ? EVENT_STATUSES.PENDING : EVENT_STATUSES.APPROVED}`) 
                + '&exact_match=true'
            )
            // console.log('events res', res);
            const newEvents = res.data.data.sort((eventA: Event, eventB: Event) => {
                // Get the earliest date in each event's selectedDates array
                const earliestDateA = Math.min(...eventA.dates.selectedDates.map(date => new Date(date).getTime()));
                const earliestDateB = Math.min(...eventB.dates.selectedDates.map(date => new Date(date).getTime()));
                return earliestDateA - earliestDateB;
            });
            setEvents(newEvents);
        } catch (err) {
            console.error('There was an error fetching the events!', err);
        }
    }

    const getEventsToBook = async () => {
        try {
            const res = await instance.get('/events-to-book');
            setEventsToBook(res.data.data);
        } catch (err) {
            console.error('There was an error fetching the events!', err);
        }
    }

    const refreshEvents = () => {
        getEvents();
    }

    const noEventsOnDates = dates.filter(date => {
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // Check if there is any event on the current date
        const isEventOnDate = filteredEvents.some(event => {
            return event.dates.selectedDates.some(eventDate => {
                return new Date(eventDate).toISOString().split('T')[0] === formattedDate;
            });
        });

        // If no event found on this date, keep it in the noEventsOnDates list
        return !isEventOnDate;
    });

    const handleShowAllBookingsCheck = () => {
        const prev = showAllBookings;
        setShowAllBookings(!prev); 
        prev ? filterEvents() : setFilteredEvents(events);
    }

    const isFiltersActive = !!(filters.eventRooms.length > 0 || filters.eventStatus || filters.eventType);

    const getEventsMatchingSelectedDates = (): Event[] => {
        const filteredEventsByDateSelected: Event[] = [];
        events.map(event => {
            if (event.dates.selectedDates.some(date => {
                const eventDate = new Date(date);
                return selectedDates.some(selectedDate => {
                    const newSelectedDate = new Date(selectedDate);
                    return (eventDate.getDate() === newSelectedDate.getDate()
                        && eventDate.getMonth() === newSelectedDate.getMonth()
                        && eventDate.getFullYear() === newSelectedDate.getFullYear()
                    )
                })
            })) filteredEventsByDateSelected.push(event);
        })

        if (filteredEventsByDateSelected.length > 0) {
            setShowConflictingDatesWarning(true);
        } else {
            setShowConflictingDatesWarning(false);
        }

        return filteredEventsByDateSelected;
    }

    useEffect(() => {
        filterEvents();
    }, [dates, filters, events])

    useEffect(() => {
        getEvents();
        getEventsToBook();
    }, []);

    return (
        <div className={`${isBooking ? 'mt-6' : 'mt-16'} w-full flex flex-col items-center`}>
            {!isOnAdminPage && !isBooking && <h1 className='h-fit text-xl md:text-4xl font-light mb-9'>{section === 'view' ? 'Find an' : 'Hold Your'} Event at SeshHouse!</h1>}
            {!isOnAdminPage && !isBooking && (
                <div className={`flex flex-wrap h-fit text-lg font-light`}>
                    <h3
                        className={`select-none text-sm md:text-lg cursor-pointer my-3 mr-6 border rounded-md p-3 hover:shadow-md ${section === 'book' ? 'text-green-500 border-green-500' : 'hover:text-green-700 hover:border-green-700'}`}
                        onClick={() => section === 'view' && setSection('book')}
                    >
                        Book Your Event
                    </h3>
                    <h3
                        className={`select-none text-sm md:text-lg cursor-pointer my-3 border rounded-md p-3 hover:shadow-md ${section === 'view' ? 'text-green-500 border-green-500' : 'hover:text-green-700 hover:border-green-700'}`}
                        onClick={() => section === 'book' && setSection('view')}
                    >
                        View All Events
                    </h3>
                </div>
            )}
            {(section === 'view' || isOnAdminPage) && (
                <div className='flex flex-col h-fit w-full items-center pb-96'>
                    <h2 className="text-md md:text-xl m-6 text-center">Choose days to find {isOnAdminPage ? onlyCurrentUsersEvents ? 'your bookings' : 'bookings and review' : 'events'}.</h2>
                    <EventCalendar 
                        events={events} 
                        user={user} 
                        updateDatesSelected={updateDatesSelected} 
                    />
                    {/* <Filters 
                        type={'events'} 
                        onApplyFilters={setFilters} 
                        prevFilters={filters} 
                        shouldShowStatuses={isOnAdminPage && !onlyCurrentUsersEvents} 
                    /> */}
                        {/* <div className='flex flex-col items-center'> */}
                    <div className='flex items-center border rounded-md p-3 cursor-pointer hover:shadow-md' onClick={handleShowAllBookingsCheck}>
                        <Checkbox
                            className='mr-3'
                            checked={showAllBookings}
                        />
                        <p>Show All Bookings</p>
                    </div>
                            {/* <p className='text-sm font-light mt-2 mb-6'>Overrides active filters, but does not remove them</p>
                        </div> */}
                    <ul className='h-fit w-full flex flex-col px-3 md:px-12'>
                        {(showAllBookings ? events : filteredEvents).map(event => (
                            <EventItem 
                                key={event.id} 
                                event={event} 
                                user={user} 
                                isOnAdminPage={isOnAdminPage} 
                                isViewingOwnEvents={!!onlyCurrentUsersEvents} 
                                refreshEvents={refreshEvents}
                            />
                        ))}
                        {(noEventsOnDates.length > 0 || filteredEvents.length === 0) && (
                            <div className='h-fit w-full flex flex-col border rounded-md my-3 py-6 px-3'>
                                <h2>
                                    {dates.length > 0 ? (
                                        `${onlyCurrentUsersEvents 
                                            ? 'You do not have any' 
                                            : 'There are no'} events on ${noEventsOnDates.map((date) =>  ' ' + date.toLocaleDateString()).join(', ')} 
                                            ${isFiltersActive 
                                                ? 'with your filters. Try removing some filters to get more results.' 
                                                : ''
                                            } ${isOnAdminPage && !onlyCurrentUsersEvents ? 'to review' : ''}`
                                    ) : (
                                        showAllBookings ? '' : 'Select dates to view events'
                                    )}
                                </h2>
                                <p onClick={() => pathname.startsWith('/events') ? setSection('book') : router.push('/events')} className='text-green-500 hover:text-green-600 underline text-sm cursor-pointer mt-3'>Go book an event</p>
                            </div>
                        )}
                    </ul>
                </div>
            )}
            {section === 'book' && !isOnAdminPage && !isBooking && (
                <ul className='h-fit w-full flex flex-col p-2 pb-52'>
                    <div className='flex flex-col w-full h-fit pt-9 px-3'>
                        {eventsToBook.map((event: BookEventType, i: number) => (
                            <BookEventItem key={i} event={event}/>
                        ))}
                    </div>
                </ul>
            )}
            {isBooking && (
                <ul className='h-fit flex flex-col p-2 w-full md:w-3/4'>
                    <div className='flex flex-col w-full h-fit px-3'>
                        {getEventsMatchingSelectedDates().map((event: Event, i: number) => (
                            <EventItem 
                                key={i} 
                                event={event} 
                                user={user} 
                                isOnAdminPage={isOnAdminPage} 
                                isViewingOwnEvents={!!onlyCurrentUsersEvents} 
                                refreshEvents={refreshEvents}
                                isBooking={isBooking}
                            />
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
}

export default Events;