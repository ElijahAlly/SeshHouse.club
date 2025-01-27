"use client"

import { FunctionComponent, useEffect, useRef, useState } from "react";

interface VectaryModelProps {
    pos: 0 | 1;
    index: 0 | 1;
}

const VectaryModel: FunctionComponent<VectaryModelProps> = ({ index, pos }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const MODEL_SCENE_ID = '5NrXRkHXwN604YRIThj8Zl';
    const MODEL_URL = `https://app.vectary.com/p/${MODEL_SCENE_ID}`;
    const [opacity, setOpacity] = useState<0 | 1>(0);
    const [topLvlOpacity, setTopLvlOpacity] = useState<0 | 1>(0);

    const startOpacityIncrease = () => {
        setTimeout(() => {
            setOpacity(1);
        }, 3000);
    };

    useEffect(() => {
        if (iframeRef.current) {
            startOpacityIncrease();
        }
    }, [iframeRef.current]);

    useEffect(() => {
        setTopLvlOpacity(index === pos ? 1 : 0);
    }, [pos]);

    return (
        <div
            className={`relative flex items-center justify-center h-fit transition-opacity duration-700 ease-in-out ${pos === 0 ? 'px-6 w-full' : 'mx-6 w-[90%] bg-black rounded-md'}`}
            style={{
                opacity: `${topLvlOpacity}`,
            }}
        >
            {/* Transparent overlay to prevent interactions except on floating UI */}
            <div 
                className="absolute inset-0 z-10 left-72"
                style={{
                    cursor: 'default',
                    // This creates holes in the overlay where vctr-ui elements are
                    pointerEvents: 'auto'
                }}
                onMouseDown={(e) => e.preventDefault()}
                onMouseMove={(e) => e.preventDefault()}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
            />
            <iframe
                ref={iframeRef}
                id="vectary_model"
                src={`${MODEL_URL}?zoom=0&rotation=0&pan=0&autorotate=0&allowCameraControl=false&enableApi=false&controls=0&orbit=0`} 
                height={index === 0 ? 390 : 420}
                width="100%"
                allow="xr-spatial-tracking; fullscreen;"
                style={{
                    opacity: `${opacity}`,
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1
                }}
                className="transition-opacity duration-700 ease-in-out rounded-md"
            />
        </div>
    );
};

export default VectaryModel;