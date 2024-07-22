export interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    date_of_birth: string; // ISO string format
    profile_picture?: string;
    bio?: string;
    address?: string;
    country?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    twitter_profile?: string;
    facebook_profile?: string;
    instagram_profile?: string;
    snapchat_profile?: string;
    youtube_profile?: string;
    twitch_profile?: string;
    created_at: string; // ISO string format
    updated_at: string; // ISO string format
}