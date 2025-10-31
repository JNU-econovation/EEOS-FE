import classNames from "classnames";
import { tabColors, tabSizes, useTab } from "../TabCompound";

interface TabItemProps<T extends string> {
  text: T;
}

function TabItem<T extends string>({ text }: TabItemProps<T>) {
  const {
    selectedItem,
    setSelectedItem,
    tabSize,
    nonPickedColor,
    pickedColor,
    rounded,
  } = useTab<T>();

  const color = text === selectedItem ? pickedColor : nonPickedColor;

  const tabItemStyle = classNames(
    "flex h-fit w-fit cursor-pointer items-center justify-center border-2 font-semibold",
    tabColors[color],
    tabSizes[tabSize],
    {
      "rounded-2xl": rounded,
      "rounded-md": !rounded,
    },
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

export default TabItem;
