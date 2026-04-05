import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCalender,
  getCalendarEventsOnWeek,
  postCalender,
} from "@/apis/calendar";
import API from "@/constants/API";
import { DateFilter, NewCalendar } from "@/types/calendar";

export function useCreateCalendarEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCalendar: NewCalendar) => postCalender(newCalendar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API.CALENDAR.FETCH] });
    },
  });
}

export function useDeleteCalendarEventMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (calendarId: number) => deleteCalender(calendarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API.CALENDAR.FETCH] });
    },
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

export function useGetTwoMonthCalenderEventsQuery() {
  const today = new Date();
  const dateFilter: DateFilter = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
    duration: 60,
  };

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
