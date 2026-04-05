import { deletePushToken } from "@/src/apis/notification";
import { useMutation } from "@tanstack/react-query";
import API from "@constants/apis";

const useDeletePushTokenMutation = () => {
  return useMutation({
    mutationKey: [API.NOTIFICATION.DELETE_TOKEN],
    mutationFn: deletePushToken,
  });
};

export default useDeletePushTokenMutation;
