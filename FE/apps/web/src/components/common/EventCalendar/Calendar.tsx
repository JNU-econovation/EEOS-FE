import Spacing from "@/components/common/Spacing";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { useFetchMonthlyCalendarQuery } from "@/hooks/query/useCalendarQuery";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

interface CalendarProps {
  event: SimpleCalendarDto[];
}

const _Calendar = ({ event }: CalendarProps) => {
  return (
    <section>
      <CalendarHeader />
      <Spacing size={2} direction="vertical" />
      <CalendarBody events={event} />
    </section>
  );
};

export default _Calendar;
