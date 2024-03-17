import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/constants/API";
import { ProgramStatus, ProgramType, getProgramById } from "@/features/program";
import { useGetAttendStatus } from "@/features/user";

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
