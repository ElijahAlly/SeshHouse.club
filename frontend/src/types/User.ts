export interface UserType {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string | null;
    profile_picture: string | null;
    bio: string | null;
    date_of_birth: string; // ISO string format
    address: string | null;
    country: string | null;
    city: string | null;
    state: string | null;
    twitter_profile: string | null;
    facebook_profile: string | null;
    instagram_profile: string | null;
    snapchat_profile: string | null;
    youtube_profile: string | null;
    twitch_profile: string | null;
    created_at: string; // ISO string format
    updated_at: string; // ISO string format
}