import CheckBox from "../../CheckBox";
import { ActiveStatus } from "@/types/member";

interface SelectMemberListProps {
  memberId: number;
  isChecked: boolean;
  activeStatus: ActiveStatus;
  name: string;
  handleCheck: (memberId: number) => void;
}
const SelectMemberList = ({
  memberId,
  isChecked,
  activeStatus,
  name,
  handleCheck,
}: SelectMemberListProps) => {
  return (
    <div
      className="grid h-20 w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
      key={memberId}
    >
      <CheckBox checked={isChecked} onClick={() => handleCheck(memberId)} />
      <span>{activeStatus}</span>
      <span className="font-bold">{name}</span>
    </div>
  );
};

export default SelectMemberList;
