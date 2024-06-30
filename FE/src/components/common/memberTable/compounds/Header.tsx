import { useAtom } from "jotai";
import CheckBox from "@/components/common/CheckBox";
import { memberTableCheckedAtom } from "@/store/memberTableCheckedAtom";
import { FormType } from "@/types/form";

interface HeaderProps {
  formType: FormType;
  onClickCheckBox?: (selected: boolean) => void;
}
/**
 * 멤버 테이블의 헤더 컴포넌트
 * fromType에 따라 다른 ui를 출력함. (create, edit)
 * create: ["활동 상태", "이름"]
 * edit: ["활동 상태", "이름", "", "출석 상태"]
 */
const Header = ({ formType, onClickCheckBox = () => {} }: HeaderProps) => {
  const HEADER_TEXT = {
    create: ["활동 상태", "이름"],
    edit: ["대상", "활동 상태", "이름", "", "출석 상태"],
    manage: ["활동 상태", "이름", "", ""],
  };

  const [checked, setChecked] = useAtom(memberTableCheckedAtom);

  const handleClickCheckBox = () => {
    onClickCheckBox(!checked);
    setChecked((prev) => !prev);
  };

  return (
    <div className="grid w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] justify-items-center gap-4 border-y-2 border-stroke-10 bg-gray-10 px-10 py-4 font-bold sm:w-full">
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
