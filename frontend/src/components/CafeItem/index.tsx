import { CafeItemType } from "@/types/Cafe";
import { ROUTE_PATHS } from "@/util/routes";
import Link from "next/link";
import { FunctionComponent } from "react";

interface CafeItemProps {
    item: CafeItemType;
}

const CafeItem: FunctionComponent<CafeItemProps> = ({ item }) => {
    return ( 
        <Link href={encodeURI(ROUTE_PATHS.CAFE_ITEM.SINGlE.replace('{slug}', item.title))} passHref>
            <h3>{item.title}</h3>
        </Link>
    );
}

export default CafeItem;