"use client";

import { ProgramStatus } from "@/types/program";
import classNames from "classnames";
import { useState } from "react";

interface WebviewProgramTabProps {
  children: (arg: ProgramStatus) => React.ReactNode;
}

const WebviewProgramTab = ({ children }: WebviewProgramTabProps) => {
  const [selectedTab, setSelectedTab] = useState<ProgramStatus>("active");

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="grid shrink-0 grid-cols-2 overflow-hidden rounded-full bg-[#F5F5F5] p-1">
        <button
          className={classNames(
            "grow rounded-full py-2",
            selectedTab === "active"
              ? "bg-white text-black shadow-sm"
              : "text-black",
          )}
          onClick={() => setSelectedTab("active")}
        >
          <span className="block text-center">진행 · 예정</span>
        </button>
        <button
          className={classNames(
            "grow rounded-full py-2",
            selectedTab === "end"
              ? "bg-white text-black shadow-sm"
              : "text-black",
          )}
          onClick={() => setSelectedTab("end")}
        >
          <span className="block text-center">완료</span>
        </button>
      </div>
      <div className="h-8 shrink-0" />
      <div className="min-h-0 flex-1 overflow-hidden">
        {children(selectedTab)}
      </div>
    </div>
  );
};

export default WebviewProgramTab;
