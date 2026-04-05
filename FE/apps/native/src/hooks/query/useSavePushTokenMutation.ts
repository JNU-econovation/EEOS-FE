import { postSavePushToken } from "@/src/apis/notification";
import { useMutation } from "@tanstack/react-query";

const useSavePushTokenMutation = () => {
  return useMutation({
    mutationKey: ["savePushToken"],
    mutationFn: postSavePushToken,
  });
};

export default useSavePushTokenMutation;
