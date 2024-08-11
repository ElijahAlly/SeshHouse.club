export enum FileType {
    PROFILE_PICTURE = 'profile_picture',
    EVENT_THUMBNAIL = 'event_thumbnail',
    CAFE_ITEM_THUMBNAIL = 'cafe_item_thumbnail',
    CAFE_ITEM_IMAGE = 'cafe_item_image',
    HERO_IMAGE = 'hero_image',
}

export interface File {
    id?: string;
    file_url: string;
    user_id: string;
    uploaded_at: string;
    type: FileType
}