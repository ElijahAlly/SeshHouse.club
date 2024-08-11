export const USER_ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    SUPER_ADMIN: 'SUPER_ADMIN'
}

export type UserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserType {
    id?: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone_number: string;
    role: UserRoleType;
    password?: string;
    password_hash?: string;
    profile_picture?: string;
    bio?: string;
    date_of_birth?: string;
    street?: string;
    country?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    twitter_profile?: string;
    facebook_profile?: string;
    instagram_profile?: string;
    snapchat_profile?: string;
    twitch_profile?: string;
    youtube_profile?: string;
    created_at?: string;
    updated_at?: string;
}