import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import Image from "next/image";
import { MemberAttendStatusInfoDto } from "../../apis/dtos";
import AttendeeInfoLoader from "./Info.loader";
import MemberList from "@/components/common/MemberList";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import { AttendStatus, useGetMembersByAttend } from "@/features/member";
import { ProgramType } from "@/types/program";

interface AttendeeInfoProps {
  programId: number;
  status: AttendStatus;
}

interface HeaderProps {
  status: AttendStatus;
  members: MemberAttendStatusInfoDto[];
}

export const AttendeeInfo = ({ programId, status }: AttendeeInfoProps) => {
  const queryClient = useQueryClient();

  const {
    data: members,
    isLoading,
    isError,
  } = useGetMembersByAttend({
    programId: programId,
    status,
  });

  if (isLoading) return <AttendeeInfoLoader />;
  if (isError) return <></>;

  const programType = queryClient.getQueryData<ProgramType>([
    "programType",
    programId,
  ]);

  const isRender =
    programType === "demand" && status === "nonResponse" ? false : true;

  return (
    <>
      {isRender && (
        <div>
          <Header status={status} members={members} />
          <MemberList members={members} />
        </div>
      )}
    </>
  );
};

const colors = {
  green: "bg-success-30",
  yellow: "bg-warning-20",
  red: "bg-action-20",
  gray: "bg-gray-20",
};

const Header = ({ status, members }: HeaderProps) => {
  const { text, icon, color } = ATTEND_STATUS.LIST[status];
  const iconStyle = classNames(
    "flex h-fit w-fit items-center justify-center rounded-full p-1",
    colors[color],
  );

  return (
    <div className="flex items-end justify-between border-b-[1px] p-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{text}</span>
        <div className={iconStyle}>
          <Image
            src={icon}
            alt="참석 상태 아이콘"
            width={18}
            height={18}
            className="h-[18px] w-[18px]"
          />
        </div>
      </div>
      <span className="text-stroke-60 text-sm">{members.length}명</span>
    </div>
  );
};
