import { useQuery } from "@tanstack/react-query";
import { getCalendarEventsOnWeek } from "@/apis/calendar";

export const useGetSimpleCalendarEvents = () => {
  return useQuery({
    queryKey: ["calendar", "simpleEvents"],
    queryFn: () =>
      getCalendarEventsOnWeek({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        duration: 14,
      }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
