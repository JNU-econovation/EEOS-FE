"use client";

import classNames from "classnames";
import Image from "next/image";
import { createContext, useContext, useState, ReactNode } from "react";

interface SelectorContextValue {
  isOpen: boolean;
  selectedValue: string;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

const SelectorContext = createContext<SelectorContextValue | undefined>(
  undefined,
);

const useSelectorContext = () => {
  const context = useContext(SelectorContext);
  if (!context) {
    throw new Error("Selector components must be used within a Selector");
  }
  return context;
};

interface SelectorProps {
  children: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * 사용법
 * <Selector defaultValue="value" onValueChange={(value) => console.log(value)}>
 *   <Selector.Trigger />
 *   <Selector.Content>
 *     <Selector.MenuItem value="value1">Value 1</Selector.MenuItem>
 *     <Selector.MenuItem value="value2">Value 2</Selector.MenuItem>
 *   </Selector.Content>
 * </Selector>
 */

const Selector = ({
  children,
  defaultValue = "",
  onValueChange,
}: SelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onValueChange?.(value);
  };

  return (
    <SelectorContext.Provider
      value={{
        isOpen,
        selectedValue,
        onToggle: handleToggle,
        onSelect: handleSelect,
      }}
    >
      <div className="relative flex">{children}</div>
    </SelectorContext.Provider>
  );
};

interface DefaultTriggerProps {
  showText?: (selectedValue: string) => string;
}

const DefaultTrigger = ({ showText }: DefaultTriggerProps) => {
  const { onToggle, selectedValue, isOpen } = useSelectorContext();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-32 shrink-0 rounded-lg border px-4 py-2 shadow-sm"
      >
        {showText ? showText(selectedValue) : selectedValue}
      </button>
      <Image
        className="absolute right-0 top-1/2 -translate-y-1/2 transform"
        src={`/icons/caret_${isOpen ? "up" : "down"}.svg`}
        alt="토글 아이콘"
        width={24}
        height={24}
      />
    </div>
  );
};

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const { isOpen, onToggle } = useSelectorContext();

  if (!isOpen) return null;

  return (
    <>
      <button
        className="fixed left-0 top-0 z-10 h-screen w-screen"
        onClick={onToggle}
      />
      <div className="absolute top-10 z-10 flex w-full flex-col overflow-hidden rounded-xl border bg-white shadow-lg">
        {children}
      </div>
    </>
  );
};

interface MenuItemProps {
  value: string;
  children: ReactNode;
}

const MenuItem = ({ value, children }: MenuItemProps) => {
  const { onSelect, selectedValue } = useSelectorContext();

  return (
    <div
      onClick={() => onSelect(value)}
      className={classNames(
        "flex shrink-0 cursor-pointer whitespace-nowrap px-4 py-2 text-center hover:bg-gray-100",
        {
          "rounded-xl border border-success-30 bg-success-10 text-success-30":
            selectedValue === value,
        },
      )}
    >
      {children}
    </div>
  );
};

Selector.Trigger = DefaultTrigger;
Selector.Content = Content;
Selector.MenuItem = MenuItem;

export default Selector;
