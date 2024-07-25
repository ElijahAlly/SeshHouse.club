'use client'

import AuthForm from '@/components/AuthForm'
import { useSearchParams } from 'next/navigation'

const LoginClientSide: React.FC = () => {
    const params = useSearchParams();

    return (
        <div className='flex justify-center w-screen'>
            <AuthForm page={params.get('signup') ? 'signup' : 'login'}/>
        </div>
    )
}

export default LoginClientSide