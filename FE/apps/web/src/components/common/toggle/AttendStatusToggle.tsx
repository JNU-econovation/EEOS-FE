"use client";

import classNames from "classnames";
import { createContext } from "react";
import StatusToggleItem, { StatusToggleItemColor } from "../StatusToggleItem";
import ATTEND_STATUS, {
  AttendStatusToggleOption,
} from "@/constants/ATTEND_STATUS";
import { AttendStatus } from "@/types/member";

interface AttendStatusToggleProps {
  selectedValue: AttendStatus;
  onSelect: (value: AttendStatus) => void;
  disabled?: boolean;
}

const toggleContext = createContext<AttendStatusToggleProps>(null);

interface ToggleWrapperProps {
  children: React.ReactNode;
}
export const ToggleWrapper = ({ children }: ToggleWrapperProps) => {
  return (
    <toggleContext.Provider value={null}>{children}</toggleContext.Provider>
  );
};

const AttendStatusToggle = ({
  selectedValue,
  onSelect,
  disabled,
}: AttendStatusToggleProps) => {
  const options = Object.values(ATTEND_STATUS.TOGGLE);
  const handleClick = (value: AttendStatusToggleOption) => {
    !disabled && value.type !== selectedValue && onSelect(value.type);
  };

  const selectorStyle = classNames(
    "flex h-fit w-fit transform rounded-3xl bg-gray-10",
    {
      "opacity-30": disabled,
    },
  );

  const getItemColor = (type: AttendStatus, color: string) => {
    if (disabled) {
      return "gray";
    }
    return selectedValue === type ? color : "gray";
  };

  return (
    <div className={selectorStyle}>
      {options.map((option) => (
        <div onClick={() => handleClick(option)} key={option.text}>
          <StatusToggleItem
            text={option.text}
            color={
              getItemColor(option.type, option.color) as StatusToggleItemColor
            }
          />
        </div>
      ))}
    </div>
  );
};
export default AttendStatusToggle;
