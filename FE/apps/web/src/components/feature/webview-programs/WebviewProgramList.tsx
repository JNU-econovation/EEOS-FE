"use client";

import { ProgramStatus } from "@/types/program";

interface WebviewProgramListProps {
  selectedTab: ProgramStatus;
}

const WebviewProgramList = ({ selectedTab }: WebviewProgramListProps) => {
  // const { data: programListData } = useGetProgramListInWebview({
  // category,
  // programStatus,
  // page: page - 1,
  // size: PROGRAM.LIST_SIZE,
  // isAdmin,
  // });

  return (
    <ul className="flex h-full flex-col gap-6 overflow-y-auto">
      {new Array(10).fill(0).map((_, index) => (
        <li className="flex gap-2">
          <div className="h-11 w-11 rounded-lg bg-gray-300"></div>
          <div className="grow">
            <p className="text-xl font-semibold">2024-2 B팀 2차 주간발표</p>
            <p className="text-sm font-bold text-green-600">출석체크중</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WebviewProgramList;
