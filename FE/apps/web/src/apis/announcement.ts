import API from "@/constants/API";
import { AnnouncementDto } from "./dtos/announcement";
import { https } from "./instance";

/**
 * 모바일 홈 화면에서 사용하는 공지사항 가져오기 요청
 */
export const getAnnouncements = async (): Promise<AnnouncementDto[]> => {
  const { data } = await https({
    url: API.ANNOUNCEMENT.LIST,
    method: "GET",
  });
  return (data?.data.announcements || []).map(
    (item: any) => new AnnouncementDto(item),
  );
};
