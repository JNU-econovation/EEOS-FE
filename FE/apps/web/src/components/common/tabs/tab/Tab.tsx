// TODO 해당 컴포넌트 대신 /tabCompound/Tab 컴포넌트를 하용하기 바랍니다.

import classNames from "classnames";
import TabItem, { tabColors, tabSizes } from "./TabItem";
import { TabOption } from "@/types/tab";

const tabAlign = {
  line: "flex gap-4",
  square: "grid grid-cols-2 gap-4",
};

export interface TabProps<T> {
  options: TabOption<T>[];
  selected: T;
  onItemClick: (selected: T) => void;
  size: keyof typeof tabSizes;
  baseColor: keyof typeof tabColors;
  pointColor: keyof typeof tabColors;
  align: keyof typeof tabAlign;
  rounded?: boolean;
}

const Tab = <T,>({
  options,
  selected,
  onItemClick,
  size,
  baseColor,
  pointColor,
  align,
  rounded,
}: TabProps<T>) => {
  const tabStyle = classNames(
    tabAlign[align],
    "w-full overflow-x-scroll scrollbar-hide",
  );
  const getColor = (option: TabOption<T>) => {
    return option.type === selected ? pointColor : baseColor;
  };

  return (
    <div className={tabStyle}>
      {options.map((option: TabOption<T>) => (
        <TabItem
          key={option.text}
          color={getColor(option)}
          size={size}
          text={option.text}
          onClick={() => onItemClick(option.type)}
          rounded={rounded}
        />
      ))}
    </div>
  );
};
export default Tab;
