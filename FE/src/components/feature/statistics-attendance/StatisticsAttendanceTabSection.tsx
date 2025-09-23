"use client";

import StatisticsAttendanceTab from "@/components/common/tabs/StatisticsAttendanceTab";
import dynamic from "next/dynamic";

const StatisticsAttendanceTable = dynamic(
  () => import("./StatisticsAttendanceTable"),
  { ssr: false },
);

const StatisticsAttendanceTabSection = () => {
  return (
    <StatisticsAttendanceTab>
      {(selectedItem) => (
        <StatisticsAttendanceTable selectedItem={selectedItem} />
      )}
    </StatisticsAttendanceTab>
  );
};

export default StatisticsAttendanceTabSection;
