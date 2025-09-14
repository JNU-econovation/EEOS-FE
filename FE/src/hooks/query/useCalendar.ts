import { getCalendarEventsOnWeek } from "@/apis/calendar";
import { useQuery } from "@tanstack/react-query";

export const useGetSimpleCalendarEvents = () => {
  return useQuery({
    queryKey: ["calendar", "simpleEvents"],
    queryFn: getCalendarEventsOnWeek,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
