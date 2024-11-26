import { Stack } from 'expo-router';
import React from 'react';

import { Container } from '~/components/ui/container';
import { ScreenContent } from '~/components/ui/screen-content';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profilim' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Profilim" />
      </Container>
    </>
  );
}
