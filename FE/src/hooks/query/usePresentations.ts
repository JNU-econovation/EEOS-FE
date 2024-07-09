import { useQuery } from "@tanstack/react-query";
import { getPresentations } from "@/apis/proxy/github";

const usePresentations = (githubUrl: string) => {
  return useQuery({
    queryKey: ["presentations", githubUrl],
    queryFn: () => getPresentations(githubUrl),
  });
};

export default usePresentations;
