import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";
import Link from "next/link";

interface NavigationBreadcrumbsProps {}

const NavigationBreadcrumbs: FunctionComponent<NavigationBreadcrumbsProps> = () => {
    const pathname = usePathname();
    const paths = decodeURI(pathname).split('/').filter(Boolean); // Split and filter out empty segments

    if (paths.length <= 1) {
        return null;
    }

    return (
        <div className="h-4 flex w-full py-3 px-8 mt-4">
            {paths.map((path, index) => {
            // Construct the href for each breadcrumb link
            const href = '/' + paths.slice(0, index + 1).join('/');
            
            // Determine if this is the last breadcrumb
            const isLast = index === paths.length - 1;

            return (
                <span key={index} className="flex items-center">
                    <Link href={href} className={`mr-2 ${isLast ? 'font-bold' : ''}`} style={{
                        textDecoration: `0.84px solid ${isLast ? 'transparent' : 'gray'} underline`,
                        textUnderlineOffset: '3px'
                    }}>
                        {path}
                    </Link>
                    {!isLast && <span className="mr-2">{'>'}</span>}
                </span>
            );
            })}
        </div>
    );
}

export default NavigationBreadcrumbs;
