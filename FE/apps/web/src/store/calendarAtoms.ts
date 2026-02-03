import { atom } from "jotai";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

export const selectedDateAtom = atom<Date>(new Date());
export const selectedDateEventsAtom = atom<SimpleCalendarDto[]>([]);
export const isBottomSheetOpenAtom = atom<boolean>(false);
