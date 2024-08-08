import CheckBox from "../../CheckBox";
import { useTableContext } from "../TableWrapper";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { Members } from "@/hooks/useMemberForm";

interface SelectMemberListProps {
  selectedMember: Set<number> | Map<number, Members>;
  setSelectedMember: (memberId: number) => void;
  memberList: MemberActiveStatusInfoDto[];
}
const SelectMemberList = ({
  selectedMember,
  setSelectedMember,
  memberList,
}: SelectMemberListProps) => {
  const {
    checkboxState: { checked: idHeadChecked, setChecked },
  } = useTableContext();

  if (idHeadChecked) {
    memberList.forEach(({ memberId }) => {
      if (!selectedMember.has(memberId)) {
        setSelectedMember(memberId);
      }
    });
  } else {
    const isCheckedAll = memberList
      .map((v) => v.memberId)
      .every((v) => selectedMember.has(v));
    setChecked(isCheckedAll);
  }

  const handleCheck = (memberId: number) => {
    if (idHeadChecked) {
      setChecked(false);
    }
    setSelectedMember(memberId);
  };

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
          <CheckBox
            checked={selectedMember.has(memberId)}
            onClick={() => handleCheck(memberId)}
          />
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
        </div>
      ))}
    </>
  );
};

export default SelectMemberList;
