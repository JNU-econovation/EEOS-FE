import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@geongyu/bridge/web";
import { useCallback } from "react";

const useGoBackBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(() => {
    request({
      requestMessage: {
        method: "DELETE",
        name: "go-back",
      },
      responseCallback: ({ status }) => {
        if (status === "success") {
          //
          return;
        }
        console.error("Go back failed");
      },
    });
  }, [request]);
};

export default useGoBackBridge;
