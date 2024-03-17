import { deleteTokenInfo } from "@/utils/localStorage";

export const useLogout = () => {
  return { mutate: deleteTokenInfo };
};
