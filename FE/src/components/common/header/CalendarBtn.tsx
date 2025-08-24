"use client";

import Link from "next/link";
import ROUTES from "@/constants/ROUTES";

const CalendarBtn = () => {
  return (
    <Link
      href={ROUTES.CALENDAR}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
    >
      캘린더
    </Link>
  );
};

export default CalendarBtn;