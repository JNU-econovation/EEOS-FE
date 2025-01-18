"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react";
import TabList from "./compounds/TabList";
import TabItem from "./compounds/TabItem";
import TabNakedItem from "./compounds/TabNakedItem";

export const tabAlign = {
  line: "flex gap-4",
  square: "grid grid-cols-2 gap-4",
} as const;

export const tabColors = {
  gray: "bg-gray-10 text-gray-30 border-gray-20",
  yellow: "bg-warning-10 text-warning-30 border-warning-30",
  teal: "bg-secondary-20 text-tertiary-20 border-tertiary-20",
  white: "bg-background text-gray-30 border-background",
  navy: "bg-paragraph text-background border-paragraph",
};

export const tabSizes = {
  sm: "min-w-[4.25rem] px-2 py-[0.3rem] text-xs",
  md: "min-w-[5rem] px-3 py-2 text-sm",
  lg: "min-w-[6rem] px-4 py-2 text-base",
};

interface TabContextType<T extends string> {
  selectedItem: T;
  setSelectedItem: (item: T) => void;
  align: keyof typeof tabAlign;
  tabSize: keyof typeof tabSizes;
  nonPickedColor: keyof typeof tabColors;
  pickedColor: keyof typeof tabColors;
  rounded?: boolean;
  tabItemList: T[];
}

const TabContext = createContext<TabContextType<string> | null>(null);

export function useTab<T extends string>(): TabContextType<T> {
  const context = useContext(TabContext);
  if (!context)
    throw new Error("해당 컴포넌트는 Tab 컴포넌트 내부에서 사용되어야 합니다.");

  return context as TabContextType<T>;
}

interface TabProps<T extends string> extends PropsWithChildren {
  defaultSelected: T;
  tabItemList?: T[];
  align: keyof typeof tabAlign;
  tabSize: keyof typeof tabSizes;
  nonPickedColor: keyof typeof tabColors;
  pickedColor: keyof typeof tabColors;
  rounded?: boolean;
}

function Tab<T extends string>({
  children,
  defaultSelected,
  tabItemList,
  align,
  tabSize,
  nonPickedColor,
  pickedColor,
  rounded,
}: TabProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T>(defaultSelected);

  const contextValue: TabContextType<T> = {
    selectedItem,
    setSelectedItem,
    align,
    tabSize,
    nonPickedColor,
    pickedColor,
    rounded,
    tabItemList,
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
}

interface TabContentProps<T extends string> {
  children: ({ selectedItem }: { selectedItem: T }) => ReactNode;
}

function TabContent<T extends string>({ children }: TabContentProps<T>) {
  const { selectedItem } = useTab<T>();

  return <>{children({ selectedItem })}</>;
}

Tab.List = TabList;
Tab.Item = TabItem;
Tab.NakedItem = TabNakedItem;
Tab.Content = TabContent;

export default Tab;
