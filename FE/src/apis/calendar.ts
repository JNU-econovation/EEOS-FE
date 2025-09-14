import { https } from "@/apis/instance";
import API from "@/constants/API";
import { generateCurrentMonthMockData } from "@/mocks/calendarMockData";
import { DateFilter, NewCalendar } from "@/types/calendar";

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

export async function fetchMonthlyCalendar(dateFilter: DateFilter) {
  try {
    return await https({
      url: API.CALENDAR.FETCH,
      method: "GET",
      params: dateFilter,
    });
  } catch (error) {
    // TODO: 테스트용 코드 제거
    console.warn("API 호출 실패, Mock 데이터를 사용합니다:", error);
    // Mock 데이터를 API 응답 형식으로 반환
    return {
      data: {
        calendars: generateCurrentMonthMockData(),
      },
    };
  }
}
