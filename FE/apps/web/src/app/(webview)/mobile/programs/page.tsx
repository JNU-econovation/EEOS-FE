"use client";

import WebviewProgramList from "@/components/feature/webview-programs/WebviewProgramList";
import WebviewProgramTab from "@/components/feature/webview-programs/WebviewProgramTab";
import { SsgoiTransition } from "@ssgoi/react";

// const { data: programListData } = useGetProgramListInWebview({
// category,
// programStatus,
// page: page - 1,
// size: PROGRAM.LIST_SIZE,
// isAdmin,
// });

const WebviewProgramPage = () => {
  return (
    <SsgoiTransition id="/programs" className="min-h-screen bg-white">
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
