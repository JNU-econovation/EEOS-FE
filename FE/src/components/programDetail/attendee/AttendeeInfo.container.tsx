"use client";

import { ErrorBoundary } from "react-error-boundary";
import AttendeeInfo from "./AttendeeInfo";
import ErrorFallback from "@/components/common/ErrorFallback";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

interface AttendeeInfoContainerProps {
  programId: number;
}

const AttendeeInfoContainer = ({ programId }: AttendeeInfoContainerProps) => {
  const isLoggedIn = CheckIsLoggedIn();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-16">
        {!isLoggedIn && (
          <div className="text-center text-red-500">
            로그인이 필요한 페이지입니다.
          </div>
        )}
        <AttendeeInfo programId={programId} status="attend" />
        <AttendeeInfo programId={programId} status="late" />
        <AttendeeInfo programId={programId} status="absent" />
        <AttendeeInfo programId={programId} status="nonResponse" />
      </div>
    </ErrorBoundary>
  );
};
export default AttendeeInfoContainer;
