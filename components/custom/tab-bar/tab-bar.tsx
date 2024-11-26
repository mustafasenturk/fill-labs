import type {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { View } from 'react-native';
import { withLayoutContext } from 'expo-router';

import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useHaptic } from '~/hooks';
import { TabBarButton } from './tab-bar-button';

export type Routes = 'index' | 'two' | 'three';

export const createMaterialTopTabs = (
  Navigator: ReturnType<typeof createMaterialTopTabNavigator>['Navigator']
) =>
  withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(Navigator);

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const impact = useHaptic();

  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-4 shadow shadow-primary">
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeName = route.name as Routes;

        const onPress = () => {
          impact();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(routeName, route.params);
          }
        };

        const onLongPress = () => {
          impact();
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <TabBarButton
            isFocused={isFocused}
            key={route.key}
            routeName={routeName}
            onLongPress={onLongPress}
            onPress={onPress}
            label={routeName === 'index' ? 'Bilgiler' : routeName === 'two' ? 'Tab B' : 'Tab C'}
          />
        );
      })}
    </View>
  );
}
