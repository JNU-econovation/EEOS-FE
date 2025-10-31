export type CalendarEventType = "event" | "presentation" | "etc";

export interface Calendar {
  calendarId: number;
  writer: string;
  startAt: number;
  endAt: number;
  title: string;
  type: CalendarEventType;
  url?: string;
}

export type NewCalendar = Omit<Calendar, "calendarId" | "writer">;

export interface DateFilter {
  year: number;
  month: number;
  date: number;
  duration: number;
}
