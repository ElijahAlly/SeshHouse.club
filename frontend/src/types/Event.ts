import { DocumentType } from './Document';

export interface EventType {
    id: number;
    title: string;
    description: string;
    date: string; // ISO string format
    location: string;
    capacity: number;
    organizer_id: number;
    event_type: string;
    registration_deadline: string | null; // ISO string format
    registration_fee: number;
    tags: string[];
    status: string;
    attendees_count: number;
    event_image: string;
    documents: DocumentType[];
}
