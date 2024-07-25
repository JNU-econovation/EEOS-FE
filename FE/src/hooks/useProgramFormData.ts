import { useState } from "react";
import { ProgramCategory, ProgramType } from "@/types/program";
import { TeamInputInfo } from "@/types/team";

export interface ProgramFormDataState {
  title: string;
  deadLine: string;
  type: ProgramType;
  category: ProgramCategory;
  content: string;
  programGithubUrl: string;
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
};

export interface ProgramFormData
  extends ProgramFormDataState,
    ProgramFormDataAction {}

const useProgramFormData = (programInfo: ProgramFormDataState) => {
  const [title, setTitle] = useState<string>(programInfo.title);
  const [deadLine, setDeadLine] = useState<string>(programInfo.deadLine);
  const [type, setType] = useState<ProgramType>(programInfo.type);
  const [category, setCategory] = useState<ProgramCategory>(
    programInfo.category,
  );
  const [content, setContent] = useState<string>(programInfo.content);
  const [programGithubUrl, setProgramGithubUrl] = useState<string>("");
  const [teams, setTeams] = useState<TeamInputInfo[]>([]);

  const setData = (data: ProgramFormDataState) => {
    const { title, deadLine, type, category, content, programGithubUrl } = data;
    setTitle(title);
    setDeadLine(deadLine);
    setType(type);
    setCategory(category);
    setContent(content);
    setProgramGithubUrl(programGithubUrl);
  };

  const reset = () => {
    setTitle(initialState.title);
    setDeadLine(initialState.deadLine);
    setType(initialState.type);
    setCategory(initialState.category);
    setContent(initialState.content);
  };

  const handleGithubUrlChange = (url: string) => {
    setProgramGithubUrl(url);
  };
  const handleTeamListChange = (teamList: TeamInputInfo[]) => {
    setTeams(teamList);
  };

  const isDemand = type === "demand";
  const handleChangeType = () => {
    setType(isDemand ? "notification" : "demand");
  };

  return {
    title,
    deadLine,
    type,
    category,
    content,
    programGithubUrl,
    teams,
    isDemand,
    setData,
    setTitle,
    setDeadLine,
    setType,
    setCategory,
    setContent,
    setProgramGithubUrl,
    setTeams,
    reset,
    handleGithubUrlChange,
    handleTeamListChange,
    handleChangeType,
  };
};
export default useProgramFormData;
