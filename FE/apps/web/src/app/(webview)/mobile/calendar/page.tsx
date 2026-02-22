import WebviewCalendarSection from "@/components/feature/webview-calendar/EventCalendar/Calendar";
import CalendarBottomSheet from "@/components/feature/webview-calendar/CalendarBottomSheet";
import { SsgoiTransition } from "@ssgoi/react";
import _Calendar from "../../../../components/common/EventCalendar/Calendar";
import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";

export default function WebviewCalendarPage() {
  return (
    <SsgoiTransition id="/calendar" className="min-h-screen bg-white">
      <AppSafeArea edges={["top", "bottom"]}>
        <div className="flex h-screen flex-col overflow-hidden px-4">
          {/* <WebviewCalendarSection /> */}
          {/* <_Calendar /> */}
          <div className="mt-20" />
        </div>
      </AppSafeArea>
      <CalendarBottomSheet />
    </SsgoiTransition>
  );
}
