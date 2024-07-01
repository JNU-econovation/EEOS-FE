export interface TeamInfo {
  teamId: number;
  teamName: string;
}
export interface TeamInputInfo extends Omit<TeamInfo, "teamName"> {}
