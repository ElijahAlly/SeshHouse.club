'use client';

import { getSessionFromCookies } from '@/lib/crypt';
import { UserType } from '@/types/User';
import Image from 'next/image';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { z } from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LogoutButton from '@/components/LogoutButton';
import { Textarea } from '@/components/ui/textarea';
import instance from '@/lib/axios';
import { formatDateYYYYMMDD } from '@/util/date';
import { UploadButton, UploadDropzone } from '@/util/uploadThing';
import { File } from '@/types/File';

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
    phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Phone number must be a valid international phone number.",
    }),
    date_of_birth: z.string().refine((date) => {
        const dateArr = date.split('-');
        return new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2])) <= new Date(today.getFullYear() - 18, today.getMonth(), today.getDay())
    }, { message: "Must be 18 or older to book tickets." }),
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

const MyProfileClientSide: FunctionComponent = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [user, setUser] = useState<Partial<UserType> | null>(null);
    const [formData, setFormData] = useState<Partial<UserType>>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [saved, setSaved] = useState<Boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getSessionFromCookies();
            const formattedUser = {
                ...user,
                date_of_birth: formatDateYYYYMMDD(user?.date_of_birth || '')
            }
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
        <div className='flex flex-col w-full p-20 pt-12 h-full overflow-y-scroll'>
            <div className='flex flex-col md:flex-row md:justify-between md:items-end h-fit'>
                <div className='flex flex-col items-center md:items-start'>
                    <div className='flex w-fit h-full'>
                        <Avatar className='mb-4 h-40 w-40 border rounded-full'>
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
                <div className='flex flex-col items-start md:items-center mt-4 md:mt-0 md:flex-row'>
                    {isEditing && (
                        <Button 
                            className='mb-2 md:mb-0 md:mr-4 text-yellow-500 border-yellow-500 hover:text-yellow-600 hover:border-yellow-600' 
                            variant='outline'
                            onClick={handleCancelEditProfileButtonClick}
                        >
                            Cancel Editing Your Profile
                        </Button>
                    )}
                    <Button
                        className={`mb-6 md:mb-0 md:mr-4 ${isEditing ? 'text-green-500 border-green-500 hover:text-green-600 hover:border-green-600' : 'hover:text-blue-500 hover:border-blue-500'}`}
                        variant='outline'
                        onClick={handleEditProfileButtonClick}
                    >
                        {isEditing ? 'Save' : 'Edit'} Your Profile
                    </Button>
                    <LogoutButton />
                </div>
            </div>
            <div className='h-12 mt-3'>
                {saved && <span className="h-full align-text-bottom bg-green-500 text-white text-sm rounded-md p-2">Saved!</span>}
            </div>
            <div className='relative flex flex-col h-full'>
                <hr />
                <h2 className='mt-4 text-xl font-semibold'>Required Info:</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                    <InputField name='first_name' label='First Name' value={formData.first_name} isEditing={isEditing} error={errors.first_name} onChange={handleInputChange} />
                    <InputField name='last_name' label='Last Name' value={formData.last_name} isEditing={isEditing} error={errors.last_name} onChange={handleInputChange} />
                    <InputField name='username' label='Username' value={formData.username} isEditing={isEditing} error={errors.username} onChange={handleInputChange} />
                    <InputField name='email' label='Email' value={formData.email} isEditing={isEditing} error={errors.email} onChange={handleInputChange} />
                    <InputField name='phone_number' label='Phone Number' value={formData.phone_number} isEditing={isEditing} error={errors.phone_number} onChange={handleInputChange} />
                    <InputField name='date_of_birth' label='Date of Birth' value={formData.date_of_birth} isEditing={isEditing} error={errors.date_of_birth} onChange={handleInputChange} isDate={true} />
                    <InputField name='bio' label='Bio' value={formData.bio} isEditing={isEditing} error={errors.bio} onChange={handleInputChange} isLargeField={true}/>
                </div>
                <hr />
                <h2 className='mt-4 text-xl font-semibold'>Address:</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                    <InputField name='address' label='Address' value={formData.address} isEditing={isEditing} error={errors.address} onChange={handleInputChange} />
                    <InputField name='country' label='Country' value={formData.country} isEditing={isEditing} error={errors.country} onChange={handleInputChange} />
                    <InputField name='city' label='City' value={formData.city} isEditing={isEditing} error={errors.city} onChange={handleInputChange} />
                    <InputField name='state' label='State' value={formData.state} isEditing={isEditing} error={errors.state} onChange={handleInputChange} />
                    <InputField name='zipcode' label='Zipcode' value={formData.zipcode} isEditing={isEditing} error={errors.zipcode} onChange={handleInputChange} />
                </div>
                <hr />
                <h2 className='mt-4 text-xl font-semibold'>Social Links:</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                    <InputField name='twitter_profile' label='Twitter Profile' value={formData.twitter_profile} isEditing={isEditing} error={errors.twitter_profile} onChange={handleInputChange} />
                    <InputField name='facebook_profile' label='Facebook Profile' value={formData.facebook_profile} isEditing={isEditing} error={errors.facebook_profile} onChange={handleInputChange} />
                    <InputField name='instagram_profile' label='Instagram Profile' value={formData.instagram_profile} isEditing={isEditing} error={errors.instagram_profile} onChange={handleInputChange} />
                    <InputField name='snapchat_profile' label='Snapchat Profile' value={formData.snapchat_profile} isEditing={isEditing} error={errors.snapchat_profile} onChange={handleInputChange} />
                    <InputField name='youtube_profile' label='YouTube Profile' value={formData.youtube_profile} isEditing={isEditing} error={errors.youtube_profile} onChange={handleInputChange} />
                    <InputField name='twitch_profile' label='Twitch Profile' value={formData.twitch_profile} isEditing={isEditing} error={errors.twitch_profile} onChange={handleInputChange} />
                </div>
            </div>
        </div>
    );
};

interface InputFieldProps {
  name: string;
  label: string;
  value?: string;
  isEditing: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLargeField?: boolean;
  isDate?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, value, isEditing, error, onChange, isLargeField, isDate }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (value) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className='mb-1 font-medium'>{label}</label>
            <div className="flex items-center">
                {isDate ? (
                    <Input
                        className={`border rounded-md p-2 ${isEditing ? 'border-orange-300' : 'border-gray-300 focus-visible:border-green-500'} ${error ? 'border-red-500' : ''} ${value && value.length ? '' : 'opacity-90'}`}
                        type='date'
                        name={name}
                        id={name}
                        value={value || ''}
                        placeholder={'Add your ' + label}
                        readOnly={!isEditing}
                        onChange={onChange} 
                    />
                ) : (
                    <>
                        {isLargeField ? (
                            <Textarea 
                                className={`min-h-[42px] max-h-[99px] border rounded-md p-2 ${isEditing ? 'border-orange-300' : 'border-gray-300 focus-visible:border-green-500'} ${error ? 'border-red-500' : ''} ${value && value.length ? '' : 'opacity-90'}`}
                                name={name}
                                id={name}
                                value={value || ''}
                                placeholder={'Add your ' + label}
                                readOnly={!isEditing}
                                onChange={onChange} 
                            />
                        ): (
                            <Input
                                className={`border rounded-md p-2 ${isEditing ? 'border-orange-300' : 'border-gray-300 focus-visible:border-green-500'} ${error ? 'border-red-500' : ''} ${value && value.length ? '' : 'opacity-90'}`}
                                type='text'
                                name={name}
                                id={name}
                                value={value || ''}
                                placeholder={'Add your ' + label}
                                readOnly={!isEditing}
                                onChange={onChange}
                            />
                        )}
                    </>
                )}
                <Button
                    type="button"
                    className={`ml-2 p-2 select-none`}
                    onClick={handleCopy}
                >
                    <Image src={copied ? '/images/copy-text-icon-green.png' : '/images/copy-text-icon.png'} height={21} width={21} alt='copy button' />
                </Button>
            </div>
            {copied && <span className="text-green-500 text-sm mt-1">Copied!</span>}
            {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
        </div>
    )
};

export default MyProfileClientSide;