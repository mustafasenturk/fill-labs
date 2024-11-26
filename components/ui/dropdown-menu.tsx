/* eslint-disable prettier/prettier */
import React, { cloneElement, createContext, useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { cn } from '~/lib';

interface DropDownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDownContext = createContext<DropDownContextType | undefined>(undefined);

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <DropDownContext.Provider value={{ open, setOpen }}>
      <View className="relative">{children}</View>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children }: any) => {
  const { setOpen } = useDropdown();
  return cloneElement(children, {
    onPress: () => setOpen((prev) => !prev),
  });
};

type DropDownContentTypes = {
  className?: string;
  children: React.ReactNode;
};

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown();
  return (
    <>
      {open && (
        <View
          className={cn(
            'elevation-xl absolute right-0 top-10 z-50 w-56 rounded-md bg-white shadow-lg',
            className
          )}>
          {children}
        </View>
      )}
    </>
  );
};

type DropDownLabelProps = {
  labelTitle: string;
};

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return <Text className="text-primary text-xl font-semibold">{labelTitle}</Text>;
};

type DropDownItemProps = {
  children: React.ReactNode;
  className?: string;
};

const DropDownItem = ({ children, className }: DropDownItemProps) => {
  const { setOpen } = useDropdown();

  const handlePress = () => {
    setOpen(false);
  };

  return (
    <View className={cn('elevation-xl z-50 w-full', className)} onTouchEnd={handlePress}>
      {children}
    </View>
  );
};

const DropDownItemSeparator = () => {
  return <View className="h-[1px] flex-1 bg-black" />;
};
const useDropdown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
export {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItemSeparator,
  DropDownItem,
  useDropdown,
};
