import { SimpleMemberInfo } from "./member";
import { AccessRight } from "./program";

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
