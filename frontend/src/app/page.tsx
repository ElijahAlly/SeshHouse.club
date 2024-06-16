import Events from '@/components/Events';
import { Stack } from '@mantine/core'
import React from 'react';

const AppPage: React.FC = async () => {
  return (
    <Stack>
      <Events />
    </Stack>
  )
}

export default AppPage;