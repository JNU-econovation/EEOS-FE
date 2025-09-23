"use client";

import StatisticsAttendanceTab from "@/components/common/tabs/StatisticsAttendanceTab";
import StatisticsAttendanceTable from "./StatisticsAttendanceTable";

const StatisticsAttendanceTabSection = () => {
  return (
    <StatisticsAttendanceTab>
      {(selectedItem) => (
        <div className="mt-4">
          <StatisticsAttendanceTable selectedItem={selectedItem} />
        </div>
      )}
    </StatisticsAttendanceTab>
  );
};

export default StatisticsAttendanceTabSection;
