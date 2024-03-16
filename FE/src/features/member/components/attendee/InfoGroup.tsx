"use client";

import { ErrorBoundary } from "react-error-boundary";
import { AttendeeInfo } from "./Info";
import ErrorFallback from "@/components/common/ErrorFallback";

interface AttendeeInfoGroupProps {
  programId: number;
}

export const AttendeeInfoGroup = ({ programId }: AttendeeInfoGroupProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="space-y-16">
        <AttendeeInfo programId={programId} status="attend" />
        <AttendeeInfo programId={programId} status="late" />
        <AttendeeInfo programId={programId} status="absent" />
        <AttendeeInfo programId={programId} status="nonResponse" />
      </div>
    </ErrorBoundary>
  );
};
