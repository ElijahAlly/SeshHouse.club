'use client'

// import useForm from '@/hooks/useForm';
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

const specialCharacters = '!@#$%&-_+=.'
const numbers = '0123456789'
 
const today = new Date();

const loginFormSchema = z.object({
    username_or_email: z.string(),
    password: z.string(),
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
    password: z.string()
    .min(8, {
        message: "Password must be at least 8 characters.",
    })
    .refine((password) => password.includes(' '), { 
        message: 'Password cannot include a space'
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
    const [section, setSection] = useState<'login' | 'signup'>(page ? page : 'login');
    const boxHeight = 60;
    const boxWidth = 60; // should be an even number
    const halfBoxWidth = boxWidth / 2;

    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            date_of_birth: ''
            // phoneNumber: ''
        },
    })

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username_or_email: '',
            password: '',
        },
    })

    const handleSubmit = async (values: z.infer<typeof signupFormSchema>) => {
        try {
            console.log(values)
            // const signUpRes = await instance.post('/users/signup', signupForm);
            // await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ user: signUpRes.data.user, jwt: signUpRes.data.jwt }),
            // })
            // window.location.replace(ROUTE_PATHS.MY_PROFILE.INDEX);
        } catch (err: any) {
            console.error(err)
        }
    };

    const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
        try {
            console.log(values)
            // const loginRes = await instance.post('/users/login', loginForm);
            // await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ user: loginRes.data.user, jwt: loginRes.data.jwt }),
            // })
            // window.location.replace(ROUTE_PATHS.MY_PROFILE.INDEX);
        } catch (err: any) {
            console.error(err)
        }
    };

    const getLoginSection = () => {
        return (
            <div
                className={`bg-slate-400 min-h-[${boxHeight + 'vh'}] min-w-[${halfBoxWidth + 'vw'}] z-20`}
            >
                <div className='flex flex-col w-4/5 align-middle'>
                    <h2>Login</h2>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                            <FormField
                                control={loginForm.control}
                                name="username_or_email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your username or email.</FormDescription>
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
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your password.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant='default' className='my-12'>Login</Button>
                        </form>
                    </Form>
                    <Button onClick={() => setSection('signup')} variant='link'>or signup</Button>
                </div>
            </div>
        )
    };

    const getSignupSection = () => {
        return (
            <div
                className={`bg-slate-400 min-h-[${boxHeight + 'vh'}] min-w-[${halfBoxWidth + 'vw'}] ml-[${halfBoxWidth + 'vw'}] z-20`}
            >
                <div className='flex flex-col w-4/5 align-middle'>
                    <h2>Signup</h2>
                    <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(handleSubmit)}>
                            <FormField
                                control={signupForm.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your first name.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your last name.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your username.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter email.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter password.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signupForm.control}
                                name="date_of_birth"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Date of birth</FormLabel>
                                    <FormControl>
                                        <Input type='date' placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter date of birth.</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <Button variant='default' className='my-12'>Signup</Button>
                        </form>
                    </Form>
                    <Button onClick={() => setSection('login')} variant='link'>or login</Button>
                </div>
            </div>
        )
    };

    useEffect(() => {
        const img = document.querySelector("#app-logo");
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
    }, [section, setSection])

    return (
        <div 
            className={`relative overflow-x-hidden mt-16 w-[${boxWidth + 'vw'}]`}
        >
            {section === 'login' ? getLoginSection() : getSignupSection()}
            <div
                className={`absolute top-0 right-0 overflow-x-hidden mt-16 min-w-[${halfBoxWidth + 'vw'}] min-h-[${boxHeight + 'vh'}]`}
                style={{
                    backgroundColor: 'green',
                    transition: 'transform 0.81s ease-in-out', 
                    zIndex: section === 'login' ? '3' : '1',
                    transform: section === 'login' ? 'translateX(0)' : `translateX(-${halfBoxWidth}vw)` // slides out
                    // transform: section === 'login' ? 'translateX(0)' : `translateX(${halfBoxWidth}vw)` // slides in

                }}
            >
                <p>login details here...</p>
            </div>
            <div
                className={`absolute top-0 left-0 overflow-x-hidden mt-16 min-w-[${halfBoxWidth + 'vw'}] min-h-[${boxHeight + 'vh'}]`} 
                style={{
                    backgroundColor: 'green',
                    transition: 'transform 0.81s ease-in-out', 
                    zIndex: section === 'signup' ? '3' : '1',
                    transform: section === 'signup' ? `translateX(-${boxWidth + halfBoxWidth}vw)` : `translateX(-${boxWidth}vw)` // slides out
                    // transform: section === 'signup' ? `translateX(-${boxWidth + halfBoxWidth}vw)` : `translateX(-${boxWidth * 2}vw)` // slides in
                }}
            >
                <div className='flex flex-col align-middle justify-start h-full pt-20 px-24'>
                    <h1>Welcome to SeshHouse</h1>
                    <h3 className='mb-20'>Sign up and get tickets to events near you!</h3>
                    <Image

                        id='app-logo'
                        src={'/images/seshhouse-logo.jpg'}
                        height={60}
                        width={60}
                        style={{ userSelect: 'none' }}
                        alt='app logo'
                        className='priority'
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthForm