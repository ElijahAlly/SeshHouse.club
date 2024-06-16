import { DocumentType } from '@/types/Document';
import { Image } from '@mantine/core';
import React from 'react';

interface DocumentProps {
  document: DocumentType;
}

const Document: React.FC<DocumentProps> = ({ document }) => {
  console.log('document', document);

  return (
    <li>
      {/* <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
        {document.filename}
        </a> */}
      <Image src={document.file_url} alt={document.filename} h={'100%'} mah={420} w={'fit-content'}/>
    </li>
  )
};

export default Document;
