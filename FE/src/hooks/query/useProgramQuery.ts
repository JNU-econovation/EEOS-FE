import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  GetProgramListRequest,
  PatchProgramRequest,
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

interface CreateProgram {
  programData: PostProgramRequest;
  formReset: () => void;
}

export const useCreateProgram = ({ programData, formReset }: CreateProgram) => {
  const useClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [API.PROGRAM.CREATE],
    mutationFn: async () => {
      const { programId } = await postProgram(programData);
      await sendSlackMessage(programId);
      return programId;
    },
    onSuccess: (programId) => {
      formReset();
      programId && router.replace(ROUTES.ADMIN_DETAIL(programId));
      useClient.invalidateQueries([API.PROGRAM.LIST]);
    },
    onError: (e: Error) => {
      //TODO: 추상화 필요
      toast.error(e.message);
    },
  });
};

export const useUpdateProgram = ({ programId, body }: PatchProgramRequest) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.PROGRAM.UPDATE(programId)],
    mutationFn: () => patchProgram({ programId, body }),
    onSettled: (data) => {
      data && router.replace(ROUTES.DETAIL(data?.programId));
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

export const useDeleteProgram = (programId: number) => {
  const useClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: [API.PROGRAM.DELETE(programId)],
    mutationFn: async () => {
      const res = await deleteProgram(programId);
      useClient.invalidateQueries([API.PROGRAM.LIST]);
      return res;
    },
    onSettled: () => {
      router.replace(ROUTES.MAIN);
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
  });
};
