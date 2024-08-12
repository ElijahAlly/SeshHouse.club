'use client';

import { Button } from "@/components/ui/button";
import instance from "@/lib/axios";
import { useEventStore } from "@/stores/event";
import { BookEventType, EventRoomType, getFormattedRoomType } from "@/types/Event";
import { UserType } from "@/types/User";
import { getUrlToDisplay } from "@/util/routes";
import { usePathname, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ConfirmClientSideProps {
    user: UserType | null;
}

const ConfirmClientSide: FunctionComponent<ConfirmClientSideProps> = ({ user }) => {
    const router = useRouter();
    const path = usePathname();
    let eventTitle = getUrlToDisplay(path.split('/')[2] || '');
    eventTitle = decodeURI(eventTitle);
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
    const { selectedTimes, selectedDates } = useEventStore();
    const [eventToBook, setEventToBook] = useState<BookEventType | null>(null);
    const [selectedRooms, setSelectedRooms] = useState<{[key: string]: boolean}>({});
    const [description, setDescription] = useState<string>('');
    const registrationDeadline = new Date();
    registrationDeadline.setFullYear(1000);

    const createEvent = async () => {
        // console.log('createEvent', eventToBook)
        try {
            await instance('POST', `/event`, {
                title: eventTitle,
                description,
                dates: {
                    selectedTimes,
                    selectedDates
                },
                location: '',
                capacity: 0,
                organizer_id: user?.id || 0,
                type: eventToBook?.type || 'OTHER',
                rooms: { rooms: Object.keys(selectedRooms) },
                registration_deadline: registrationDeadline,
                registration_fee: 0,
                tags: [],
                status: 'PENDING',
                attendees_count: 0,
                thumbnail: '',
                documents: []
            } as BookEventType);
            setSubmittedSuccessfully(true);
            setTimeout(() => {
                setSubmittedSuccessfully(false);
                window.location.href = '/events';
                localStorage.clear();
            }, 1200)
        } catch (err) {
            console.error('There was an error fetching the events!', err);
        }
    }

    const handleRoomsCheckboxClick = (room: EventRoomType) => {
        setSelectedRooms(prev => ({
            ...prev,
            [room]: !prev[room]
        }));
    }

    const getEventToBook = async () => {
        const eventToBookRes = await instance('GET', `/event-to-book?title=${eventTitle}`);
        setEventToBook(eventToBookRes.data[0]);
    }

    useEffect(() => {
        getEventToBook();
    }, [])

    return (
        <div className='flex flex-col w-full md:w-4/5 overflow-y-hidden p-6'>
            <h2 className='text-lg'>Confirm the {eventTitle} info and submit</h2>
            <div className='flex w-4/5 my-6'>
                <Button variant='outline' onClick={() => router.back()}>{'<-'} Back</Button>
            </div>
            <div className='border rounded-md p-3 w-full'>
                <p className='required'>Choose room(s) to hold your event:</p>
                <div className='flex flex-wrap'>
                    {eventToBook?.rooms.rooms.map((room, i) => (
                        <div 
                            key={i} 
                            className='select-none w-fit m-2 p-1 pr-2 flex items-center cursor-pointer border rounded-md hover:shadow-sm' 
                            onClick={() => handleRoomsCheckboxClick(room)}
                            style={{
                                maxWidth: 'fit-content'
                            }}
                        >
                            <Checkbox
                                checked={!!selectedRooms[room]}
                                className="mx-2"
                            />
                            <p className='w-fit'>{getFormattedRoomType(room)}</p>
                        </div>
                    ))}
                </div>
                <hr className='my-4' />
                <p className='required'>Add description for your event</p>
                <textarea 
                    onChange={(event: any) => setDescription(event.target.value)} 
                    value={description} 
                    className='border w-3/4 h-24 rounded-md focus:border-green-500 active:border-green-500 outline-none p-2 hover:shadow-sm'
                    style={{
                        resize: 'both',
                        maxHeight: '201px',
                        maxWidth: '90%',
                        fontFamily: 'Palantino'
                    }}
                />
            </div>
            <p className='my-2 text-light text-sm italic'>Submitting will NOT book your event.</p>
            <p className='my-2 text-light text-sm italic'>After submitting, the event will be Pending and you will recieve a confirmation email.</p>
            <p className='my-2 text-light text-sm italic'>Our team will email you when the status is updated</p>
            <div>
                {submittedSuccessfully && <p className='my-2 text-light text-green-500 text-sm'>Successfully Submitted!</p>}
                <Button
                    variant={(submittedSuccessfully || !description || !Object.values(selectedRooms).some(room => room)) ? 'disabled' : 'submit'}
                    onClick={() => createEvent()} 
                    disabled={submittedSuccessfully || !description || !Object.values(selectedRooms).some(room => room)}
                >
                    Submit Event
                </Button>
            </div>
        </div>
    )
}

export default ConfirmClientSide;