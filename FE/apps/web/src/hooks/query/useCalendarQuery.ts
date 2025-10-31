import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCalender,
  getCalendarEventsOnWeek,
  postCalender,
} from "@/apis/calendar";
import API from "@/constants/API";
import { DateFilter, NewCalendar } from "@/types/calendar";

export function useCreateCalendarEventMutation() {
  return useMutation({
    mutationFn: (newCalendar: NewCalendar) => postCalender(newCalendar),
  });
}

export function useDeleteCalendarEventMutation() {
  return useMutation({
    mutationFn: (calendarId: number) => deleteCalender(calendarId),
  });
}

export function useFetchMonthlyCalendarQuery(dateFilter: DateFilter) {
  return useQuery({
    queryKey: [
      API.CALENDAR.FETCH,
      dateFilter.year,
      dateFilter.month,
      dateFilter.date,
      dateFilter.duration,
    ],
    queryFn: () => getCalendarEventsOnWeek(dateFilter),
  });
}
