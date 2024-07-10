import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPresentations } from "@/apis/proxy/github";

const usePresentations = (programId: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["presentations", programId],
    queryFn: () => {
      const githubUrl = queryClient.getQueryData(["githubUrl", programId]);
      if (!githubUrl) return;
      return getPresentations(githubUrl as string);
    },
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
};

export default usePresentations;
