import { Tabs } from 'expo-router';
import { Search, UserRound } from '~/components/icons';
import { cn } from '~/lib';
import { Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: { fontSize: 18 },
        tabBarLabelStyle: { fontSize: 10 },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Arama',
          tabBarIcon: ({ color, focused }) => (
            <View className={cn({ 'rounded-full bg-background px-6 py-1': focused })}>
              <Search
                className={cn({ 'text-primary': focused })}
                color={color}
                size={24}
                absoluteStrokeWidth
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className={cn('text-lg', { 'text-black': focused })}>Arama</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profilim',
          tabBarIcon: ({ color, focused }) => (
            <View className={cn({ 'rounded-full bg-background px-6 py-1': focused })}>
              <UserRound
                className={cn({ 'text-primary': focused })}
                color={color}
                size={24}
                absoluteStrokeWidth
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className={cn('text-lg', { 'text-black': focused })}>Profilim</Text>
          ),
        }}
      />
    </Tabs>
  );
}
