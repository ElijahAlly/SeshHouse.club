'use client';

import { FunctionComponent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const VectaryModel = dynamic(() => import("../VectaryModel/index"), {
  ssr: false,
});

interface HomeHeroProps {
    pos: 0 | 1;
    showWavyBorder: boolean;
}
 
const HomeHero: FunctionComponent<HomeHeroProps> = ({ pos, showWavyBorder }) => {
    const router = useRouter();

    return (
        <header className={`w-full bg-gradient-to-r from-black from-10% via-black via-80% to-green-700 to-100% text-white relative ${pos === 0 ? 'flex py-6' : ' pb-28 pt-12'}`}>
            {pos === 0 && <VectaryModel index={0} pos={pos} />}
            <div className="text-center md:text-right pt-12 pr-12">
                <h1 className="text-4xl font-bold mb-4 whitespace-nowrap">Discover and Book Amazing Events</h1>
                <p className="text-lg mb-8 whitespace-nowrap">Find or Host your next event, workshop, or social gathering.</p>
                <Button 
                    variant='outline' 
                    className='select-none' 
                    onClick={() => router.push('/events')}
                >
                    Explore Events <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Button>
            </div>
            {showWavyBorder && <svg
                className="absolute bottom-0 left-0 w-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 87" // Adjusted viewBox height
                >
                <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,80L60,82.7C120,85,240,90,360,85.3C480,80,600,64,720,61.3C840,58,960,69.5,1080,72C1200,74.5,1320,69.5,1380,66.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                ></path>
            </svg>}
        </header>
    );
}
 
export default HomeHero;