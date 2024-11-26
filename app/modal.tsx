import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform } from 'react-native';

import { ScreenContent } from '~/components/ui/screen-content';

export default function Modal() {
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal"></ScreenContent>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
