"use client";

import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import { AttendStatus } from "@/types/member";
import AttendeeTabNumberBadge from "./AttendeeTabNumberBadge";

interface AttendeeTabProps {
  children?: (selectedItem: { status: AttendStatus }) => JSX.Element;
}

const AttendeeTab = ({ children }: AttendeeTabProps) => {
  return (
    <Tab<AttendStatus>
      align="line"
      defaultSelected={`${ATTEND_STATUS.STATUSES[0]}`}
      nonPickedColor="white"
      pickedColor="white"
      tabSize="md"
    >
      <Tab.List className="gap-0 border-b">
        {ATTEND_STATUS.STATUSES.map((status, index) => (
          <Tab.NakedItem
            key={`${status}-${index}`}
            text={ATTEND_STATUS.LIST[status].text}
            value={status}
          >
            <AttendeeTabNumberBadge status={status} />
          </Tab.NakedItem>
        ))}
      </Tab.List>
      <Tab.Content<AttendStatus>>
        {({ selectedItem }) => children({ status: selectedItem })}
      </Tab.Content>
    </Tab>
  );
};

export default AttendeeTab;
