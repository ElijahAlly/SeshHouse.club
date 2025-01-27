"use client"

import { useEffect, useRef, useState } from "react";

const VectaryModel = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const MODEL_SCENE_ID = '5NrXRkHXwN604YRIThj8Zl';
    const MODEL_URL = `https://app.vectary.com/p/${MODEL_SCENE_ID}`;
    const [width, setWidth] = useState(12);

    const startWidthIncrease = () => {
        setTimeout(() => {
            setWidth(100);
        }, 3000);
    };

    useEffect(() => {
        if (iframeRef.current) {
            startWidthIncrease();
        }
    }, []);

    return (
        <div 
            className="flex items-center justify-center px-6 h-fit" 
            style={{ width: `${width}%` }}
        >
            <iframe 
                ref={iframeRef}
                id="vectary_model"
                src={`${MODEL_URL}`} 
                height={360}
                width="100%"
                allow="xr-spatial-tracking; fullscreen;"
                style={{
                    opacity: width === 100 ? '1' : '0',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                }}
                className="transition-opacity duration-700 ease-in-out"
            />
        </div>
    );
};

export default VectaryModel;