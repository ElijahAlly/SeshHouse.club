import { FunctionComponent, useEffect, useState } from "react";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

interface DropdownContentProps {
    
}

const DropdownContent: FunctionComponent<DropdownContentProps> = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return ( 
        <DropdownMenuContent
            align='end' 
            className={`${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
            onClick={() => {
                setMounted(false);
                setTimeout(() => setMounted(true), 0);
            }}
        >
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}
 
export default DropdownContent;