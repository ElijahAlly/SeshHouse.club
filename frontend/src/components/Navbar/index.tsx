import { FunctionComponent } from "react";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import Image from "next/image";
import { ToggleTheme } from "../ui/toggle-theme";
import UserMenu from "../UserMenu";
import { UserType } from "@/types/User";
import Link from "next/link";
import { ROUTE_PATHS } from "@/util/routes";
import { usePathname } from "next/navigation";

interface NavbarProps {
    user: UserType | null
}

const Navbar: FunctionComponent<NavbarProps> = ({ user }) => {
    const pathname = usePathname();

    return ( 
        <NavigationMenu className="sticky top-0 flex justify-between p-4 border-b-2 border-green-600">
            <Link href={ROUTE_PATHS.HOME} passHref>
                <Image
                    src="/images/seshhouse-logo.jpg"
                    height={42}
                    width={42}
                    className="cursor-pointer priority rounded-md"
                    alt="SeshHouse app logo"
                    priority
                />
            </Link>
            <NavigationMenuList className="flex items-center ml-4 space-x-4">
                {/* <NavigationMenuItem className="relative group">
                    <NavigationMenuTrigger className="hover:text-teal-500 transition-colors">Events</NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute hidden group-hover:block bg-white shadow-lg">
                    <NavigationMenuLink href="/events" className="block px-4 py-2 hover:bg-teal-100">Events</NavigationMenuLink>
                    <NavigationMenuLink href="#" className="block px-4 py-2 hover:bg-teal-100">Link</NavigationMenuLink>
                    </NavigationMenuContent>
                    </NavigationMenuItem> */}
                <NavigationMenuLink 
                    href={ROUTE_PATHS.HOME} 
                    className={`block px-4 py-2 hover:bg-teal-100 ${pathname === ROUTE_PATHS.HOME ? 'text-green-600' : ''}`}
                >Home</NavigationMenuLink>
                <NavigationMenuLink 
                    href={ROUTE_PATHS.EVENTS.INDEX} 
                    className={`block px-4 py-2 hover:bg-teal-100 ${pathname.includes(ROUTE_PATHS.EVENTS.INDEX) ? 'text-green-600' : ''}`}
                >Events</NavigationMenuLink>
                <ToggleTheme />
                <UserMenu user={user} />
            </NavigationMenuList>
        </NavigationMenu>
    );
}
 
export default Navbar;