import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMonthlyCalendar, postCalender } from "@/apis/calendar";
import API from "@/constants/API";
import { DateFilter, NewCalendar } from "@/types/calendar";

export function useCreateCalendarEventMutation() {
  return useMutation({
    mutationFn: (newCalendar: NewCalendar) => postCalender(newCalendar),
  });
}

export function useFetchMonthlyCalendarQuery(dateFilter: DateFilter) {
  return useQuery({
    queryKey: [API.CALENDAR.FETCH],
    queryFn: () => fetchMonthlyCalendar(dateFilter),
  });
}
