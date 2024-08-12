'use client';

import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";

interface YourInfoClientSideProps {
}

const YourInfoClientSide: FunctionComponent<YourInfoClientSideProps> = () => {
    const router = useRouter();

    return (
        <div className='flex flex-col items-center w-full md:w-4/5 overflow-y-hidden mt-9'>
            <h2 className='text-lg'>Login or Signup to Continue</h2>
            <div className='flex w-4/5 my-6'>
                <Button variant='outline' onClick={() => router.back()}>{'<-'} Back</Button>
            </div>
                <AuthForm showSideCards={false} page="signup" isOnEventCreationPage={true} />
        </div>
    )
}

export default YourInfoClientSide;