"use client";

import Calendar from "@/components/icons/items/CalendarIcon";
import useRouteToWebviewScreenBridge from "@/hooks/bridge/useRouteToWebviewScreenBridge";
import { useCallback } from "react";

const WebviewProgramsHeader = () => {
  const routeToWebviewScreen = useRouteToWebviewScreenBridge();

  const handleOpenCalendar = useCallback(() => {
    routeToWebviewScreen({ uri: `${window.location.origin}/mobile/calendar` });
  }, [routeToWebviewScreen]);

  return (
    <header className="flex w-full shrink-0 justify-end">
      <button
        type="button"
        aria-label="캘린더 열기"
        onClick={handleOpenCalendar}
        className="rounded-full bg-[#F5F5F5] p-2"
      >
        <Calendar />
      </button>
    </header>
  );
};

export default WebviewProgramsHeader;
