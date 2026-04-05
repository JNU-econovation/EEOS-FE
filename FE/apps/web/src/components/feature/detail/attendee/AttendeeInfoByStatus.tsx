import AttendeeInfoLoader from "./AttendeeInfo.loader";
import MemberList from "@/components/common/MemberList";
import { useGetProgramMembersByAttend } from "@/hooks/query/useMemberQuery";
import { useGetProgramId } from "@/hooks/usePrograms";
import { AttendStatus } from "@/types/member";

interface AttendeeInfoProps {
  programId: number;
  status: AttendStatus;
}

const AttendeeInfoByStatus = ({ status }: AttendeeInfoProps) => {
  const programId = useGetProgramId();
  // const queryClient = useQueryClient();

  const {
    data: members,
    isLoading,
    isError,
  } = useGetProgramMembersByAttend({
    programId,
    status,
  });

  if (isLoading) return <AttendeeInfoLoader />;
  if (isError) return <></>;

  // const programType = queryClient.getQueryData<ProgramType>([
  //   "programType",
  //   programId,
  // ]);

  // const isRender =
  //   programType === "demand" && status === "nonResponse" ? false : true;

  return <MemberList members={members} />;
};
export default AttendeeInfoByStatus;
