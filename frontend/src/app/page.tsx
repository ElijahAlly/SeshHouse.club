import dynamic from "next/dynamic";
import HomeHero from '@/components/HomeHero';
import { Card, CardContent } from '@/components/ui/card';
import UpcomingEvents from '@/components/UpcomingEvents';
import { DrawingPinFilledIcon, DrawingPinIcon } from '@radix-ui/react-icons';
import React from 'react';

const VectaryModel = dynamic(() => import("../components/VectaryModel/index"), {
  ssr: false, // Ensure this component renders only on the client
});

const AppPage: React.FC = async () => {
  return (
    <div className='w-full h-fit py-3'>
      <HomeHero />
      <h4 className="flex items-center text-2xl font-semibold mt-12 mb-2 mx-6">Find SeshHouse <DrawingPinFilledIcon className="w-5 h-5 mt-1 mx-1" /></h4>
      <Card className="max-w-sm m-6">
        <CardContent className='hover:shadow-lg'>
          <address className="not-italic text-gray-600 mt-6">
            <p className="mb-1">159 Midland Ave</p>
            <p className="mb-1">Kearny, NJ 07032</p>
            <p className="mb-1">United States</p>
          </address>
          <a href="tel:+1234567890" className="text-blue-500 hover:underline block mt-4">
            +1 (234) 567-890
          </a>
          <a href="mailto:info@example.com" className="text-blue-500 hover:underline block">
            support@seshhouse.club
          </a>
        </CardContent>
      </Card>
      <VectaryModel />
      <UpcomingEvents />
    </div>
  )
}

export default AppPage;