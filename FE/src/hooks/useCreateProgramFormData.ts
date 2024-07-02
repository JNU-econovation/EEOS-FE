"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateProgram } from "./query/useProgramQuery";
import useProgramFormData from "./useProgramFormData";
import FORM_INFO from "@/constants/FORM_INFO";
import { ProgramCategory, ProgramType } from "@/types/program";
import { TeamInputInfo } from "@/types/team";

export interface ProgramFormDataState {
  title: string;
  deadLine: string;
  type: ProgramType;
  category: ProgramCategory;
  content: string;
  programGithubUrl: string;
  teamList: TeamInputInfo[];
}

export interface ProgramFormDataAction {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDeadLine: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<ProgramType>>;
  setCategory: React.Dispatch<React.SetStateAction<ProgramCategory>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setProgramGithubUrl: React.Dispatch<React.SetStateAction<string>>;
  setTeamList: React.Dispatch<React.SetStateAction<TeamInputInfo[]>>;
  reset: () => void;
}

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  type: "notification",
  category: "weekly",
  content: "",
  programGithubUrl: "",
  teamList: [],
};

export interface ProgramFormData
  extends ProgramFormDataState,
    ProgramFormDataAction {}

const useCreateProgramFormData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    title,
    deadLine,
    type,
    category,
    content,
    isDemand,
    programGithubUrl,
    teams,
    setTitle,
    setDeadLine,
    setCategory,
    setContent,
    setProgramGithubUrl,
    setTeams,
    reset,
    handleChangeType,
  } = useProgramFormData(initialState);

  const [members, setMembers] = useState<Set<number>>(new Set<number>());

  const { mutate: createProgramMutate } = useCreateProgram({
    programData: {
      deadLine,
      content,
      category,
      type,
      programGithubUrl,
      teams,
      members: Array.from(members, (memberId) => ({ memberId })),
      title: type === "demand" ? `${FORM_INFO.DEMAND_PREFIX} ${title}` : title,
    },
    formReset: reset,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !deadLine || !category || !type) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    createProgramMutate();
  };

  const handleReset = () => {
    reset();
    router.back();
  };

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
  const handleGithubUrlChange = (url: string) => {
    setProgramGithubUrl(url);
  };
  const handleTeamListChange = (teamList: TeamInputInfo[]) => {
    setTeams(teamList);
  };

  return {
    type,
    title,
    content,
    members,
    teams,
    isDemand,
    deadLine,
    category,
    programGithubUrl,
    setTitle,
    setContent,
    handleReset,
    setCategory,
    setDeadLine,
    handleSubmit,
    updateMembers,
    updateAllMembers,
    handleChangeType,
    handleTeamListChange,
    handleGithubUrlChange,
  };
};
export default useCreateProgramFormData;
