import classNames from "classnames";
import Image from "next/image";
import ActiveStatusToggle from "../../toggle/ActiveStatusToggle";
import { useTableContext } from "../TableWrapper";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { useDeleteMember } from "@/hooks/query/useMemberQuery";

interface MemberManageListProps {
  memberList: MemberActiveStatusInfoDto[];
}
const MemberManageList = ({ memberList }: MemberManageListProps) => {
  const { columnWidths } = useTableContext();
  const { mutate: deleteMember } = useDeleteMember();

  const handleDeleteMember = (memberId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    ok && deleteMember({ memberId });
  };

  const listGridStyle = `grid-cols-[${columnWidths}]`;
  const listColumnStyle = classNames(
    "grid h-20 w-fit items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full",
    listGridStyle,
  );

  //TODO: queryClient로직은 훅에서 처리하도록 변경
  // queryClient.setQueryData(
  //   ["memberIdList"],
  //   memberList.map((v) => v.memberId),
  // );

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div className={listColumnStyle} key={memberId}>
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
          <div className="flex w-full items-center justify-end">
            <ActiveStatusToggle
              memberId={memberId}
              selectedValue={activeStatus}
            />
          </div>
          <button onClick={() => handleDeleteMember(memberId)}>
            <Image
              src="/icons/trash.svg"
              width={22}
              height={22}
              alt="Delete Btn"
            />
          </button>
        </div>
      ))}
    </>
  );
};

export default MemberManageList;
