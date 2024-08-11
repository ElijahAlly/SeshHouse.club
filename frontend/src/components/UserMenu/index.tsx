import { UserType } from "@/types/User";
import LogoutButton from "../LogoutButton";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ROUTE_PATHS } from "@/util/routes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface Props {
  user: UserType | null;
  pathname: string;
}

const UserMenu: React.FC<Props> = ({ user, pathname }) => {
  const isUserloggedIn = !!(user && user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage height={42} src={user?.profile_picture || ''} 
            className={`cursor-pointer rounded-full mr-8 border-2 border-transparent ${pathname.startsWith('/my-profile') ? ' border-green-500 hover:border-green-500' : 'hover:border-green-500'}`}
          />
          <AvatarFallback>
            <Image 
              src={user?.profile_picture || '/images/user-icon-96-white.png'}
              height={42}
              width={42}
              alt="user profile icon/image"
              className={`cursor-pointer rounded-full border-2 border-transparent ${pathname.startsWith('/my-profile') ? ' border-green-500 hover:border-green-500' : 'hover:border-green-500'}`}
            />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {isUserloggedIn ? (
          <div className='flex flex-col p-1'>
            <DropdownMenuItem
              className={`text-white hover:bg-green-600 rounded-sm cursor-pointer mb-2 ${pathname.startsWith('/my-profile') ? 'bg-green-600' : 'bg-green-500 '}`} 
              onClick={() => !pathname.startsWith('/my-profile') && window.location.replace(ROUTE_PATHS.MY_PROFILE.INDEX)}
            >
              My profile
            </DropdownMenuItem>
            <LogoutButton />
          </div>
        ) : (
          <div className='flex flex-col p-1'>
            <DropdownMenuItem 
              className='hover:bg-green-300 p-2 rounded-sm cursor-pointer' 
              onClick={() => window.location.replace(ROUTE_PATHS.LOGIN)}
            >
              login
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-green-300 p-2 rounded-sm cursor-pointer' onClick={() => window.location.replace(ROUTE_PATHS.SIGNUP)}>
              signup
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu