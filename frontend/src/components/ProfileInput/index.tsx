'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '../ui/button';
import Image from 'next/image';

interface ProfileInputProps {
  name: string;
  label: string;
  value?: string;
  isEditing: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLargeField?: boolean;
  isDate?: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ name, label, value, isEditing, error, onChange, isLargeField, isDate }) => {
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

export default ProfileInput;
