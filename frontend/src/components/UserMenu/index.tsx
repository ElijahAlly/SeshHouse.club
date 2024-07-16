import { UserType } from "@/types/User";
import LogoutButton from "../LogoutButton";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "../ui/navigation-menu";
import { ROUTE_PATHS } from "@/util/routes";

interface Props {
  user: UserType | null
}

const UserMenu: React.FC<Props> = ({ user }) => {
  // const router = useRouter();
  const isUserloggedIn = !!(user && user.email);

  // const handleProfileIconClick = () => {
  //   if (isUserloggedIn) {
  //     router.push('/my-profile');
  //     return;
  //   }
  //   router.push('/login');
  // }

  return (
    <NavigationMenuItem className="relative group">
      <NavigationMenuTrigger className="hover:text-teal-500 transition-colors">
        <Avatar>
          <AvatarImage height={42} src={user?.profile_picture || ''} />
          <AvatarFallback>
            <Image 
              src={'/images/user-icon-96-white.png'}
              height={42}
              width={42}
              alt="user profile icon/image"
            />
          </AvatarFallback>
        </Avatar>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="fixed top-0 right-2 flex group-hover:flex shadow-lg bg-gray-300 p-2 rounded-sm">
        {isUserloggedIn ? (
          <div className='flex flex-col'>
            <NavigationMenuLink
              className='h-12 w-full'
              href={ROUTE_PATHS.MY_PROFILE.INDEX}
            >My profile</NavigationMenuLink> 
            <LogoutButton />
          </div>
        ) : (
          <div className='flex flex-col'>
            <NavigationMenuLink 
              className='h-12 w-full'
              href={ROUTE_PATHS.LOGIN}
            >login</NavigationMenuLink>
            <NavigationMenuLink
              className='h-12 w-full'
              href={ROUTE_PATHS.SIGNUP}
            >signup</NavigationMenuLink>
          </div>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export default UserMenu