import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProgramById } from "@/apis/program";
import API from "@/constants/API";
import { useGetAttendStatus } from "@/features/user";
import { ProgramStatus, ProgramType } from "@/types/program";

const useGetAttendStatusAndProgramInfo = (programId: number) => {
  const queryClient = useQueryClient();

  const { data: userAttendStatusInfo, isLoading: userLoading } =
    useGetAttendStatus(programId);

  const programType = queryClient.getQueryData<ProgramType>([
    "programType",
    programId,
  ]);
  const programStatus = queryClient.getQueryData<ProgramStatus>([
    "programStatus",
    programId,
  ]);

  const { data: ProgramData, isLoading: programLoading } = useQuery(
    [API.PROGRAM.DELETE(programId), programId],
    async () => {
      const program = await getProgramById(programId);
      return program;
    },
    {
      enabled: !programType || !programStatus,
    },
  );

  return {
    userAttendStatusInfo,
    isLoading: userLoading || programLoading,
    programType: programType || ProgramData?.type,
    programStatus: programStatus || ProgramData?.programStatus,
  };
};
export default useGetAttendStatusAndProgramInfo;
