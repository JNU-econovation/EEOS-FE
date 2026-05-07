import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import WebviewProgramsHeader from "@/components/feature/webview-programs/WebviewProgramsHeader";
import WebviewProgramsSection from "@/components/feature/webview-programs/WebviewProgramsSection";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewProgramPage = () => {
  return (
    <SsgoiTransition id="/programs" className="min-h-screen bg-white">
      <AppSafeArea
        edges={["top", "left", "right", "bottom"]}
        classname="flex h-screen flex-col !overflow-visible"
      >
        <WebviewProgramsHeader />

        <div className="h-4 shrink-0" />
        <WebviewProgramsSection />
      </AppSafeArea>
    </SsgoiTransition>
  );
};

export default WebviewProgramPage;
