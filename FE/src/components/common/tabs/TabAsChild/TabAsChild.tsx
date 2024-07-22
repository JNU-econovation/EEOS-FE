"use client";
import classNames from "classnames";
import { useState, ReactNode } from "react";
import TabItem from "../TabItem";

const tabAlign = {
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

//TODO: Tab 컴포넌트까지 새롭게 만들어야 함.
interface TabAsChildProps<ListType> {
  defaultSelected: ListType;
  tabItemList?: ListType[];
  align: keyof typeof tabAlign;
  children: ({ selectedItem }: { selectedItem: ListType }) => ReactNode;
  rounded?: boolean;
  tabSize: keyof typeof tabSizes;
  nonPickedColor: keyof typeof tabColors;
  pickedColor: keyof typeof tabColors;
}

/**
 * [변경] 탭의 사이즈, 색상, 정렬등의 모든 책임을 해당 컴포넌트에서 가집니다.
 *
 * @example - children에 ({selectedItem}) => <div>{selectedItem === "Home" && <HomeContent />}</div> 와 같이 사용합니다.
 *
 */

const TabAsChild = <ListType extends string>({
  defaultSelected,
  tabItemList,
  nonPickedColor,
  pickedColor,
  rounded,
  align,
  tabSize,
  children,
}: TabAsChildProps<ListType>) => {
  const [selectedItem, setSelectedItem] = useState<ListType>(defaultSelected);

  if (!tabItemList) {
    throw new Error("optionItemList이 필요합니다.");
  }

  const tabStyle = classNames(
    tabAlign[align],
    "w-full overflow-x-scroll scrollbar-hide",
  );

  return (
    <>
      <div className={tabStyle}>
        {tabItemList.map((item) => (
          <TabItem
            key={item}
            color={item === selectedItem ? pickedColor : nonPickedColor}
            size={tabSize}
            text={item}
            onClick={() => setSelectedItem(item)}
            rounded={rounded}
          />
        ))}
      </div>
      {children({ selectedItem })}
    </>
  );
};

export default TabAsChild;
