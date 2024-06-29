import { TeamInfo } from "@/types/team";

export class TeamListDto {
  public readonly teams: TeamInfo[];
  constructor(data: { teams: TeamInfo[] }) {
    console.log(data);
    this.teams = data?.teams || [];
  }
}
