import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import {
  GetProgramListRequest,
  PatchProgramBody,
  PostProgramRequest,
  deleteProgram,
  getProgramAccessRight,
  getProgramById,
  getProgramList,
  patchProgram,
  postProgram,
  sendSlackMessage,
  updateProgramAttendMode,
} from "@/apis/program";
import API from "@/constants/API";
import ROUTES from "@/constants/ROUTES";
import { ActiveStatusWithAll } from "@/types/member";
import {
  ProgramAttendStatus,
  ProgramStatus,
  ProgramType,
} from "@/types/program";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (programData: PostProgramRequest) => postProgram(programData),
    onSuccess: () => queryClient.invalidateQueries([API.PROGRAM.LIST]),
  });
};

export const useSendSlackMessage = () => {
  return useMutation({
    mutationFn: (programId: number) => sendSlackMessage(programId),
  });
};

interface useUpdateProgramProps {
  programId: number;
}
export const useUpdateProgram = ({ programId }: useUpdateProgramProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.PROGRAM.UPDATE(programId)],
    mutationFn: (body: PatchProgramBody) => patchProgram({ programId, body }),
    onSettled: ({ programId }) => {
      router.replace(ROUTES.DETAIL(programId));

      const statuses: ActiveStatusWithAll[] = ["all", "am", "cm", "rm", "ob"];
      statuses.forEach((status) => {
        queryClient.invalidateQueries([
          API.MEMBER.ACTIVE_STATUS(programId),
          status,
        ]);
      });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ programId }: { programId: number }) =>
      await deleteProgram(programId),
    onSuccess: () => {
      queryClient.invalidateQueries([API.PROGRAM.LIST]);
    },
  });
};

export const useGetProgramByProgramId = (
  programId: number,
  isAbleToEdit: boolean,
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [API.PROGRAM.Edit_DETAIL(programId)],
    queryFn: () =>
      getProgramById(programId, isAbleToEdit).then((res) => {
        //TODO: setquery 지양하기
        queryClient.setQueryData<ProgramStatus>(
          ["programStatus", programId],
          res.programStatus,
        );
        queryClient.setQueryData<ProgramType>(
          ["programType", programId],
          res.type,
        );
        queryClient.setQueryData<string>(
          ["githubUrl", programId],
          res.programGithubUrl,
        );
        return res;
      }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetProgramList = ({
  category,
  programStatus,
  size,
  page,
  isAdmin,
}: GetProgramListRequest) => {
  return useQuery({
    queryKey: [API.PROGRAM.LIST, category, programStatus, size, page],
    queryFn: () =>
      getProgramList({ category, programStatus, size, page, isAdmin }),
    select: (data) => ({
      totalPage: data?.totalPage,
      programs: data?.programs,
    }),
    suspense: true,
    staleTime: 1000 * 60 * 60,
  });
};

export const useGetProgramAccessRight = (programId: number) => {
  return useQuery({
    queryKey: [API.PROGRAM.ACCESS_RIGHT(programId)],
    queryFn: () => getProgramAccessRight(programId),
  });
};

export const useUpdateProgramAttendMode = (programId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.PROGRAM.UPDATE_ATTEND_MODE(programId)],
    mutationFn: (attendMode: ProgramAttendStatus) => {
      queryClient.invalidateQueries([API.PROGRAM.Edit_DETAIL(programId)]);
      return updateProgramAttendMode(programId, attendMode);
    },
    onSuccess: (_, targetAttendMode) => {
      const prevProgram = queryClient.getQueryData<ProgramInfoDto>([
        API.PROGRAM.Edit_DETAIL(programId),
      ]);

      const newProgram: ProgramInfoDto = {
        ...prevProgram,
        attendMode: targetAttendMode,
      };

      queryClient.setQueryData<ProgramInfoDto>(
        [API.PROGRAM.Edit_DETAIL(programId)],
        newProgram,
      );
    },
  });
};
