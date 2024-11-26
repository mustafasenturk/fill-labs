import React from 'react';
import * as Haptics from 'expo-haptics';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createMaterialTopTabs, TabBar } from '~/components/custom/tab-bar';
import { ChevronLeft, EllipsisVertical, UserRound } from '~/components/icons';
import { router, Stack } from 'expo-router';
import { Pressable, View, Text, TouchableOpacity } from 'react-native';
import { cn } from '~/lib';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownTrigger,
} from '~/components/ui/dropdown-menu';
import { useSearchParams } from 'expo-router/build/hooks';
import { useDocumentStore } from '~/store/documentStore';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = createMaterialTopTabs(Navigator);

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
    <View className="flex-grow-0 flex-row items-center justify-center gap-x-2">
      <View
        className={cn(
          'rounded-full bg-primary p-1 px-4',
          status === 'active'
            ? 'border border-primary bg-primary'
            : 'bg-white-400 border border-green'
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
      <MaterialTopTabs
        screenListeners={{
          tabPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft),
        }}
        tabBar={TabBar}>
        <MaterialTopTabs.Screen
          key="index"
          name="index"
          initialParams={{ pageType, id: Number(id) }}
          options={{
            tabBarIcon: ({ color }: { color: string }) => <UserRound color={color} size={24} />,
          }}
        />
        <MaterialTopTabs.Screen
          key="two"
          name="two"
          initialParams={{ pageType, id: Number(id) }}
          options={{
            tabBarIcon: ({ color }: { color: string }) => <UserRound color={color} size={24} />,
          }}
        />
        <MaterialTopTabs.Screen
          key="three"
          name="three"
          initialParams={{ pageType, id: Number(id) }}
          options={{
            tabBarIcon: ({ color }: { color: string }) => <UserRound color={color} size={24} />,
          }}
        />
      </MaterialTopTabs>
    </>
  );
};
