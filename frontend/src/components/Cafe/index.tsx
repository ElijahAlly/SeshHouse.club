'use client'

import { useEffect, useState } from 'react';
import { CafeItemType } from '@/types/Cafe';
import CafeItem from '../CafeItem';
import instance from '../../lib/axios';
import Filters from '../Filters';

const Cafe = () => {
    const [cafe, setCafe] = useState<CafeItemType[]>([]);

    useEffect(() => {
        const getCafe = async () => {
            try {
                const res = await instance('GET', '/cafe')
                setCafe(res.data);
            } catch (err) {
                console.error('There was an error fetching the Cafe!', err);
            }
        }

        getCafe();
    }, []);

    return (
        <div className='relative flex flex-col items-center h-full w-full overflow-hidden'>
            <h1 className='h-full sticky top-0 left-0 text-4xl font-light mb-12'>All Events</h1>
            <ul className='h-full w-full flex flex-col md:flex-row overflow-hidden p-2'>
                {/* <Filters type={'cafeitems'} /> */}
                <div className='flex flex-col w-full h-96 md:h-screen pb-72 overflow-y-auto pt-9 px-3'>
                    {cafe.map(cafeitem => (
                        <CafeItem key={cafeitem.id} item={cafeitem}/>
                    ))}
                </div>
            </ul>
        </div>
    );
}

export default Cafe;