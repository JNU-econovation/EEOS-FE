import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@geongyu/bridge/web";
import { useCallback } from "react";

interface PutTokenParams {
  accessToken: string;
  refreshToken: string;
  accessExpiredTime: string;
}

const usePutTokenBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(
    ({ accessToken, refreshToken, accessExpiredTime }: PutTokenParams) => {
      request({
        requestMessage: {
          method: "PUT",
          name: "put-token",
          body: { accessToken, refreshToken, accessExpiredTime },
        },
        responseCallback: ({ status }) => {
          if (status === "success") {
            return;
          }
          console.error("Put token failed");
        },
      });
    },
    [request],
  );
};

export default usePutTokenBridge;
