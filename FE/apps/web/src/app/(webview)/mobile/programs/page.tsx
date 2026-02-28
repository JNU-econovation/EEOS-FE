import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import WebviewProgramsSection from "@/components/feature/webview-programs/WebviewProgramsSection";
import Calendar from "@/components/icons/items/CalendarIcon";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewProgramPage = () => {
  return (
    <SsgoiTransition id="/programs" className="min-h-screen bg-white">
      <AppSafeArea
        edges={["top", "left", "right", "bottom"]}
        classname="flex h-screen flex-col !overflow-visible"
      >
        <div className="flex w-full shrink-0 justify-end">
          <button className="rounded-full bg-[#F5F5F5] p-2">
            <Calendar />
          </button>
        </div>

        <div className="h-4 shrink-0" />
        <WebviewProgramsSection />
      </AppSafeArea>
    </SsgoiTransition>
  );
};

export default WebviewProgramPage;
