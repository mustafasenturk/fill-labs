import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { cn } from '~/lib';

export interface TabBarButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  routeName: string;
  isFocused: boolean;
  label: string;
}

export const TabBarButton = ({ onPress, onLongPress, isFocused, label }: TabBarButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: scale.value }],
    };
  });

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      className={cn('flex-1 items-center justify-center')}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View className="items-center">
        <Text
          className={cn(
            'text-lg font-medium tracking-wide',
            isFocused ? 'text-primary' : 'text-gray-400'
          )}>
          {label}
        </Text>
        <Animated.View
          className="mt-1 h-0.5 w-24 rounded-full bg-primary"
          style={[animatedStyle, { opacity: isFocused ? 1 : 0 }]}
        />
      </View>
    </Pressable>
  );
};
