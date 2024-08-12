import { FunctionComponent } from "react";
import dynamic from "next/dynamic";

const YourInfoClientSide = dynamic(() => import('./YourInfoClientSide'), { ssr: false })

interface YourInfoProps {
}

const YourInfo: FunctionComponent<YourInfoProps> = () => {
    return (
        <div className="w-full h-fit flex flex-col items-center mt-20 md:mt-24 overflow-hidden">
            <YourInfoClientSide />
        </div>
    );
}

export default YourInfo;