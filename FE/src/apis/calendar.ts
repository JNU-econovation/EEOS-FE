import { https } from "@/apis/instance";
import API from "@/constants/API";
import { DateFilter, NewCalendar } from "@/types/calendar";

export function postCalender(newCalendar: NewCalendar) {
  return https({
    url: API.CALENDAR.CREATE,
    method: "POST",
    data: newCalendar,
  });
}

export function fetchMonthlyCalendar(dateFilter: DateFilter) {
  return https({
    url: API.CALENDAR.FETCH,
    method: "GET",
    params: dateFilter,
  });
}
