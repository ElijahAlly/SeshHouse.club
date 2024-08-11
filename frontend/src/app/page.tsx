import HomeHero from '@/components/HomeHero';
import { Card, CardContent } from '@/components/ui/card';
import UpcomingEvents from '@/components/UpcomingEvents';
import React from 'react';

const AppPage: React.FC = async () => {
  return (
    <div className='w-full h-fit py-3'>
      <HomeHero />
      <Card className="max-w-sm m-6">
        <CardContent className='hover:shadow-lg'>
          <h4 className="text-2xl font-semibold my-2">SeshHouse</h4>
          <address className="not-italic text-gray-600">
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
      <UpcomingEvents />
    </div>
  )
}

export default AppPage;