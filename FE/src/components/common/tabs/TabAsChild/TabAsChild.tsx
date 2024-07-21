"use client";
import { useState, ReactNode } from "react";
import Tab, { TabProps } from "../Tab";

interface TabAsChildProps<ListType>
  extends Omit<
    TabProps<ListType>,
    "size" | "options" | "selected" | "onItemClick"
  > {
  defaultSelected: ListType;
  optionItemList?: ListType[];
  options?: TabProps<ListType>["options"];
  tabSize: TabProps<ListType>["size"];
  children: ({ selectedItem }: { selectedItem: ListType }) => ReactNode;
}

const TabAsChild = <ListType extends string>({
  defaultSelected,
  optionItemList,
  tabSize,
  baseColor,
  pointColor,
  rounded,
  align,
  options,
  children,
}: TabAsChildProps<ListType>) => {
  const [selectedItem, setSelectedItem] = useState<ListType>(defaultSelected);

  const convertedItems = options
    ? options
    : optionItemList.map((item) => ({
        type: item,
        text: item,
      }));

  return (
    <>
      <Tab<ListType>
        options={convertedItems}
        selected={selectedItem}
        onItemClick={(v) => setSelectedItem(v)}
        size={tabSize}
        baseColor={baseColor}
        pointColor={pointColor}
        align={align}
        rounded={rounded}
      />
      {children({ selectedItem })}
    </>
  );
};

export default TabAsChild;
