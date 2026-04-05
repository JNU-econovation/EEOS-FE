import WebviewCalendar from "@/components/feature/webview-calendar/WebviewCalendar";
import { SsgoiTransition } from "@ssgoi/react";
import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import WebviewCalendarEventBottomSheet from "@/components/feature/webview-calendar/WebviewCalendarEventBottomSheet";

export default function WebviewCalendarPage() {
  return (
    <SsgoiTransition id="/calendar" className="min-h-screen bg-white">
      <AppSafeArea edges={["top", "bottom"]}>
        <div className="flex h-screen flex-col overflow-hidden px-4">
          <WebviewCalendar />
        </div>
      </AppSafeArea>
      <WebviewCalendarEventBottomSheet />
    </SsgoiTransition>
  );
}
