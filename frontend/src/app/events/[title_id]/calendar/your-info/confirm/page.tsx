import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { getSessionFromCookies } from "@/lib/crypt";

const ConfirmClientSide = dynamic(() => import('./ConfirmClientSide'), { ssr: false })

interface ConfirmProps {
}

const Confirm: FunctionComponent<ConfirmProps> = async () => {
    const user = await getSessionFromCookies();

    return (
        <div className="w-full h-fit flex flex-col items-center mt-20 md:mt-24 overflow-hidden">
            <ConfirmClientSide user={user} />
        </div>
    );
}

export default Confirm;