import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@geongyu/bridge/web";
import { useCallback } from "react";

interface RouteToWebviewScreenRequestBody {
  uri: string;
}

const useRouteToWebviewScreenBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(
    (body: RouteToWebviewScreenRequestBody) => {
      request({
        requestMessage: {
          method: "POST",
          name: "route-to-webview-screen",
          body,
        },
        responseCallback: ({ status }) => {
          if (status === "success") {
            return;
          }
          console.error("Failed to route to webview screen");
        },
      });
    },
    [request],
  );
};

export default useRouteToWebviewScreenBridge;
