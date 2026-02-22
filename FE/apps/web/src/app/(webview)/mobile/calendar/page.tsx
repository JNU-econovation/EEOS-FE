import WebviewCalendar from "@/components/feature/webview-calendar/WebviewCalendar";
import CalendarBottomSheet from "@/components/feature/webview-calendar/CalendarBottomSheet";
import { SsgoiTransition } from "@ssgoi/react";
import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";

export default function WebviewCalendarPage() {
  return (
    <SsgoiTransition id="/calendar" className="min-h-screen bg-white">
      <AppSafeArea edges={["top", "bottom"]}>
        <div className="flex h-screen flex-col overflow-hidden px-4">
          <WebviewCalendar />
        </div>
      </AppSafeArea>
      <CalendarBottomSheet />
    </SsgoiTransition>
  );
}
