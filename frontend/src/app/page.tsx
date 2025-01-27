"use client";

import dynamic from "next/dynamic";
import HomeHero from '@/components/HomeHero';
import { Card, CardContent } from '@/components/ui/card';
import UpcomingEvents from '@/components/UpcomingEvents';
import { DrawingPinFilledIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const VectaryModel = dynamic(() => import("../components/VectaryModel/index"), {
  ssr: false, // Ensure this component renders only on the client
});

const AppPage: React.FC = () => {
  const [pos, setPos] = useState<0 | 1>(0);
  const [showWavyBorder, setShowWavyBorder] = useState<boolean>(false);

  const togglePos = () => {
    setPos((prev) => (prev === 0 ? 1 : 0));
  }

  const toggleWavyBorder = () => {
    setShowWavyBorder((prev) => !prev);
  }

  return (
    <div className='w-full h-fit py-3'>
      <HomeHero pos={pos} showWavyBorder={showWavyBorder} />
      <div className="flex ml-3 mt-3">
        <Button onClick={togglePos} className="mr-3" variant={'outline'}>Toggle 3D Model Postion</Button>
        <Button onClick={toggleWavyBorder} variant={'outline'}>{showWavyBorder ? 'Hide' : 'Show'} Wavy Border</Button>
      </div>
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
      {pos === 1 && <VectaryModel index={1} pos={pos} />}
      <UpcomingEvents />
    </div>
  )
}

export default AppPage;