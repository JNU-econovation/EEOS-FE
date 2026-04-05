import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/types/bridge";
import { useBridge } from "@geongyu/bridge/web";
import { useCallback } from "react";

interface OpenEventCreateFormModalRequestBody {
  year: number;
  month: number;
  date: number;
}

const useOpenEventCreateFormModalBridge = () => {
  const { request } = useBridge<
    MessageEventRequestData,
    MessageEventResponseData
  >();

  return useCallback(
    (body: OpenEventCreateFormModalRequestBody) => {
      request({
        requestMessage: {
          method: "POST",
          name: "open-event-create-form-modal",
          body,
        },
        responseCallback: ({ status }) => {
          if (status === "success") {
            //
            return;
          }
          console.error("Failed to open event create form modal");
        },
      });
    },
    [request],
  );
};

export default useOpenEventCreateFormModalBridge;
