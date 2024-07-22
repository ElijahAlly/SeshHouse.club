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
            onClick={() => {
                setMounted(false);
                setTimeout(() => setMounted(true), 0);
            }}
        >
            <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-green-300 hover:text-black p-2 rounded-sm cursor-pointer">
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-green-300 hover:text-black p-2 rounded-sm cursor-pointer">
                Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-green-300 hover:text-black p-2 rounded-sm cursor-pointer">
                System
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}
 
export default DropdownContent;