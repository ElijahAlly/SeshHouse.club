import Cafe from '@/components/Cafe';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cafe | SeshHouse',
}

const CafePage: React.FC = async () => {
  return (
    <div className='w-full p-12 pt-24'>
      <Cafe />
    </div>
  )
}

export default CafePage;