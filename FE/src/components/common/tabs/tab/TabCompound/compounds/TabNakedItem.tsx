import classNames from "classnames";
import { tabColors, tabSizes, useTab } from "../TabCompound";

interface TabItemProps<T extends string> {
  text: T;
}

function TabNakedItem<T extends string>({ text }: TabItemProps<T>) {
  const { selectedItem, setSelectedItem, tabSize } = useTab<T>();

  const border = text === selectedItem ? "border-black" : "border-transparent";

  const tabItemStyle = classNames(
    "flex h-fit w-fit translate-y-px cursor-pointer items-center justify-center border-b-2 border-black font-semibold text-black transition-all",
    tabSizes[tabSize],
    border,
  );

  return (
    <button
      className={tabItemStyle}
      onClick={() => setSelectedItem(text)}
      type="button"
    >
      <p>{text}</p>
    </button>
  );
}

export default TabNakedItem;
