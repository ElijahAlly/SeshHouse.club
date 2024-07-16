import { DocumentType } from '@/types/Document';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

interface DocumentProps {
  document: DocumentType;
}

const Document: React.FC<DocumentProps> = ({ document }) => {
  if (!document) return;
  const isPdf = document.file_url.endsWith('.pdf');

  return (
    <li>
      {isPdf ? (
        // TODO: PdfPreview not working
        // <PDFPreview src={document.file_url} />
        <Link href={document.file_url} referrerPolicy='no-referrer' target='_blank' passHref>
          <Button variant='outline'>
            View {document.filename}
          </Button>
        </Link>
      ) : (
        <Image 
          src={document.file_url} 
          alt={document.filename} 
          height={90} 
          className='max-h-[420px] w-fit'
        />
      )}
    </li>
  )
};

export default Document;
