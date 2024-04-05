"use client";

import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfo from "./AttendeeInfo";
import BluredAttedee from "./BluredAttedee";
import ErrorFallback from "@/components/common/ErrorFallback";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

interface AttendeeInfoContainerProps {
  programId: number;
}

export const attendStatuses = [
  "attend",
  "late",
  "absent",
  "nonResponse",
] as const;

const AttendeeInfoContainer = ({ programId }: AttendeeInfoContainerProps) => {
  const isLoggedIn = CheckIsLoggedIn();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-16">
        {isLoggedIn
          ? attendStatuses.map((status) => (
              <AttendeeInfo
                key={status}
                programId={programId}
                status={status}
              />
            ))
          : attendStatuses.map((status) => (
              <BluredAttedee key={status} status={status} />
            ))}
      </div>
    </ErrorBoundary>
  );
};
export default AttendeeInfoContainer;
