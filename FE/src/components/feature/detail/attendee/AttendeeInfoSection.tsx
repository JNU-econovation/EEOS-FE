"use client";

import ErrorFallback from "@/components/common/error/ErrorFallback";
import Title from "@/components/common/Title/Title";
import { useGetProgramId } from "@/hooks/usePrograms";
import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfoByStatus from "./AttendeeInfoByStatus";
import AttendeeTab from "./AttendeeTab";

const AttendeeInfoSection = () => {
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
export default AttendeeInfoSection;
