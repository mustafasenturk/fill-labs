import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import { useHaptic } from '~/hooks';
import { TabBarButton } from './tab-bar-button';

export type Routes = 'index' | 'two';

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const impact = useHaptic();

  return (
    <View className="shadow-primary flex-row items-center justify-between bg-white px-4 py-4 shadow">
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
            label={routeName === 'index' ? 'Arama' : routeName === 'two' ? 'Profilim' : ''}
          />
        );
      })}
    </View>
  );
}
