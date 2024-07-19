"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AttendStatus } from "@/types/member";

export interface Members {
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

export const useMemberSet = () => {
  const queryClient = useQueryClient();
  const [members, setMembers] = useState<Set<number>>(new Set<number>());

  const updateMembers = (memberId: number) => {
    const newMembers = new Set<number>(members);
    newMembers.has(memberId)
      ? newMembers.delete(memberId)
      : newMembers.add(memberId);
    setMembers(newMembers);
  };

  const updateAllMembers = (selected: boolean) => {
    const newMembers = new Set<number>(members);
    const memberIdList: number[] = queryClient.getQueryData(["memberIdList"]);
    if (selected) {
      memberIdList.forEach((v) => newMembers.add(v));
    }
    if (!selected) {
      memberIdList.forEach((v) => newMembers.delete(v));
    }
    setMembers(newMembers);
  };

  return {
    members,
    updateMembers,
    updateAllMembers,
  };
};

export const useMemberMap = () => {
  const [members, setMembers] = useState<Map<number, Members>>(new Map());

  const updateMembers = (
    memberId: number,
    before: AttendStatus,
    after: AttendStatus,
  ) => {
    const newMembers = new Map<number, Members>(members);

    if (before === after) {
      newMembers.delete(memberId);
    }
    if (before !== after) {
      newMembers.set(memberId, {
        beforeAttendStatus: before,
        afterAttendStatus: after,
      });
    }
    setMembers(newMembers);
  };

  return {
    members,
    updateMembers,
  };
};
