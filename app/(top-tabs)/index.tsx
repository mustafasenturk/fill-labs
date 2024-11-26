import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import * as Haptics from 'expo-haptics';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { documentSchema } from '~/validators';
import { Form, FormField, FormInput } from '~/components/ui/form';
import { useDocumentStore } from '~/store/documentStore';
import { z } from 'zod';
import { RouteProp, useRoute } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { ChevronLeft, EllipsisVertical } from '~/components/icons';
import { cn } from '~/lib';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownTrigger,
} from '~/components/ui/dropdown-menu';

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

type MaterialTopTabsParamList = {
  index: { pageType: string; id: number };
  two: undefined;
  three: undefined;
};

export default () => {
  const scrollRef = useRef<ScrollView>(null);
  const addDocument = useDocumentStore((state) => state.addDocument);
  const updateDocument = useDocumentStore((state) => state.updateDocument);
  const [type, setType] = React.useState<'X' | 'Y'>('X');
  const route = useRoute<RouteProp<MaterialTopTabsParamList, 'index'>>();
  const pageType = route.params.pageType;
  const id = route.params.id;
  const document = useDocumentStore((state) => state.getDocumentById(Number(id)));
  const changeStatus = useDocumentStore((state) => state.changeStatus);

  useEffect(() => {
    if (document) {
      setType(document.documentType ?? 'X');
    }
  }, [document]);

  const form = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      mendatory: document?.mendatory ?? '',
      text: document?.text ?? '',
      numeric: document?.numeric ?? undefined,
    },
  });

  const onSubmit = React.useCallback(
    (values: z.infer<typeof documentSchema>) => {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      if (pageType === 'add') {
        addDocument({
          id: Date.now(),
          mendatory: values.mendatory,
          text: values.text,
          numeric: values.numeric,
          status: 'active',
          date: new Date().toISOString(),
          documentType: type,
        });
        router.back();
      } else {
        updateDocument({
          id: document!.id,
          mendatory: values.mendatory,
          text: values.text,
          numeric: values.numeric,
          status: 'active',
          date: new Date().toISOString(),
          documentType: type,
        });
        router.back();
      }
    },
    [addDocument, type]
  );

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
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerClassName="p-6 mx-auto w-full max-w-xl"
        contentInset={{ top: 8 }}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        <Form {...form}>
          <View className="gap-3 rounded-md bg-white p-4">
            <FormField
              control={form.control}
              name="mendatory"
              render={({ field }) => (
                <FormInput
                  className="border-primary bg-white"
                  autoCapitalize="none"
                  description={'Mendatory Input Description'}
                  label={'Mendatory Input'}
                  maxLength={24}
                  placeholder={'Mendatory Input Placeholder'}
                  {...field}
                  value={field.value ?? ''}
                  onChangeText={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormInput
                  className="border-primary bg-white"
                  autoCapitalize="none"
                  description={'Text Input 1 Description'}
                  label={'Text Input 1'}
                  maxLength={24}
                  placeholder={'Text Input 1 Placeholder'}
                  {...field}
                  value={field.value ?? ''}
                  onChangeText={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="numeric"
              render={({ field }) => (
                <FormInput
                  className="border-primary bg-white"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  description={'Numeric Input 1 Description'}
                  label={'Numeric Input 1'}
                  maxLength={24}
                  placeholder={'Numeric Input 1 Placeholder'}
                  {...field}
                  value={field.value ? String(field.value) : ''}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Text className="text-lg font-normal text-gray-700">Dosya Türü</Text>
            <View className="flex flex-row gap-2">
              <Pressable
                className={`flex-1 items-center justify-center rounded-full py-2 ${
                  type === 'X' ? 'bg-background' : 'bg-secondary'
                }`}
                onPress={() => setType('X')}>
                <Text className="text-lg font-normal text-gray-700">X</Text>
              </Pressable>
              <Pressable
                className={`flex-1 items-center justify-center rounded-full py-2 ${
                  type === 'Y' ? 'bg-background' : 'bg-secondary'
                }`}
                onPress={() => setType('Y')}>
                <Text className="text-lg font-normal text-gray-700">Y</Text>
              </Pressable>
            </View>
            <Pressable
              className="mt-2 flex-1 items-center justify-center rounded-full bg-primary py-2"
              onPress={form.handleSubmit(onSubmit)}>
              <Text className="text-lg font-semibold text-white">
                {pageType === 'edit' ? 'Güncelle' : 'Ekle'}
              </Text>
            </Pressable>
          </View>
        </Form>
      </ScrollView>
    </>
  );
};
