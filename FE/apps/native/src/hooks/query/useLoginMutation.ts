import { postLogin } from "@/src/apis/login";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: postLogin,
  });
};

export default useLoginMutation;
