"use client";

import StatisticsAttendanceTab from "@/components/common/tabs/StatisticsAttendanceTab";
import StatisticsAttendanceTable from "./StatisticsAttendanceTable";
import { Suspense } from "react";

const StatisticsAttendanceTabSection = () => {
  return (
    <Suspense>
      <StatisticsAttendanceTab>
        {({ selectedItem, startPeriod }) => (
          <div className="mt-4">
            <StatisticsAttendanceTable
              selectedItem={selectedItem}
              startPeriod={startPeriod}
            />
          </div>
        )}
      </StatisticsAttendanceTab>
    </Suspense>
  );
};

export default StatisticsAttendanceTabSection;
