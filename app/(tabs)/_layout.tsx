import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';

import { TabBar } from '~/components/custom/tab-bar/tab-bar';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="two" />
    </Tabs>
  );
}
