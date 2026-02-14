"use client";

import WebviewProgramList from "./WebviewProgramList";
import WebviewProgramTab from "./WebviewProgramTab";

const WebviewProgramsSection = () => {
  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <WebviewProgramTab>
        {(selectedTab) => <WebviewProgramList selectedTab={selectedTab} />}
      </WebviewProgramTab>
    </section>
  );
};

export default WebviewProgramsSection;
