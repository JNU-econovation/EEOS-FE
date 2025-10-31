import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetProgramByProgramId } from "./useProgramQuery";
import { getPresentations } from "@/apis/proxy/github";

const usePresentations = (programId: number) => {
  const { data: programData } = useGetProgramByProgramId(programId, false);
  return useGetPresentation(programId, programData?.programGithubUrl);
};

export default usePresentations;

const useGetPresentation = (programId: number, githubUrl: string) => {
  return useQuery({
    queryKey: ["presentations", programId],
    queryFn: () => getPresentations(githubUrl as string),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !!githubUrl,
  });
};
