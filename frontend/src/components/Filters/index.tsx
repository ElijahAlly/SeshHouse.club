import { FunctionComponent, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { EVENT_ROOMS, EVENT_STATUSES, EVENT_TYPES, EventRoomType, EventStatusType, EventType, getFormattedRoomType, getFormattedType } from "@/types/Event";

interface FiltersProps {
    type: 'events' | 'cafeitems' | 'users';
    onApplyFilters: (filters: any) => void;
    prevFilters: any;
    shouldShowStatuses: boolean;
}

const Filters: FunctionComponent<FiltersProps> = ({ type, onApplyFilters, prevFilters, shouldShowStatuses }) => {
    const [selectedEventType, setSelectedEventType] = useState<EventType | undefined>(undefined);
    const [selectedEventStatus, setSelectedEventStatus] = useState<EventStatusType | undefined>(undefined);
    const [selectedEventRooms, setSelectedEventRooms] = useState<EventRoomType[]>([]);
    const [openFilters, setOpenFilters] = useState<boolean>(false);

    const applyFilters = () => {
        onApplyFilters({
            eventType: selectedEventType,
            eventStatus: selectedEventStatus,
            eventRoom: selectedEventRooms,
        });
        setOpenFilters(false);
    };

    const cancelAndCloseFilters = () => {
        onApplyFilters(prevFilters);
        setOpenFilters(false);
    };

    const clearAllFilters = () => {
        setSelectedEventType(undefined);
        setSelectedEventStatus(undefined);
        setSelectedEventRooms([]);
        onApplyFilters({
           eventType: undefined,
            eventStatus: undefined,
            eventRoom: undefined, 
        });
        setOpenFilters(false);
    };
    
    const handleFilterToggle = (isOpen: boolean) => {
        setOpenFilters(isOpen);
    }

    const isFiltersActive = !!(selectedEventRooms.length > 0 || selectedEventStatus || selectedEventType);

    return (
        <div className='flex flex-col items-center my-4'>
            <Drawer modal={false} open={openFilters} onOpenChange={handleFilterToggle} onClose={() => setOpenFilters(false)} >
                <DrawerTrigger className='border rounded-md hover:shadow-md p-2 mb-2'>{isFiltersActive ? 'Edit' : 'Add'} Filters +</DrawerTrigger>
                <DrawerContent className='flex flex-col items-center w-full h-4/5 md:h-3/5 bg-white shadow-2xl px-6'>
                    <hr 
                        className='w-40 rounded-md bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-300 transition-all duration-150' 
                        style={{ cursor: 'grab', height: '4.5px' }} 
                        onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                        onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                    />
                    <DrawerHeader className='flex flex-col items-center'>
                        <DrawerTitle className='text-md md:text-xl'>Set Filters to narrow down Event search</DrawerTitle>
                        <DrawerDescription className='text-xs md:text-lg'>For specific dates, close and choose dates on calendar.</DrawerDescription>
                    </DrawerHeader>
                    <div className='w-full my-3 flex flex-wrap justify-around'>
                        <div
                            onClick={applyFilters}
                            className='text-center max-w-fit m-2 rounded-md border select-none border-green-500 hover:border-green-600 text-green-500 hover:text-green-600 p-1'
                        >
                            <DrawerClose>Set Filters</DrawerClose>
                        </div>
                        {isFiltersActive && (
                            <Button
                                onClick={clearAllFilters}
                                className='text-center max-w-fit m-2 rounded-md border select-none border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 p-1'
                            >
                                Clear All Filters
                            </Button>
                        )}
                        <div 
                            onClick={cancelAndCloseFilters}
                            className='text-center max-w-fit m-2 rounded-md border select-none border-yellow-500 hover:border-yellow-600 text-yellow-500 hover:text-yellow-600 p-1'
                        >
                            <DrawerClose>Cancel & Close</DrawerClose>
                        </div>
                    </div>
                    <div className='h-full w-full border rounded-sm shadow-sm hover:shadow-md p-4 mb-12 overflow-y-auto'>
                        <Select value={selectedEventType || undefined} onValueChange={(str) => setSelectedEventType(str as EventType)}>
                            <SelectTrigger className="w-fit my-3 p-4">
                                <SelectValue placeholder="Select Event Type" defaultValue={selectedEventType || undefined} />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    {Object.values({ALL: 'ALL', ...EVENT_TYPES}).map((eventType, i) => (
                                        <SelectItem value={eventType} key={i}>{getFormattedType(eventType)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {shouldShowStatuses && (
                            <Select value={selectedEventStatus || undefined} onValueChange={(str) => setSelectedEventStatus(str as EventStatusType)}>
                                <SelectTrigger className="w-fit my-3 p-4">
                                    <SelectValue placeholder="Select Event Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        {Object.values({ALL: 'ALL', ...EVENT_STATUSES}).map((eventStatus, i) => (
                                            <SelectItem value={eventStatus} key={i}>{getFormattedType(eventStatus)}</SelectItem>
                                        ))} 
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                        {/* <Select value={selectedEventRooms[0]} onValueChange={(str: EventRoomType) => setSelectedEventRooms(prev => {prev[0]= str; return prev})}>
                            <SelectTrigger className="w-fit my-3 p-4">
                                <SelectValue placeholder="Select a Room +" defaultValue={selectedEventRooms[1]} />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    {selectedEventRooms.map((room, i) => (
                                        <SelectItem value={room} key={i}>{getFormattedRoomType(room)}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select> */}
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Filters;
