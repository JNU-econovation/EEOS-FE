"use client";

import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfoByStatus from "./AttendeeInfoByStatus";
import ErrorFallback from "@/components/common/error/ErrorFallback";
import { useGetProgramId } from "@/hooks/usePrograms";
import Title from "@/components/common/Title/Title";
import AttendeeTab from "./AttendeeTab";

const AttendeeInfoSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      <Title text="출석 현황" textSize="xl" />
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

      {/* <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="space-y-16">
          {ATTEND_STATUS.STATUSES.map((status) => (
            <AttendeeInfoByStatus
              key={status}
              programId={programId}
              status={status}
            />
          ))}
        </div>
      </ErrorBoundary> */}
    </section>
  );
};
export default AttendeeInfoSection;
