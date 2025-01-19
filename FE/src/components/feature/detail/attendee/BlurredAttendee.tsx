"use client";

import { MemberAttendStatusInfoDto } from "@/apis/dtos/member.dto";
import MemberList from "@/components/common/MemberList";
import Title from "@/components/common/Title/Title";
import { AttendStatus } from "@/types/member";
import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import NumberBadge from "@/components/NumberBadge/NumberBadge";
import { useCallback } from "react";

const mockMember: MemberAttendStatusInfoDto = {
  memberId: 1,
  name: "20기 김개똥",
  attendStatus: "attend",
};

export default function BlurredAttendee() {
  const population = (status: AttendStatus) =>
    status === "attend"
      ? 52
      : status === "late"
      ? 3
      : status === "absent"
      ? 1
      : 0;

  const members = (status: AttendStatus) =>
    Array.from({ length: population(status) }, (_, i) => ({
      ...mockMember,
      memberId: i + 1,
    }));

  const getBadgeColorFromStatus = useCallback((status: AttendStatus) => {
    switch (status) {
      case "attend":
        return "green";
      case "late":
        return "yellow";
      case "absent":
        return "red";
      default:
        return "gray";
    }
  }, []);

  return (
    <section>
      <Title text="출석 현황" textSize="xl" />
      <div className="mt-4" />
      <div className="pointer-events-none select-none blur">
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
                <NumberBadge
                  number={population(status)}
                  color={getBadgeColorFromStatus(status)}
                />
              </Tab.NakedItem>
            ))}
          </Tab.List>
          <MemberList members={members("attend")} />
        </Tab>
      </div>
    </section>
  );
}
