'use client'

import { useEffect, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import instance from '@/lib/axios';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '../ui/button';
import Image from 'next/image';
import { ROUTE_PATHS } from '@/util/routes';
import { UserType } from '@/types/User';
import Link from 'next/link';

const specialCharacters = '!@#$%&-_+=.'
const numbers = '0123456789'
 
const today = new Date();

const loginFormSchema = z.object({
    username_or_email: z.string().min(2, {
        message: "Username or email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "password must be at least 2 characters.",
    }),
})

const signupFormSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Email must be valid"),
    phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Phone number must be a valid phone number.",
    }),
    password: z.string()
    .min(8, {
        message: "Password must be at least 8 characters.",
    })
    .refine((password) => password.includes(' '), { 
        message: 'Password cannot include a space.'
    })
    .refine((password) => !password.split('').some((char: string) => specialCharacters.includes(char)), {
        message: 'Password must include at least 1 special character ' + specialCharacters
    })
    .refine((password) => !password.split('').some((char: string) => numbers.includes(char)), {
        message: 'Password must include at least 1 number ' + numbers
    }),
    date_of_birth: z.string().refine((date) => {
        const dateArr = date.split('-');
        return new Date(Number(dateArr[0]), Number(dateArr[1]), Number(dateArr[2])) <= new Date(today.getFullYear() - 18, today.getMonth(), today.getDay())
    }, { message: "Must be 18 or older to sign up." }),
})

interface Props {
    page?: 'login' | 'signup'
}

const AuthForm: React.FC<Props> = ({ page }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordSrc, setShowPasswordSrc] = useState('/images/show-icon.png');
    const [hidePasswordSrc, setHidePasswordSrc] = useState('/images/hide-icon.png');

    const handleTogglePasswordView = () => {
        if (showPassword) {
            setShowPassword(prev => !prev);
            setHidePasswordSrc('/images/show-icon.gif');
            setTimeout(() => {
                setHidePasswordSrc('/images/hide-icon.png');
            }, 501);
        } else {
            setShowPassword(prev => !prev);
            setShowPasswordSrc('/images/hide-icon.gif')
            setTimeout(() => {
                setShowPasswordSrc('/images/show-icon.png');
            }, 501);
        }
    }

    const [section, setSection] = useState<'login' | 'signup'>(page ? page : 'login');

    const handleToggleSection = () => {
        if (section === 'login') {
            setSection('signup');
        } else {
            setSection('login');
        }
        setShowPassword(false);
    }

    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            date_of_birth: '',
            phone_number: ''
        },
    })

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username_or_email: '',
            password: '',
        },
    })

    const loginUserOnFrontend = async ({user, jwt }: { user: UserType, jwt: string }) => {
        await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, jwt }),
        })
        window.location.replace(ROUTE_PATHS.MY_PROFILE.INDEX);
    }

    const handleSubmit = async (values: z.infer<typeof signupFormSchema>) => {
        try {
            const signUpRes = await instance.post('/user', values);
            loginUserOnFrontend(signUpRes.data)
        } catch (err: any) {
            console.error(err)
        }
    };

    const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
        try {
            const loginRes = await instance.post('/login', values);
            console.log('loginRes', loginRes);
            loginUserOnFrontend(loginRes.data);
        } catch (err: any) {
            console.error(err)
        }
    };

    useEffect(() => {
        if (section === 'login') {
            const img = document.querySelector("#app-logo-login");
            if (img && img instanceof HTMLImageElement) {
                VanillaTilt.init(img, {
                    max: 9,
                    glare: false,
                    perspective: 100,
                    speed: 1500,
                    scale: 1,
                    axis: 'x'
                });
            };
        } else {
            const img = document.querySelector("#app-logo-signup");
            if (img && img instanceof HTMLImageElement) {
                VanillaTilt.init(img, {
                    max: 9,
                    glare: false,
                    perspective: 100,
                    speed: 1500,
                    scale: 1,
                    axis: 'x'
                });
            };
        }
    }, [section, setSection])

    const getLoginSection = () => {
        return (
            <div className="bg-slate-400 h-full w-1/2 z-10 flex justify-center transition-transform duration-700">
                <div className='flex flex-col w-4/5 items-center py-6'>
                    <h2 className="text-2xl my-4">Login</h2>
                    <Button onClick={handleToggleSection} variant='link'>or signup</Button>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="w-full space-y-4">
                            <FormField
                                control={loginForm.control}
                                name="username_or_email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username or Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Username or Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    placeholder="Create your Password" 
                                                    type={showPassword ? 'text' : 'password'} 
                                                    {...field} 
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleTogglePasswordView}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                >
                                                    {showPassword ? (
                                                        <Image src={showPasswordSrc} alt='show password icon' width={18} height={18} className='rounded-full' unoptimized/>
                                                    ) : (
                                                        <Image  src={hidePasswordSrc} alt='hide password icon'width={18} height={18} className='rounded-full' unoptimized/>
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-center w-full'>
                                <Button
                                    variant='default'
                                    className={`my-4 w-4/5 ${!loginForm.formState.isValid ? 'cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 cursor-pointer'}`}
                                    disabled={!loginForm.formState.isValid || loginForm.formState.isSubmitting}
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        )
    };

    // TODO: Fix signup form errors

    const getSignupSection = () => {
        return (
            <div className="bg-slate-400 h-full w-1/2 z-10 flex justify-center transition-transform duration-700">
                <div className='flex flex-col w-4/5 items-center py-6'>
                    <h2 className="text-2xl my-4">Signup</h2>
                    <Button onClick={handleToggleSection} variant='link'>or login</Button>
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(handleSubmit)} className="w-full space-y-4">
                            <FormField
                                control={signupForm.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your First Name" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.first_name?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Last Name" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.last_name?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Username" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.username?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Email" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.email?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='optional'>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your Phone Number" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.phone_number?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    placeholder="Create your Password" 
                                                    type={showPassword ? 'text' : 'password'} 
                                                    {...field} 
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleTogglePasswordView}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                >
                                                    {showPassword ? (
                                                        <Image src={showPasswordSrc} alt='show password icon' width={18} height={18} className='rounded-full' unoptimized/>
                                                    ) : (
                                                        <Image  src={hidePasswordSrc} alt='hide password icon'width={18} height={18} className='rounded-full' unoptimized/>
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <ul className="mt-2">
                                            {/* {signupFormSchema.shape.password._def.schema.map((check: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className={`${
                                                        signupForm.formState.errors.password && signupForm.formState.errors.password.message?.includes(check.message)
                                                            ? 'text-red-500'
                                                            : signupForm.formState.isSubmitted && !signupForm.formState.errors.password
                                                            ? 'text-green-500'
                                                            : 'text-gray-500'
                                                    }`}
                                                >
                                                    {check.message}
                                                </li>
                                            ))} */}
                                        </ul>
                                        {/* <FormMessage className={'text-red-500 text-sm'}>{signupForm.formState.isValid && signupForm.formState.errors.password?.message}</FormMessage> */}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="date_of_birth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='required'>Date of birth</FormLabel>
                                        <FormControl>
                                            <Input type='date' placeholder="Enter date of birth" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-500 text-sm'>{!signupForm.formState.isValid && signupForm.formState.errors.date_of_birth?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-center w-full'>
                                <Button
                                    variant='default'
                                    className={`my-4 w-4/5 ${!signupForm.formState.isValid ? 'cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 cursor-pointer'}`}
                                    disabled={!signupForm.formState.isValid || signupForm.formState.isSubmitting}
                                >
                                    Signup
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        )
    };

    return (
        <div className="relative flex overflow-hidden mt-16 w-4/5 h-fit rounded-md border">
            {getLoginSection()}
            {getSignupSection()}
            <div
                className={`hidden md:block absolute top-0 right-0 overflow-hidden w-1/2 h-full z-50 bg-green-500 transition-transform duration-700 transform ${
                    section === 'login' ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className='flex flex-col items-center justify-center h-fit overflow-clip p-6'>
                    <h1 className='text-white text-3xl font-normal'>Welcome Back!</h1>
                    <h3 className='text-white text-lg font-extralight'>Login to SeshHouse</h3>
                    <Image
                        id='app-logo-login'
                        src={'/images/seshhouse-logo.jpg'}
                        height={90}
                        width={90}
                        style={{ userSelect: 'none' }}
                        alt='app logo'
                        className='priority rounded-md mt-4'
                        priority
                    />
                    <div className='flex flex-col mt-6 w-4/5'>
                        <Link href={ROUTE_PATHS.EVENTS.INDEX} className='m-1 text-white hover:text-gray-200 hover:underline-offset-2'>
                            Get your tickets to the next event
                        </Link>
                        <Link href={ROUTE_PATHS.CAFE_ITEM.INDEX} className='m-1 text-white hover:text-gray-200 hover:underline-offset-2'>
                            Order your daily coffee from our Cafè
                        </Link>
                        <Link href={ROUTE_PATHS.HOME} className='m-1 text-white hover:text-gray-200 hover:underline-offset-2'>
                            And so much more!
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={`hidden md:block absolute top-0 left-0 overflow-hidden w-1/2 h-full z-50 bg-green-500 transition-transform duration-700 transform ${
                    section === 'signup' ? '-translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className='flex flex-col items-center justify-center h-fit overflow-clip p-6'>
                    <h1 className='text-white text-3xl font-normal'>Welcome to SeshHouse</h1>
                    <h3 className='mb-12 text-white text-lg font-extralight'>Sign up and get tickets to events near you!</h3>
                    <Image
                        id='app-logo-signup'
                        src={'/images/seshhouse-logo.jpg'}
                        height={150}
                        width={150}
                        style={{ userSelect: 'none' }}
                        alt='app logo'
                        className='priority rounded-md'
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default AuthForm