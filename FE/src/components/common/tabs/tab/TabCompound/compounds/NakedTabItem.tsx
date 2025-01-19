import classNames from "classnames";
import { tabSizes, useTab } from "../TabCompound";
import { PropsWithChildren } from "react";

interface TabItemProps<T extends string> extends PropsWithChildren {
  text: string;
  value: T;
}

function NakedTabItem<T extends string>({
  text,
  value,
  children,
}: TabItemProps<T>) {
  const { selectedItem, setSelectedItem, tabSize } = useTab<T>();

  const isSelected = value === selectedItem;

  const border = isSelected ? "border-black" : "border-transparent";

  const tabItemStyle = classNames(
    "relative flex h-fit w-fit cursor-pointer items-center justify-center gap-2 border-b-2 border-black font-semibold text-black transition-all",
    tabSizes[tabSize],
    border,
  );

  return (
    <button
      className={tabItemStyle}
      onClick={() => setSelectedItem(value)}
      type="button"
    >
      <p>{text}</p>
      {children && children}
    </button>
  );
}

export default NakedTabItem;
