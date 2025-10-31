import Link from "next/link";
import ROUTES from "@/constants/ROUTES";

const CalendarBtn = () => {
  return (
    <Link
      href={ROUTES.CALENDAR}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium transition-colors"
    >
      캘린더
    </Link>
  );
};

export default CalendarBtn;
