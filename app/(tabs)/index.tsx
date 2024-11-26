import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Copy, Plus } from '~/components/icons';
import { Container } from '~/components/ui/container';
import { cn } from '~/lib';
import { Document, useDocumentStore } from '~/store/documentStore';
import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownItemSeparator,
  DropDownTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import { Search, EllipsisVertical } from '~/components/icons';

interface IBlankComponentProps {
  searchText: string | undefined;
  setSearchText: (text: string | undefined) => void;
}

const SearchInput = ({ searchText, setSearchText }: IBlankComponentProps) => {
  return (
    <View className="border-gray flex flex-row items-center rounded-full border bg-white px-4 py-3">
      <Search className="text-gray-500" size={20} />
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={false}
        className="ml-3 flex-1 rounded-full border-transparent bg-transparent text-base font-medium text-gray-800"
        placeholder="Dosya ara"
        placeholderTextColor="#A9A9A9"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text.trim().length > 0 ? text.trim() : undefined);
        }}
        onSubmitEditing={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (event.nativeEvent.text.trim().length === 0) {
            return;
          }
          setSearchText(event.nativeEvent.text);
        }}
      />
    </View>
  );
};

const DocumentItem = (item: Document) => {
  const changeStatus = useDocumentStore((state) => state.changeStatus);

  return (
    <View
      className={cn(
        'flex flex-col justify-between rounded-2xl p-4',
        item.status === 'active'
          ? 'bg-background border-primary border'
          : 'bg-secondary border border-gray-500'
      )}>
      <View className="flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center justify-center gap-x-2">
          <Text className="text-xl font-semibold text-black">{item.mendatory}</Text>
          <Copy className="text-black" size={16} />
          <View
            className={cn(
              'bg-primary rounded-full p-1 px-4',
              item.status === 'active'
                ? 'border-primary bg-primary border'
                : 'bg-white-400 border-green border'
            )}>
            <Text
              className={cn(
                'text-base font-semibold',
                item.status === 'active' ? 'text-white' : 'text-green'
              )}>
              {item.status === 'active' ? 'Açık' : 'Kapandı'}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-center">
          <View className="flex gap-2">
            <DropDown>
              <DropDownTrigger>
                <Pressable className="bg-primary h-8 w-8 items-center justify-center rounded-full">
                  <EllipsisVertical className="text-white" size={18} />
                </Pressable>
              </DropDownTrigger>
              <DropDownContent>
                <DropDownItem>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/(top-tabs)',
                        params: { pageType: 'edit', id: item.id },
                      })
                    }
                    className="flex items-start px-2 py-4">
                    <Text className="text-lg text-black">Dosya Detayına Git</Text>
                  </TouchableOpacity>
                </DropDownItem>
                <DropDownItemSeparator />
                <DropDownItem>
                  <TouchableOpacity
                    onPress={() => changeStatus(item.id)}
                    className="flex items-start px-2 py-3">
                    <Text className="text-lg text-black">
                      {item.status === 'active' ? 'Dosya Kapat' : 'Dosya Aç'}
                    </Text>
                  </TouchableOpacity>
                </DropDownItem>
                <DropDownItemSeparator />
                <DropDownItem>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/(top-tabs)/two',
                        params: { pageType: 'edit', id: item.id },
                      })
                    }
                    className="flex items-start px-2 py-3">
                    <Text className="text-lg text-black">Tab B'ye Git</Text>
                  </TouchableOpacity>
                </DropDownItem>
                <DropDownItemSeparator />
                <DropDownItem>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '/(top-tabs)/three',
                        params: { pageType: 'edit', id: item.id },
                      })
                    }
                    className="flex items-start px-2 py-3">
                    <Text className="text-lg text-black">Tab C'ye Git</Text>
                  </TouchableOpacity>
                </DropDownItem>
              </DropDownContent>
            </DropDown>
          </View>
        </View>
      </View>
      <View className="mt-2 flex flex-row items-center justify-start gap-x-2">
        <Text className="text-sm font-medium text-gray-500">
          {item.numeric ?? 'Numeric Input - 1'}
        </Text>
        <Text className="text-sm font-medium text-gray-500">*</Text>
        <Text className="text-sm font-medium text-gray-500">{item.text ?? 'Text Input - 1'}</Text>
        <Copy className="text-black" size={16} />
      </View>
      <View className="-mx-4 my-4 border border-dashed border-gray-400" />
      <View className="flex flex-row items-center justify-start gap-x-2">
        <Text className="text-lg font-medium text-gray-500">Text Input - 2</Text>
        <Text className="text-lg font-medium text-gray-500">*</Text>
        <Text className="text-lg font-medium text-gray-500">Text Input - 3</Text>
      </View>
      <View className="flex flex-row items-center justify-start gap-x-2">
        <Text className="text-lg font-medium text-gray-500">Numeric Input - 2</Text>
        <Text className="text-lg font-medium text-gray-500">*</Text>
        <Text className="text-lg font-medium text-gray-500">Date Input - 3</Text>
      </View>
    </View>
  );
};

export default function Home() {
  const documents = useDocumentStore((state) => state.documents);
  const [status, setStatus] = useState('all');
  const [searchText, setSearchText] = useState<undefined | string>();

  const searchedDocuments = searchText
    ? documents.filter((item) => item.mendatory.includes(searchText))
    : documents;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Container>
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
        <View className="my-6 flex w-full flex-row items-center justify-between">
          <TouchableOpacity
            className={cn(
              'bg-secondary flex flex-row items-center rounded-full px-10 py-2',
              status === 'all' ? 'bg-background' : 'bg-secondary'
            )}
            onPress={() => setStatus('all')}>
            <Text
              className={cn(
                'text-xl font-normal',
                status === 'all' ? 'text-black' : 'text-gray-500'
              )}>
              Tümü
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn(
              'bg-secondary flex flex-row items-center rounded-full px-10 py-2',
              status === 'active' ? 'bg-background' : 'bg-secondary'
            )}
            onPress={() => setStatus('active')}>
            <Text
              className={cn(
                'text-xl font-normal',
                status === 'active' ? 'text-black' : 'text-gray-500'
              )}>
              Açık
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn(
              'bg-secondary flex flex-row items-center rounded-full px-10 py-2',
              status === 'inactive' ? 'bg-background' : 'bg-secondary'
            )}
            onPress={() => setStatus('inactive')}>
            <Text
              className={cn(
                'text-xl font-normal',
                status === 'closed' ? 'text-black' : 'text-gray-500'
              )}>
              Kapalı
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={
            status === 'all'
              ? searchedDocuments
              : searchedDocuments.filter((item) => item.status === status)
          }
          contentContainerClassName="flex-grow pb-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View className="h-4" />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DocumentItem
              id={item.id}
              mendatory={item.mendatory}
              numeric={item.numeric}
              text={item.text}
              status={item.status}
            />
          )}
        />
        <Pressable
          onPress={() => router.push({ pathname: '/(top-tabs)', params: { pageType: 'add' } })}
          className="bg-primary absolute bottom-6 right-0 flex flex-row items-center gap-x-2 rounded-full px-6 py-4">
          <Plus className="text-white" size={24} />
          <Text className="text-xl font-semibold tracking-wide text-white">Dosya Ekle</Text>
        </Pressable>
      </Container>
    </>
  );
}
