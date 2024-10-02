import { StatusToggleItemColor } from "@/components/common/StatusToggleItem";
import { AttendStatus } from "@/types/member";
import { TabOption } from "@/types/tab";

export interface AttendStatusToggleOption extends TabOption<AttendStatus> {
  color: StatusToggleItemColor;
}
type AttendStatusToggle = {
  [key in Exclude<
    AttendStatus,
    "nonRelated" | "nonResponse"
  >]: AttendStatusToggleOption;
};

type AttendStatusList = {
  [key in Exclude<AttendStatus, "nonRelated">]: TabOption<AttendStatus> & {
    icon: string;
    color: string;
  };
};

type AttendStatusUser = {
  [key in AttendStatus]: TabOption<AttendStatus> & {
    color: StatusToggleItemColor;
    demand_text?: string;
  };
};

const TOGGLE: AttendStatusToggle = {
  attend: { type: "attend", text: "참석", color: "green" },
  absent: { type: "absent", text: "불참", color: "red" },
  late: { type: "late", text: "지각", color: "yellow" },
};

const LIST: AttendStatusList = {
  attend: {
    type: "attend",
    text: "참석",
    icon: "/icons/check.svg",
    color: "green",
  },
  absent: {
    type: "absent",
    text: "불참",
    icon: "/icons/x.svg",
    color: "red",
  },
  late: {
    type: "late",
    text: "지각",
    icon: "/icons/clock.svg",
    color: "yellow",
  },
  nonResponse: {
    type: "nonResponse",
    text: "미응답",
    icon: "/icons/minus.svg",
    color: "gray",
  },
};

const USER: AttendStatusUser = {
  attend: {
    type: "attend",
    text: "참석",
    demand_text: "종료된 행사는 출석 상태를 변경할 수 없습니다.",
    color: "green",
  },
  absent: {
    type: "absent",
    text: "불참",
    demand_text: "종료된 행사는 출석 상태를 변경할 수 없습니다.",
    color: "red",
  },
  late: {
    type: "late",
    text: "지각",
    demand_text: "종료된 행사는 출석 상태를 변경할 수 없습니다.",
    color: "yellow",
  },
  nonResponse: {
    type: "nonResponse",
    text: "출석체크 해주세요!",
    demand_text: "수요조사 해주세요!",
    color: "teal",
  },
  nonRelated: {
    type: "nonRelated",
    text: "본 행사와 관련 없음",
    color: "gray",
  },
};

const LABEL = {
  EDITABLE: "출석 하시겠습니까?",
  NON_RELATED: "출석 상태를 변경할 수 없습니다.",
  INACTIVE: "종료된 행사는 출석 상태를 변경할 수 없습니다.",
  ALREADY_ATTENDED: "출석은 한 번만 가능합니다.",
};

Object.freeze(TOGGLE);
Object.freeze(LIST);
Object.freeze(USER);
Object.freeze(LABEL);

export default { TOGGLE, LIST, USER, LABEL };
