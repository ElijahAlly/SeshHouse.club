import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const MyProfileClientSide = dynamic(() => import('./MyProfileClientSide'), { ssr: false })

export const metadata: Metadata = {
  title: 'My Profile | SeshHouse',
}

const ProfilePage: React.FC = async () => {
  return <MyProfileClientSide />
}

export default ProfilePage;