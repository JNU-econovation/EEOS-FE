import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import { https } from "@/apis/instance";
import API from "@/constants/API";

export const getCalendarEventsOnWeek = async (): Promise<
  SimpleCalendarDto[]
> => {
  const { data } = await https({
    method: "GET",
    url: API.CALENDAR.WEEKLY({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      duration: 14,
    }),
  });

  return data.data.calendars.map(
    (item: SimpleCalendarDto) => new SimpleCalendarDto({ ...item }),
  );
};
