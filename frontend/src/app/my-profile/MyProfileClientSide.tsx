'use client';

import { getSessionFromCookies } from '@/lib/crypt';
import { USER_ROLES, UserType } from '@/types/User';
import Image from 'next/image';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/LogoutButton';
import instance from '@/lib/axios';
import { formatDateYYYYMMDD } from '@/util/date';
import { UploadButton } from '@/util/uploadThing';
import ProfileInput from '@/components/ProfileInput';
import Events from '@/components/Events';
import parsePhoneNumberFromString from 'libphonenumber-js';
import EventsToBook from '@/components/EventsToBook';
import { DividerHorizontalIcon, DividerVerticalIcon } from '@radix-ui/react-icons';

const today = new Date();

const userSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email('Invalid email address'),
    phone_number: z.string().optional().refine((value) => {
        if (value && value.length > 0) {
            const phoneNumber = parsePhoneNumberFromString(value, {
                defaultCountry: 'US'
            });
            return phoneNumber?.isValid() || false;
        }
        return true;
    }, {
        message: "Phone number must be a valid phone number.",
    }),
    date_of_birth: z.string()
        .refine((dateStr) => {
            const date = new Date(dateStr);
            if (date === today) return false;
            const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return date <= minDate;
        }, { message: "Must be 18 or older to sign up." }),
    profile_picture: z.string().nullable().default(''),
    bio: z.string().nullable().default(''),
    address: z.string().nullable().default(''),
    country: z.string().nullable().default(''),
    city: z.string().nullable().default(''),
    state: z.string().nullable().default(''),
    zipcode: z.string().nullable().default(''),
    twitter_profile: z.string().nullable().default(''),
    facebook_profile: z.string().nullable().default(''),
    instagram_profile: z.string().nullable().default(''),
    snapchat_profile: z.string().nullable().default(''),
    youtube_profile: z.string().nullable().default(''),
    twitch_profile: z.string().nullable().default(''),
});

export const SECTION_ENUMS = {
    account: 'Account',
    bookings: 'Bookings',
    review: 'Review',
    events_to_book: 'Events To Book',
    settings: 'Settings',
} as const;
export type SectionType = (typeof SECTION_ENUMS)[keyof typeof SECTION_ENUMS];

const MyProfileClientSide: FunctionComponent = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<Partial<UserType> | null>(null);
    const [fullUserInfo, setFullUserInfo] = useState<UserType | null>(null);
    const [formData, setFormData] = useState<Partial<UserType>>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [saved, setSaved] = useState<Boolean>(false);
    const [section, setSection] = useState<SectionType>(SECTION_ENUMS.account);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getSessionFromCookies();
            const formattedUser = {
                ...user,
                date_of_birth: formatDateYYYYMMDD(user?.date_of_birth || '')
            }
            setFullUserInfo(user);
            setUser(formattedUser);
            setFormData(formattedUser || {});
        };
        fetchUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const resetUserOnFrontend = async (user: Partial<UserType>) => {
        try {
            const res = await fetch('/api/auth/reset-user', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            })
            const updatedUser: UserType = (await res.json()).user;
            setUser(updatedUser);
        } catch (e) {
            console.error(e)
        }
    }

    const handleEditProfileButtonClick = async () => {
        if (isEditing) {
            try {
                const dataToSubmit = userSchema.parse(formData);
                setErrors({});
                const res = await instance.put('/user', { id: user?.id, ...dataToSubmit });
                await resetUserOnFrontend(res.data.user);
                setSaved(true);
                setTimeout(() => setSaved(false), 1800);
            } catch (err) {
                if (err instanceof z.ZodError) {
                    const newErrors: { [key: string]: string } = {};
                    err.errors.forEach((error) => {
                        console.log(error)
                        if (error.path[0]) {
                            newErrors[error.path[0]] = error.message;
                        }
                    });
                    setErrors(newErrors);
                    return;
                }
            }
        }
        setIsEditing((prev) => !prev);
    };

    const handleCancelEditProfileButtonClick = () => {
        setIsEditing(false);
        setFormData(user || {});
        setErrors({});
    };

    return (
        <div className='flex flex-col w-full px-6 md:px-20 pt-3 h-fit mt-20'>
            {(user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.SUPER_ADMIN) && (
                <div className='flex flex-col md:flex-row justify-center w-full mb-6 md:mb-3'>
                    {Object.values(SECTION_ENUMS).map((curSection, i) => (
                        <div key={i} className='h-fit flex flex-col md:flex-row'>
                            <h3
                                onClick={() => section !== curSection && setSection(curSection)}
                                className={`text-lg mx-3 cursor-pointer ${section === curSection ? 'text-green-500 hover:text-green-500 underline' : 'hover:text-green-500 hover:underline'}`}
                            >
                                {curSection[0].toUpperCase() + curSection.slice(1)}
                            </h3>
                            {i + 1 !== Object.values(SECTION_ENUMS).length && (
                                <>
                                    <DividerVerticalIcon className='h-full hidden md:block'/>
                                    <DividerHorizontalIcon className='w-fit block md:hidden ml-3'/>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className='flex flex-col md:flex-row md:justify-between md:items-end h-fit'>
                <div className='flex flex-col items-start'>
                    <div className='flex w-fit h-full'>
                        <Avatar className='mb-4 h-12 w-12 md:h-40 md:w-40 border rounded-full'>
                            <AvatarImage height={99} src={user?.profile_picture || ''} />
                            <AvatarFallback>
                                <Image
                                    src={'/images/user-icon-96-white.png'}
                                    height={99}
                                    width={99}
                                    alt="user profile icon/image"
                                    priority
                                />
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <UploadButton
                                endpoint="profilePicture"
                                onClientUploadComplete={async (res) => {
                                    const user = {
                                        ...res[0].serverData.user,
                                        date_of_birth: formatDateYYYYMMDD(res[0].serverData.user.date_of_birth)
                                    }
                                    await resetUserOnFrontend(user);
                                    handleCancelEditProfileButtonClick();
                                    window.location.reload();
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    console.error(error)
                                }}
                                className='m-4'
                            />
                        )}
                    </div>
                    <h2 className='font-light text-lg text-center md:text-left'>{user?.username}</h2>
                </div>
                <div className='flex items-center mt-4'>
                    {isEditing && (
                        <Button 
                            className='mr-4 text-yellow-500 border-yellow-500 hover:text-yellow-600 hover:border-yellow-600' 
                            variant='outline'
                            onClick={handleCancelEditProfileButtonClick}
                        >
                            Cancel Editing Your Profile
                        </Button>
                    )}
                    {section === SECTION_ENUMS.account && (
                        <Button
                            className={`mr-4 ${isEditing ? 'text-green-500 border-green-500 hover:text-green-600 hover:border-green-600' : 'hover:text-blue-500 hover:border-blue-500'}`}
                            variant='outline'
                            onClick={handleEditProfileButtonClick}
                        >
                            {isEditing ? 'Save' : 'Edit'} Your Profile
                        </Button>
                    )}
                    <LogoutButton />
                </div>
            </div>
            <hr className='my-3'/>
            <div className='h-12 mt-3'>
                {saved && <span className="h-full align-text-bottom bg-green-500 text-white text-sm rounded-md p-2">Saved!</span>}
            </div>
            {section === SECTION_ENUMS.account && (
                <div className='relative flex flex-col h-full'>
                    <h2 className='mt-4 text-xl font-semibold'>Required Info:</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                        <ProfileInput name='first_name' label='First Name' value={formData.first_name} isEditing={isEditing} error={errors.first_name} onChange={handleInputChange} />
                        <ProfileInput name='last_name' label='Last Name' value={formData.last_name} isEditing={isEditing} error={errors.last_name} onChange={handleInputChange} />
                        <ProfileInput name='username' label='Username' value={formData.username} isEditing={isEditing} error={errors.username} onChange={handleInputChange} />
                        <ProfileInput name='email' label='Email' value={formData.email} isEditing={isEditing} error={errors.email} onChange={handleInputChange} />
                        <ProfileInput name='phone_number' label='Phone Number' value={formData.phone_number} isEditing={isEditing} error={errors.phone_number} onChange={handleInputChange} />
                        <ProfileInput name='date_of_birth' label='Date of Birth' value={formData.date_of_birth} isEditing={isEditing} error={errors.date_of_birth} onChange={handleInputChange} isDate={true} />
                        <ProfileInput name='bio' label='Bio' value={formData.bio} isEditing={isEditing} error={errors.bio} onChange={handleInputChange} isLargeField={true}/>
                    </div>
                    <hr />
                    <h2 className='mt-4 text-xl font-semibold'>Address:</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                        <ProfileInput name='address' label='Address' value={formData.address} isEditing={isEditing} error={errors.address} onChange={handleInputChange} />
                        <ProfileInput name='country' label='Country' value={formData.country} isEditing={isEditing} error={errors.country} onChange={handleInputChange} />
                        <ProfileInput name='city' label='City' value={formData.city} isEditing={isEditing} error={errors.city} onChange={handleInputChange} />
                        <ProfileInput name='state' label='State' value={formData.state} isEditing={isEditing} error={errors.state} onChange={handleInputChange} />
                        <ProfileInput name='zipcode' label='Zipcode' value={formData.zipcode} isEditing={isEditing} error={errors.zipcode} onChange={handleInputChange} />
                    </div>
                    <hr />
                    <h2 className='mt-4 text-xl font-semibold'>Social Links:</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 pb-12'>
                        <ProfileInput name='twitter_profile' label='Twitter Profile' value={formData.twitter_profile} isEditing={isEditing} error={errors.twitter_profile} onChange={handleInputChange} />
                        <ProfileInput name='facebook_profile' label='Facebook Profile' value={formData.facebook_profile} isEditing={isEditing} error={errors.facebook_profile} onChange={handleInputChange} />
                        <ProfileInput name='instagram_profile' label='Instagram Profile' value={formData.instagram_profile} isEditing={isEditing} error={errors.instagram_profile} onChange={handleInputChange} />
                        <ProfileInput name='snapchat_profile' label='Snapchat Profile' value={formData.snapchat_profile} isEditing={isEditing} error={errors.snapchat_profile} onChange={handleInputChange} />
                        <ProfileInput name='youtube_profile' label='YouTube Profile' value={formData.youtube_profile} isEditing={isEditing} error={errors.youtube_profile} onChange={handleInputChange} />
                        <ProfileInput name='twitch_profile' label='Twitch Profile' value={formData.twitch_profile} isEditing={isEditing} error={errors.twitch_profile} onChange={handleInputChange} />
                    </div>
                </div>
            )}
            {section === SECTION_ENUMS.bookings && (
                <Events user={fullUserInfo} isOnAdminPage={true} onlyCurrentUsersEvents={true} />
            )}
            {section === SECTION_ENUMS.review && (
                <Events user={fullUserInfo} isOnAdminPage={true} />
            )}
            {section === SECTION_ENUMS.events_to_book && (
                <EventsToBook />
            )}
            {section === SECTION_ENUMS.settings && (
                <div>
                    <p>We are working on adding settings. Only Admins will see this page until it's complete.</p>
                </div>
            )}
        </div>
    );
};

export default MyProfileClientSide;