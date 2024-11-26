import '../global.css';
import { PermissionStatus as Status, useTrackingPermissions } from 'expo-tracking-transparency';
import * as Notification from 'expo-notifications';

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
Notification.setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

if (Platform.OS === 'android') {
  Notification.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notification.AndroidImportance.MAX,
    enableVibrate: true,
  }).catch(console.error);
}

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [permission, requestPermission] = useTrackingPermissions();
  useEffect(() => {
    const { status } = permission ?? {};
    const hasReq = status === Status.UNDETERMINED || status === Status.DENIED;
    if (hasReq) void requestPermission();
  }, [permission, requestPermission]);

  useEffect(() => {
    const isEnabled = permission?.status === Status.GRANTED;
    if (!isEnabled) return;
    // Settings.setAdvertiserTrackingEnabled(isEnabled).catch(console.error);
    // analytics().setAnalyticsCollectionEnabled(isEnabled).catch(console.error);
  }, [permission?.status]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
