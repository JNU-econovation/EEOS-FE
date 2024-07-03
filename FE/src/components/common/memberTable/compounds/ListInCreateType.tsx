import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MemberTableLoader from "../MemberTable.loader";
import { MemberContext } from "../MemberTableWrapper";
import CheckBox from "@/components/common/CheckBox";
import ErrorFallback from "@/components/common/ErrorFallback";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { Members } from "@/hooks/useEditProgramFormData";

interface ListInCreateTypeProps {
  members: Set<number> | Map<number, Members>;
  setMembers: (memberId: number) => void;
}
const ListInCreateType = ({ members, setMembers }: ListInCreateTypeProps) => {
  const queryClient = useQueryClient();
  const {
    tab: { selectedActive },
    createData: { setChecked },
  } = useContext(MemberContext);

  const { data: memberList, isLoading } = useGetMemberByActive(selectedActive);
  if (isLoading) return <MemberTableLoader />;

  queryClient.setQueryData(
    ["memberIdList"],
    memberList.map((v) => v.memberId),
  );

  const isCheckedAll = memberList
    .map((v) => v.memberId)
    .every((v) => members.has(v));
  setChecked(isCheckedAll);

  const handleCheck = (memberId) => {
    setMembers(memberId);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
          <CheckBox
            checked={members.has(memberId)}
            onClick={() => handleCheck(memberId)}
          />
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
        </div>
      ))}
    </ErrorBoundary>
  );
};
export default ListInCreateType;
