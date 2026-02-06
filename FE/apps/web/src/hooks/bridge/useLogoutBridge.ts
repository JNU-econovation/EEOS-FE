import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@geongyu/bridge/web";
import { useCallback } from "react";

const useLogoutBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        method: "DELETE",
        name: "logout",
      },
      responseCallback: ({ status }) => {
        if (status === "success") {
          //
          return;
        }
        console.error("Logout failed");
      },
    });
  }, [request]);
};

export default useLogoutBridge;
