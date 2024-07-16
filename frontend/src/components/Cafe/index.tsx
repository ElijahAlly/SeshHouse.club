'use client'

import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import { CafeItemType } from '@/types/Cafe';

const Cafe = () => {
    const [cafe, setCafe] = useState<CafeItemType[]>([]);

    useEffect(() => {
        const getCafe = async () => {
            try {
                const res = await axios.get('/cafe')
                // console.log('Cafe res', res);
                setCafe(res.data);
            } catch (err) {
                console.error('There was an error fetching the Cafe!', err);
            }
        }

        getCafe();
    }, []);

    console.log('Cafe on CafePage', cafe);

    return (
        <div className='relative flex flex-col items-center h-full w-full overflow-y-auto'>
            <h1 className='sticky top-0 text-3xl font-semibold'>All Cafe Items</h1>
            <ul className='w-full'>
                {cafe.map(event => (
                    <CafeItem key={cafe.id} item={cafe}/>
                ))}
            </ul>
        </div>
    );
}

export default Cafe;