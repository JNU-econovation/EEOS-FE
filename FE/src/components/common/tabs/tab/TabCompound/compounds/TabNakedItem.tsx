import classNames from "classnames";
import { tabSizes, useTab } from "../TabCompound";

interface TabItemProps<T extends string> {
  text: string;
  value: T;
}

function TabNakedItem<T extends string>({ text, value }: TabItemProps<T>) {
  const { selectedItem, setSelectedItem, tabSize } = useTab<T>();

  const isSelected = value === selectedItem;

  const border = isSelected ? "border-black" : "border-transparent";

  const tabItemStyle = classNames(
    "flex h-fit w-fit translate-y-px cursor-pointer items-center justify-center border-b-2 border-black font-semibold text-black transition-all",
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
    </button>
  );
}

export default TabNakedItem;
