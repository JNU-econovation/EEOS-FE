import classNames from "classnames";
import { useContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import CheckBox from "../../CheckBox/CheckBox";
import ErrorFallback from "../../error/ErrorFallback";
import AttendStatusToggle from "../../toggle/AttendStatusToggle";
import MemberTableLoader from "../MemberTable.loader";
import { MemberContext } from "../MemberTableWrapper";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import MESSAGE from "@/constants/MESSAGE";
import { useGetProgramMembersByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatus, AttendStatus } from "@/types/member";

interface ListInEditTypeProps {
  programId: number;
  setMembers: (memberId: number, before: string, after: string) => void;
  isEditable?: boolean;
}
const ListInEditType = ({
  programId,
  setMembers,
  isEditable,
}: ListInEditTypeProps) => {
  const {
    tab: { selectedActive },
  } = useContext(MemberContext);

  const { data: editMemberList, isLoading: isEditListLoading } =
    useGetProgramMembersByActive({
      programId,
      status: selectedActive,
    });

  if (isEditListLoading) return <MemberTableLoader />;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {editMemberList.map(({ memberId, activeStatus, attendStatus, name }) => (
        <EditMemberTableItem
          key={memberId}
          memberId={memberId}
          name={name}
          activeStatus={activeStatus}
          initAttendStatus={attendStatus}
          setMembers={setMembers}
          isEditable={isEditable}
        />
      ))}
    </ErrorBoundary>
  );
};

interface EditMemberTableItemProps {
  memberId: number;
  name: string;
  activeStatus: ActiveStatus;
  initAttendStatus: AttendStatus;
  setMembers: (
    memberId: number,
    before: AttendStatus,
    after: AttendStatus,
  ) => void;
  isEditable?: boolean;
}

const EditMemberTableItem = ({
  memberId,
  name,
  activeStatus,
  initAttendStatus,
  setMembers,
  isEditable = true,
}: EditMemberTableItemProps) => {
  const [selectedAttend, setSelectedAttend] =
    useState<AttendStatus>(initAttendStatus);
  const isRelated = selectedAttend !== "nonRelated";

  const itemStyle = classNames(
    "grid h-20 w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full",
    {
      "opacity-50": !isEditable,
    },
  );

  const getAfterAttendStatus = (
    initAttend: AttendStatus,
    selectedAttend: AttendStatus,
  ) => {
    if (selectedAttend !== "nonRelated") return "nonRelated";
    if (initAttend === "nonRelated") return "nonResponse";
    return initAttend;
  };

  const handleCheckBoxChange = () => {
    if (!isEditable) {
      toast.error(MESSAGE.EDIT_DISABLED.PROGRAM_ACTIVE);
      return;
    }
    const afterAttendStatus = getAfterAttendStatus(
      initAttendStatus,
      selectedAttend,
    );
    setSelectedAttend(afterAttendStatus);
    setMembers(memberId, initAttendStatus, afterAttendStatus);
  };

  const handleAttendStatusChange = (value: AttendStatus) => {
    if (!isEditable) {
      toast.error(MESSAGE.EDIT_DISABLED.PROGRAM_ACTIVE);
      return;
    }
    setSelectedAttend(value);
    setMembers(memberId, initAttendStatus, value);
  };

  return (
    <div className={itemStyle}>
      <CheckBox checked={isRelated} onClick={handleCheckBoxChange} />
      <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
      <span className="font-bold">{name}</span>
      <span></span>
      <AttendStatusToggle
        disabled={!isRelated}
        selectedValue={selectedAttend}
        onSelect={handleAttendStatusChange}
      />
    </div>
  );
};

export default ListInEditType;
