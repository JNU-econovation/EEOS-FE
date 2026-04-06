"use client";

import ErrorFallback from "@/components/common/error/ErrorFallback";
import Tab from "@/components/common/tabs/tab/TabCompound/TabCompound";
import Title from "@/components/common/Title/Title";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import { useGetProgramId } from "@/hooks/usePrograms";
import { AttendStatus } from "@/types/member";
import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfoByStatus from "../detail/attendee/AttendeeInfoByStatus";
import AttendeeTabNumberBadge from "../detail/attendee/AttendeeTabNumberBadge";
import Spacing from "@/components/common/Spacing";

const WebviewAttendeeInfoSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      <Title text="출석 현황" textSize="xl" />
      <div className="mt-8" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AttendeeTab>
          {({ status }) => (
            <AttendeeInfoByStatus
              key={status}
              programId={programId}
              status={status}
            />
          )}
        </AttendeeTab>
      </ErrorBoundary>
    </section>
  );
};

interface AttendeeTabProps {
  children?: (selectedItem: { status: AttendStatus }) => React.ReactNode;
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
      <Tab.List className="grid w-full grid-cols-3 !gap-0 border-b">
        {ATTEND_STATUS.STATUSES.filter(
          (status) => status !== "nonResponse",
        ).map((status, index) => (
          <Tab.NakedItem
            key={`${status}-${index}`}
            fullWidth
            text={ATTEND_STATUS.LIST[status].text}
            value={status}
          >
            <AttendeeTabNumberBadge status={status} />
          </Tab.NakedItem>
        ))}
      </Tab.List>
      <Spacing size={14} direction="vertical" unit="px" />
      <Tab.Content<AttendStatus>>
        {({ selectedItem }) => children({ status: selectedItem })}
      </Tab.Content>
    </Tab>
  );
};

export default WebviewAttendeeInfoSection;
