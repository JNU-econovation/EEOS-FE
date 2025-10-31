"use client";

import { useCallback } from "react";
import NumberBadge from "@/components/NumberBadge/NumberBadge";
import { useGetProgramMembersByAttend } from "@/hooks/query/useMemberQuery";
import { useGetProgramId } from "@/hooks/usePrograms";
import { AttendStatus } from "@/types/member";

const AttendeeTabNumberBadge = ({ status }: { status: AttendStatus }) => {
  const programId = useGetProgramId();
  const { data: members, isLoading } = useGetProgramMembersByAttend({
    programId,
    status,
  });

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

  if (isLoading)
    return <NumberBadge color={getBadgeColorFromStatus(status)} number={0} />;

  const memberCount = members.length;

  return (
    <NumberBadge color={getBadgeColorFromStatus(status)} number={memberCount} />
  );
};

export default AttendeeTabNumberBadge;
