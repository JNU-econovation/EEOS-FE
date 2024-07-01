import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateProgram } from "./query/useProgramQuery";
import FORM_INFO from "@/constants/FORM_INFO";
import { ProgramCategory, ProgramType } from "@/types/program";

export interface ProgramFormDataState {
  title: string;
  deadLine: string;
  type: ProgramType;
  category: ProgramCategory;
  content: string;
}

export interface ProgramFormDataAction {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDeadLine: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<ProgramType>>;
  setCategory: React.Dispatch<React.SetStateAction<ProgramCategory>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  reset: () => void;
}

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  type: "notification",
  category: "weekly",
  content: "",
};

export interface ProgramFormData
  extends ProgramFormDataState,
    ProgramFormDataAction {}

const useCreateProgramFormData = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>(initialState.title);
  const [deadLine, setDeadLine] = useState<string>(initialState.deadLine);
  const [type, setType] = useState<ProgramType>(initialState.type);
  const [category, setCategory] = useState<ProgramCategory>(
    initialState.category,
  );
  const [content, setContent] = useState<string>(initialState.content);

  const reset = () => {
    setTitle(initialState.title);
    setDeadLine(initialState.deadLine);
    setType(initialState.type);
    setCategory(initialState.category);
    setContent(initialState.content);
  };

  const [members, setMembers] = useState<Set<number>>(new Set<number>());

  const { mutate: createProgramMutate } = useCreateProgram({
    programData: {
      members: Array.from(members, (memberId) => ({ memberId })),
      title: type === "demand" ? `${FORM_INFO.DEMAND_PREFIX} ${title}` : title,
      deadLine: deadLine,
      content: content,
      category: category,
      type: type,
    },
    formReset: reset,
  });

  const isDemand = type === "demand";

  const handleChangeType = () => {
    setType(isDemand ? "notification" : "demand");
  };

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

  return {
    title,
    content,
    members,
    isDemand,
    deadLine,
    category,
    setTitle,
    setContent,
    handleReset,
    setCategory,
    setDeadLine,
    handleSubmit,
    updateMembers,
    updateAllMembers,
    handleChangeType,
  };
};
export default useCreateProgramFormData;
