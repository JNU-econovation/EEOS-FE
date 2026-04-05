import { useParams } from "next/navigation";

export const useGetProgramId = () => {
  const { programId } = useParams();
  return +programId;
};
