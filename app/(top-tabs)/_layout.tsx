import React, { Dispatch, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createMaterialTopTabs, TabBar } from '~/components/custom/tab-bar';
import { ChevronLeft, EllipsisVertical, UserRound } from '~/components/icons';
import { router, Stack } from 'expo-router';
import { Pressable, View, Text, TouchableOpacity, Modal } from 'react-native';
import { cn } from '~/lib';
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
  visible?: boolean;
  setVisible?: Dispatch<React.SetStateAction<boolean>>;
}

const headerRight = ({ status, id, changeStatus, visible, setVisible }: HeaderRightProps) => {
  return (
    <View className="flex flex-row items-center justify-center gap-x-2">
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
      <Pressable
        onPress={() => setVisible?.((prev) => !prev)}
        className="h-8 w-8 items-center justify-center rounded-full bg-gray-500">
        <EllipsisVertical className="text-white" size={18} />
      </Pressable>
      <Modal
        transparent={true}
        visible={visible}
        animationType="none"
        onRequestClose={() => setVisible?.((prev) => !prev)}>
        <Pressable
          className="mt-16 flex-1 bg-transparent bg-opacity-50"
          onPress={() => setVisible?.((prev) => !prev)}>
          <View className="absolute right-4 top-12 w-56 rounded-md bg-white shadow-lg">
            <TouchableOpacity
              onPress={() => {
                changeStatus(id);
                setVisible?.((prev) => !prev);
                console.log('status changed');
              }}
              className="items-start bg-white px-4 py-3">
              <Text className="text-lg text-black">
                {status === 'active' ? 'Dosya Kapat' : 'Dosya Aç'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default () => {
  const pageType = useSearchParams().get('pageType');
  const id = useSearchParams().get('id');
  const document = useDocumentStore((state) => state.getDocumentById(Number(id)));
  const changeStatus = useDocumentStore((state) => state.changeStatus);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
                    visible: isDropdownVisible,
                    setVisible: setDropdownVisible,
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
