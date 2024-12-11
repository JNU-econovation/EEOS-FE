"use client";

import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfoByStatus from "./AttendeeInfoByStatus";
import ErrorFallback from "@/components/common/error/ErrorFallback";
import { useGetProgramId } from "@/hooks/usePrograms";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";

const AttendeeInfoSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="space-y-16">
          {ATTEND_STATUS.STATUSES.map((status) => (
            <AttendeeInfoByStatus
              key={status}
              programId={programId}
              status={status}
            />
          ))}
        </div>
      </ErrorBoundary>
    </section>
  );
};
export default AttendeeInfoSection;
