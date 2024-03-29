import { AccessRight } from "@/types/program";
import type {
  CreatableStatus,
  InputStatus,
  JoinableStatus,
  TeamBuildingInfo,
  TeamBuildingResult,
  TeamBuildingResultList,
  UserInputStatusInfo,
} from "@/types/teamBuilding";

export class TeamBuildingInfoDto {
  public readonly title: string;
  public readonly content: string;
  public readonly accessRight: AccessRight;

  constructor(data: TeamBuildingInfo) {
    this.title = data.title;
    this.content = data.content;
    this.accessRight = data.accessRight;
  }
}

export class UserInputStatusInfoDto {
  public readonly name: string;
  public readonly inputStatus: InputStatus;
  public readonly content: string | null;

  constructor(data: UserInputStatusInfo) {
    this.name = data.name;
    this.inputStatus = data.status;
    this.content = data.content;
  }
}

export class TeamBuildingResultListDto {
  public readonly accessRight: AccessRight;
  public readonly result: TeamBuildingResult;

  constructor(data: TeamBuildingResultList) {
    this.accessRight = data.accessRights;
    this.result = data.results;
  }
}

export class TeamBuildingIdDto {
  public readonly teamBuildingId: number;

  constructor(data: { teamBuildingId: number }) {
    this.teamBuildingId = data.teamBuildingId;
  }
}

export class TeamBuildingStatusDto {
  public readonly status: CreatableStatus | JoinableStatus;

  constructor(data: { status: CreatableStatus | JoinableStatus }) {
    this.status = data.status;
  }
}
