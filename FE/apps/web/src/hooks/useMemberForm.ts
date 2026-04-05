"use client";

import { useState } from "react";
import type { AttendStatus } from "@/types/member";
import { updateSet } from "@/utils/set";

export interface Members {
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

export const useMemberSet = () => {
  const [members, setMembers] = useState<Set<number>>(new Set<number>());

  const updateMembers = (memberId: number) => {
    setMembers(updateSet<number>(members, memberId));
  };

  const clearMembers = () => {
    setMembers(new Set<number>());
  };
  const setAllMembers = (memberList: number[]) => {
    setMembers(new Set<number>(memberList));
  };

  return {
    members,
    updateMembers,
    clearMembers,
    setAllMembers,
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
