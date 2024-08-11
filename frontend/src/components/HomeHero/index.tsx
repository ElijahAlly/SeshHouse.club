'use client';

import { FunctionComponent } from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface HomeHeroProps {
}
 
const HomeHero: FunctionComponent<HomeHeroProps> = () => {
    const router = useRouter();

    return (
        <header className="bg-gradient-to-r from-green-500 to-black text-white pb-28 pt-24 relative">
            <div className="container mx-auto text-center md:text-right px-9">
                <h1 className="text-4xl font-bold mb-4">Discover and Book Amazing Events</h1>
                <p className="text-lg mb-8">Find or Host your next event, workshop, or social gathering.</p>
                <Button variant='outline' size="lg" onClick={() => router.push('/events')}>
                    Explore Events <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
            </div>
            <svg
                className="absolute bottom-0 left-0 w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 190"
            >
                <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,160L60,165.3C120,171,240,181,360,170.7C480,160,600,128,720,122.7C840,117,960,139,1080,144C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ></path>
            </svg>
        </header>
    );
}
 
export default HomeHero;