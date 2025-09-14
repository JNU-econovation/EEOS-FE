export interface CalendarEvent {
  id: string;
  title: string;
  category: "eventTeam" | "etc";
  startDate: Date;
  endDate: Date;
  slackLink?: string;
}
