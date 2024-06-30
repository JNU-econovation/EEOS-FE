import { TeamInfo } from "@/types/team";

export class TeamListDto {
  public readonly teams: TeamInfo[];
  constructor(data: { teams: TeamInfo[] }) {
    this.teams = data?.teams || [];
  }
}
