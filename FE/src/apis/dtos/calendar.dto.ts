export class SimpleCalendarDto {
  public calendarId: number;
  public title: string;
  public startAt: number;
  public endAt: number;
  public type: "event" | "presentation" | "etc";
  public url: string;

  constructor(data: {
    calendarId: number;
    title: string;
    startAt: number;
    endAt: number;
    type: "event" | "presentation" | "etc";
    url: string;
  }) {
    this.calendarId = data.calendarId;
    this.title = data.title;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.type = data.type;
    this.url = data.url;
  }
}
