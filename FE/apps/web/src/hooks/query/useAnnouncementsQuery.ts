import { useQuery } from "@tanstack/react-query";
import { getCalendarEventsOnWeek } from "@/apis/calendar";
import { getAnnouncements } from "@/apis/announcement";

export const useAnnouncementsQuery = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAnnouncements(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
};
