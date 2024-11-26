import type {
  MaterialTopTabBarProps,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { router, Stack, withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Haptics from 'expo-haptics';

import { Text } from '~/components/ui/text';
import { cn } from '~/lib';
import { ChevronLeft, EllipsisVertical } from '~/components/icons';
import { useSearchParams } from 'expo-router/build/hooks';
import { useDocumentStore } from '~/store/documentStore';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownTrigger,
} from '~/components/ui/dropdown-menu';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

interface HeaderLeftProps {
  isEdit: boolean;
  text: string;
  numeric: number;
  mendatory: string;
}

const headerLeft = ({ isEdit, text, numeric, mendatory }: HeaderLeftProps): JSX.Element => {
  return (
    <Pressable
      className="flex flex-row items-center gap-x-2 bg-transparent"
      onPress={() => {
        router.back();
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}>
      <ChevronLeft className="text-black" size={28} />
      <View>
        <Text className="text-lg font-medium text-black">{mendatory}</Text>
        {isEdit && (
          <View className="flex flex-row items-center gap-x-1">
            <Text className="text-sm font-semibold text-gray-600">{text}</Text>
            <Text className="text-sm font-semibold text-gray-600">-</Text>
            <Text className="text-sm font-medium text-gray-400">{numeric}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

interface HeaderRightProps {
  status: 'active' | 'inactive';
  id: number;
  changeStatus: (id: number) => void;
}

const headerRight = ({ status, id, changeStatus }: HeaderRightProps) => {
  return (
    <View className="elevation-xl flex-grow-0 flex-row items-center justify-center gap-x-2">
      <View
        className={cn(
          'bg-primary rounded-full p-1 px-4',
          status === 'active'
            ? 'bg-primary border-primary border'
            : 'bg-white-400 border-green border'
        )}>
        <Text
          className={cn(
            'text-base font-semibold',
            status === 'active' ? 'text-white' : 'text-green'
          )}>
          {status === 'active' ? 'Açık' : 'Kapandı'}
        </Text>
      </View>
      <View className="flex gap-2">
        <DropDown>
          <DropDownTrigger>
            <Pressable className="h-8 w-8 items-center justify-center rounded-full bg-gray-500">
              <EllipsisVertical className="text-white" size={18} />
            </Pressable>
          </DropDownTrigger>
          <DropDownContent>
            <DropDownItem>
              <TouchableOpacity
                onPress={() => {
                  changeStatus(id);
                }}
                className="flex items-start bg-white px-2 py-3">
                <Text className="text-lg text-black">
                  {status === 'active' ? 'Dosya Kapat' : 'Dosya Aç'}
                </Text>
              </TouchableOpacity>
            </DropDownItem>
          </DropDownContent>
        </DropDown>
      </View>
    </View>
  );
};

export default () => {
  const pageType = useSearchParams().get('pageType');
  const id = useSearchParams().get('id');
  const document = useDocumentStore((state) => state.getDocumentById(Number(id)));
  const changeStatus = useDocumentStore((state) => state.changeStatus);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () =>
            headerLeft({
              isEdit: pageType === 'edit',
              text: document?.text ?? '',
              numeric: document?.numeric ?? 0,
              mendatory: document?.mendatory ?? 'Dosya Bilgileri',
            }),
          headerTitle: '',
          headerRight:
            pageType === 'edit'
              ? () =>
                  headerRight({
                    status: document?.status ?? 'inactive',
                    changeStatus: changeStatus,
                    id: Number(id),
                  })
              : undefined,
          headerShadowVisible: false,
        }}
      />
      <MaterialTopTabs tabBar={CustomTabBar}>
        <MaterialTopTabs.Screen
          key="index"
          name="index"
          options={{ title: 'Bilgiler' }}
          initialParams={{ pageType, id }}
        />
        <MaterialTopTabs.Screen key="two" name="two" options={{ title: 'Tab B' }} />
        <MaterialTopTabs.Screen key="three" name="three" options={{ title: 'Tab C' }} />
      </MaterialTopTabs>
    </>
  );
};

const CustomTabBar: FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View className="flex-row rounded-md bg-white">
      {state.routes.map((route, index) => {
        const descriptor = descriptors[route.key];
        if (!descriptor) return null;
        const { options } = descriptor;
        const label = options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            className={cn('flex-1 items-center justify-center rounded-md px-4 pt-4', {
              'bg-white': isFocused,
            })}
            key={route.key}
            onPress={onPress}>
            <Text
              className={cn('text-xl font-medium', isFocused ? 'text-primary' : 'text-gray-500')}>
              {label}
            </Text>
            {isFocused ? (
              <View className="bg-primary mt-1 h-0.5 w-full rounded-full" />
            ) : (
              <View className="mt-1 h-0.5 w-full rounded-full bg-white" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
