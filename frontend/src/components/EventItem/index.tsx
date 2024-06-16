import React from 'react';
import { ListItem as MantineListItem } from '@mantine/core';
import { EventType } from '@/types/Event';
import Document from '../Document';

interface Props {
  event: EventType;
}

const ListItem: React.FC<Props> = ({ event }) => (
  <MantineListItem>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <p>Date: {event.date}</p>
    <ul>
      {event.documents.map(document => (
        <Document key={document.id} document={document} />
      ))}
    </ul>
  </MantineListItem>
);

export default ListItem;
