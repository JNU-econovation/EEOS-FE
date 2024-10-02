import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPresentations } from "@/apis/proxy/github";

const usePresentations = (programId: number) => {
  const queryClient = useQueryClient();
  const githubUrl: string = queryClient.getQueryData(["githubUrl", programId]);
  console.log(githubUrl);

  return useGetPresentation(programId, githubUrl);
};

export default usePresentations;

const useGetPresentation = (programId: number, githubUrl: string) => {
  console.log(githubUrl);

  return useQuery({
    queryKey: ["presentations", programId],
    queryFn: () => getPresentations(githubUrl as string),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!githubUrl,
  });
};
