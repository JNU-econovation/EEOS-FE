import classNames from "classnames";
import { useState } from "react";
import CheckBox from "@/components/common/CheckBox";

interface HeaderProps {
  formType: "create" | "edit" | "manage";
  onClickCheckBox?: (checked: boolean) => void;
}
const Header = ({ formType, onClickCheckBox = () => {} }: HeaderProps) => {
  const [checked, setChecked] = useState(false);
  // const [checked, setChecked] = useAtom(memberTableCheckedAtom);

  const HEADER_TEXT = {
    create: ["활동 상태", "이름"],
    edit: ["대상", "활동 상태", "이름", "", "출석 상태"],
    manage: ["활동 상태", "이름", "", ""],
  };
  const HeaderStyle = classNames(
    "grid w-fit  justify-items-center gap-4 border-y-2 border-stroke-10 bg-gray-10 px-10 py-4 font-bold sm:w-full",
    {
      "grid-cols-[7rem_7.25rem_1fr_10rem]": formType === "manage",
      "grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem]":
        formType === "edit" || formType === "create",
    },
  );

  const handleClickCheckBox = () => {
    onClickCheckBox(!checked);
    setChecked((prev) => !prev);
  };

  return (
    <div className={HeaderStyle}>
      {formType === "create" && (
        <CheckBox checked={checked} onClick={handleClickCheckBox} />
      )}
      {HEADER_TEXT[formType].map((text: string, index: number) => (
        <span key={`${index}-${text}`}>{text}</span>
      ))}
    </div>
  );
};
export default Header;
