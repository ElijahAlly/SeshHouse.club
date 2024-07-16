'use client'
import React from 'react';

interface PDFPreviewProps {
  src: string;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ src }) => {

    return (
        <div>
            <object 
                type="application/pdf" 
                data={src}
                width="250" 
                height="200"
            >
            </object>
        </div>
    );
};

export default PDFPreview;
