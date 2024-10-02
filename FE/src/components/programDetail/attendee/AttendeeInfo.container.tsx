"use client";

import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfo from "./AttendeeInfo";
import BluredAttedee from "./BluredAttedee";
import ErrorFallback from "@/components/common/error/ErrorFallback";

interface AttendeeInfoContainerProps {
  programId: number;
  isLoggedIn: boolean;
}

export const attendStatuses = [
  "attend",
  "late",
  "absent",
  "nonResponse",
] as const;

const AttendeeInfoContainer = ({
  programId,
  isLoggedIn,
}: AttendeeInfoContainerProps) => {
  return (
    <>
      {!isLoggedIn &&
        attendStatuses.map((status) => (
          <BluredAttedee key={status} status={status} />
        ))}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="space-y-16">
          {isLoggedIn &&
            attendStatuses.map((status) => (
              <AttendeeInfo
                key={status}
                programId={programId}
                status={status}
              />
            ))}
        </div>
      </ErrorBoundary>
    </>
  );
};
export default AttendeeInfoContainer;
