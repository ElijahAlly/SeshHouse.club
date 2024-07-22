'use client'

import AuthForm from '@/components/AuthForm'
import { useSearchParams } from 'next/navigation'

const LoginClientSide: React.FC = () => {
    const params = useSearchParams();

    return (
        <div className='flex justify-center mt-64'>
            <AuthForm page={params.get('signup') ? 'signup' : 'login'}/>
        </div>
    )
}

export default LoginClientSide