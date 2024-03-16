import { SimpleMemberInfo } from "@/types/member";
import { AccessRight } from "@/types/program";

export type InputStatus = "incomplete" | "complete";

export type StatusType = "creatability" | "joinability";
export type CreatableStatus = "creatable" | "noncreatable";
export type JoinableStatus = "joinable" | "nonjoinable";

export type TeamBuildingInfo = {
  title: string;
  content: string;
  accessRight: AccessRight;
};

export interface UserInputStatusInfo {
  name: string;
  status: InputStatus;
  content: string | null;
}

export type TeamBuildingResult = SimpleMemberInfo[][];

export type TeamBuildingResultList = {
  accessRights: AccessRight;
  results: TeamBuildingResult;
};

export interface SentenceRequest {
  content: string;
}

export type FieldType = "default" | "inputting" | "editing" | "viewer";
