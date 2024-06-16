'use client'

import { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import { Container, Title, List, useMantineTheme, Flex } from '@mantine/core';
import { EventType } from '@/types/Event';
import EventItem from '../EventItem';

const Events = () => {
    const { colors } = useMantineTheme();
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get('/events')
                console.log('events res', res);
                setEvents(res.data);
            } catch (err) {
                console.error('There was an error fetching the events!', err);
            }
        }

        getEvents();
    }, []);

    return (
        <Container bg={colors.dark[0]} h='100vh' w={'100vw'}>
            <Flex direction={'column'} align={'center'}>
                <Title c={colors.violet[6]}>All Events</Title>
                <List>
                    {events.map(event => (
                        <EventItem key={event.id} event={event}/>
                    ))}
                </List>
            </Flex>
        </Container>
    );
}

export default Events;
