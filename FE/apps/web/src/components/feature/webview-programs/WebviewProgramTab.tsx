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
    <>
      <div className="flex overflow-hidden rounded-full bg-gray-100">
        <button
          className={classNames(
            "grow rounded-full p-2",
            selectedTab === "active" ? "bg-slate-900 text-white" : "text-black",
          )}
          onClick={() => setSelectedTab("active")}
        >
          <span className="block text-center">진행중</span>
        </button>
        <button
          className={classNames(
            "grow rounded-full p-2",
            selectedTab === "end" ? "bg-slate-900 text-white" : "text-black",
          )}
          onClick={() => setSelectedTab("end")}
        >
          <span className="block text-center">완료</span>
        </button>
      </div>
      {children(selectedTab)}
    </>
  );
};

export default WebviewProgramTab;
