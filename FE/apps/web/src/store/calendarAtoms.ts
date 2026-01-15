import { atom } from "jotai";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

export const selectedDateAtom = atom<Date | null>(null);
export const selectedDateEventsAtom = atom<SimpleCalendarDto[]>([]);
export const isBottomSheetOpenAtom = atom<boolean>(false);
