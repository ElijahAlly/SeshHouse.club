export interface Event {
    id?: string;
    title: string;
    description: string;
    date: string; 
    location: string;
    capacity: number;
    organizer_id: number;
    type: string;
    registration_deadline?: string;
    registration_fee?: number; 
    tags?: string;
    status?: string;
    attendees_count?: number;
    thumbnail?: string;
    documents?: string; 
    created_at?: string;
    updated_at?: string;
}