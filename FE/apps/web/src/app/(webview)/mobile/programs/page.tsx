"use client";

import WebviewProgramList from "@/components/feature/webview-programs/WebviewProgramList";
import WebviewProgramTab from "@/components/feature/webview-programs/WebviewProgramTab";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewProgramPage = () => {
  return (
    <SsgoiTransition id="/programs">
      <div className="h-screen p-4">
        <WebviewProgramTab>
          {(selectedTab) => (
            <>
              <div className="h-8" />
              <WebviewProgramList selectedTab={selectedTab} />
            </>
          )}
        </WebviewProgramTab>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewProgramPage;
