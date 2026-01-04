import WebviewCalendarSection from "@/components/feature/webview-calendar/calendar/Calendar";
import CalendarBottomSheet from "@/components/feature/webview-calendar/CalendarBottomSheet";
import { SsgoiTransition } from "@ssgoi/react";

export default function WebviewCalendarPage() {
  return (
    <SsgoiTransition id="/calendar" className="min-h-screen bg-white">
      <div className="flex h-screen flex-col overflow-hidden">
        <WebviewCalendarSection />
        <div className="mt-20" />
      </div>
      <CalendarBottomSheet />
    </SsgoiTransition>
  );
}
