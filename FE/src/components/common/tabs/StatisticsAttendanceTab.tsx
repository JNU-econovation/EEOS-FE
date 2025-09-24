"use client";

import { useState } from "react";
import Tab from "./tab/TabCompound/TabCompound";
import { ActiveStatusWithAll } from "@/types/member";
import { useGetSemesterStartDate } from "@/hooks/query/useUserQuery";

const memberTabItemList: ActiveStatusWithAll[] = [
  "all",
  "am",
  "rm",
  "cm",
  "ob",
];

interface StatisticsAttendanceTabProps {
  children: ({
    selectedItem,
  }: {
    selectedItem: ActiveStatusWithAll;
    startPeriod: number;
  }) => JSX.Element;
}
const StatisticsAttendanceTab = ({
  children,
}: StatisticsAttendanceTabProps) => {
  const {
    data: { startDate },
  } = useGetSemesterStartDate();
  const [today] = useState(new Date());
  const [startPeriod, setStartPeriod] = useState(startDate);

  return (
    <Tab<ActiveStatusWithAll>
      align="line"
      defaultSelected={memberTabItemList[0]}
      nonPickedColor="gray"
      pickedColor="teal"
      tabItemList={memberTabItemList}
      tabSize="lg"
    >
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <Tab.List>
          {memberTabItemList.map((tabItem) => (
            <Tab.Item key={tabItem} text={tabItem} />
          ))}
        </Tab.List>
        <div className="flex items-center justify-end gap-2">
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            value={new Date(startPeriod).toISOString().split("T")[0]}
            onChange={({ target: { value } }) => {
              if (new Date(value) > today)
                return setStartPeriod(today.getTime());
              setStartPeriod(new Date(value).getTime());
            }}
          />
          <span>-</span>
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            value={today.toISOString().split("T")[0]}
            title="오늘까지만 선택 가능합니다."
            disabled
          />
        </div>
      </div>
      <Tab.Content<ActiveStatusWithAll>>
        {({ selectedItem }) => children({ selectedItem, startPeriod })}
      </Tab.Content>
    </Tab>
  );
};

export default StatisticsAttendanceTab;
