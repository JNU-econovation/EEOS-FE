import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import { DateFilter, NewCalendar } from "@/types/calendar";

export const getCalendarEventsOnWeek = async (
  dateFilter: DateFilter,
): Promise<SimpleCalendarDto[]> => {
  const { data } = await https({
    method: "GET",
    url: API.CALENDAR.WEEKLY(dateFilter),
  });

  return data.data.calendars.map(
    (item: SimpleCalendarDto) => new SimpleCalendarDto({ ...item }),
  );
};

export function postCalender(newCalendar: NewCalendar) {
  return https({
    url: API.CALENDAR.CREATE,
    method: "POST",
    data: newCalendar,
  });
}

export function deleteCalender(calendarId: number) {
  return https({
    url: API.CALENDAR.DELETE(calendarId),
    method: "DELETE",
  });
}
