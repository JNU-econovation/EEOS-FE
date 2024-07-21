import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/ErrorFallback";
import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import ActiveStatusToggle from "@/components/common/toggle/ActiveStatusToggle";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import {
  useDeleteMember,
  useGetMemberByActive,
} from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

const List = ({ selectedItem }: { selectedItem: ActiveStatusWithAll }) => {
  const queryClient = useQueryClient();

  const { data: memberList, isLoading } = useGetMemberByActive(selectedItem);
  const { mutate: deleteMember } = useDeleteMember();
  if (isLoading) return <MemberTableLoader />;

  const handleDeleteMember = (memberId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    ok && deleteMember({ memberId });
  };

  queryClient.setQueryData(
    ["memberIdList"],
    memberList.map((v) => v.memberId),
  );
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[7rem_7.25rem_1fr_10rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
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
    </ErrorBoundary>
  );
};

export default List;
