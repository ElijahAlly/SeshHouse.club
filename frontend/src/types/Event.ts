import { DocumentType } from './Document';
import { File } from './File';

export const EVENT_STATUSES = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    DENIED: 'DENIED',
} as const;

export const EVENT_ROOMS = {
    CAFE: 'CAFE',
    MUSIC_STUDIO: 'MUSIC_STUDIO',
    PODCAST_ROOM: 'PODCAST_ROOM',
    UPSTAIRS_BAR: 'UPSTAIRS_BAR',
    STAGE_HALL: 'STAGE_HALL',
    UPSTAIRS_BACK_ROOM: 'UPSTAIRS_BACK_ROOM'
} as const;

export const EVENT_TYPES = {
    CONCERT: 'CONCERT',
    STUDIO_RECORDING_SESSION: 'STUDIO_RECORDING_SESSION',
    PODCAST: 'PODCAST',
    POKER_NIGHT: 'POKER_NIGHT',
    OTHER: 'OTHER',
} as const;

export const getFormattedType = (type: string) => {
    if (!type) return '';
    return type.split('_').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(' ');
}

export const getFormattedRoomType = (type: string) => {
    if (!type) return '';
    return type.split('_').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(' ');
}

export const getFormattedStatusType = (type: string) => {
    if (!type) return '';
    return type.split('').map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join('');
}

export type EventDateType = {
    selectedTimes: { [key: string]: string };
    selectedDates: Date[];
}
export type EventStatusType = (typeof EVENT_STATUSES)[keyof typeof EVENT_STATUSES];
export type EventRoomType = (typeof EVENT_ROOMS)[keyof typeof EVENT_ROOMS] | 'ALL';
export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

export interface Event {
    id: number;
    title: string;
    description: string;
    dates: EventDateType; 
    location: string;
    capacity: number;
    organizer_id: number;
    type: EventType;
    rooms: {
        rooms: EventRoomType[];
    };
    registration_deadline: Date | null;
    registration_fee: number;
    tags: string[];
    status: EventStatusType;
    attendees_count: number;
    thumbnail: string;
    documents: File[];
}

export interface BookEventType {
    id?: string;
    title: string;
    description: string;
    dates: EventDateType;
    location: string;
    capacity: number;
    organizer_id: number;
    type: EventType;
    rooms: {
        rooms: EventRoomType[];
    };
    registration_deadline: Date | null;
    registration_fee: number;
    tags: string[];
    attendees_count: number;
    thumbnail: string;
    documents: File[];
}