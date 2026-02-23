import Spacing from "@/components/common/Spacing";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

interface CalendarProps {
  event: SimpleCalendarDto[];
  onDateClick?: (date: Date) => void;
}

const Calendar = ({ event, onDateClick }: CalendarProps) => {
  return (
    <section>
      <CalendarHeader />
      <Spacing size={2} direction="vertical" />
      <CalendarBody events={event} onDateClick={onDateClick} />
    </section>
  );
};

export default Calendar;
