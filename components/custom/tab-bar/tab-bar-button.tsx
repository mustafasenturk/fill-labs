import type { FC } from 'react';
import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Search, UserRound } from '~/components/icons';

import type { Routes } from './tab-bar';
import { cn } from '~/lib';
import { MOBILE_THEME } from '~/constants/theme';

export interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  routeName: Routes;
  isFocused: boolean;
  label: string;
}

export const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: TabBarButtonProps) => {
  const icon: Record<Routes, FC<{ color: string }>> = {
    index: ({ color }) => <Search color={color} size={24} />,
    two: ({ color }) => <UserRound color={color} size={24} />,
  };

  const scale = useSharedValue(0);
  const backgroundColor = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : 0, {
      duration: 350,
    });
    backgroundColor.value = withSpring(isFocused ? 1 : 0, {
      duration: 350,
    });
  }, [isFocused, scale, backgroundColor]);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const backgroundColorValue = interpolateColor(
      backgroundColor.value,
      [0, 1],
      ['transparent', MOBILE_THEME.background]
    );

    return { transform: [{ scale: scaleValue }], backgroundColor: backgroundColorValue };
  });

  return (
    <Pressable
      accessibilityLabel={routeName}
      accessibilityLabelledBy={`tab-bar-${routeName}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      className={cn('flex-1 items-center justify-center rounded-full')}
      onLongPress={onLongPress}
      onPress={onPress}>
      <Animated.View
        className="mb-1 h-10 w-20 items-center justify-center rounded-full"
        style={[animatedStyle]}>
        {icon[routeName]({ color: isFocused ? 'black' : MOBILE_THEME.background })}
      </Animated.View>
      <Text
        className={cn(
          'text-base font-medium tracking-wide',
          isFocused ? 'text-black' : 'text-gray-400'
        )}>
        {label}
      </Text>
    </Pressable>
  );
};
