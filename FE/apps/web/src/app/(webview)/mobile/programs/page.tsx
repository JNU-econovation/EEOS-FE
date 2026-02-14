"use client";

import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import WebviewProgramList from "@/components/feature/webview-programs/WebviewProgramList";
import WebviewProgramTab from "@/components/feature/webview-programs/WebviewProgramTab";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewProgramPage = () => {
  return (
    <SsgoiTransition id="/programs" className="min-h-screen bg-white">
      <AppSafeArea
        edges={["top", "left", "right", "bottom"]}
        classname="!overflow-hidden h-full"
      >
        <div className="h-full overflow-hidden">
          <WebviewProgramTab>
            {(selectedTab) => (
              <div className="h-full ">
                <div className="h-8" />
                <WebviewProgramList selectedTab={selectedTab} />
              </div>
            )}
          </WebviewProgramTab>
        </div>
      </AppSafeArea>
    </SsgoiTransition>
  );
};

export default WebviewProgramPage;
