import { StatusToggleItemColor } from "@/components/common/StatusToggleItem";
import { ActiveStatus, ActiveStatusWithAll } from "@/types/member";
import { TabOption } from "@/types/tab";

type ActiveStatusTab = {
  [key in ActiveStatus]: TabOption<ActiveStatus>;
};
type ActiveStatusWithAllTab = {
  [key in ActiveStatusWithAll]: TabOption<ActiveStatusWithAll>;
};
type ActiveStatusWithColorTab = {
  [key in ActiveStatus]: TabOption<ActiveStatus> & {
    color: StatusToggleItemColor;
  };
};

const TAB: ActiveStatusTab = {
  am: { type: "am", text: "AM" },
  rm: { type: "rm", text: "RM" },
  cm: { type: "cm", text: "CM" },
  ob: { type: "ob", text: "OB" },
};

const TAB_WITH_ALL: ActiveStatusWithAllTab = {
  all: { type: "all", text: "All" },
  ...TAB,
};

const TAB_WITH_COLOR: ActiveStatusWithColorTab = {
  am: { type: "am", text: "AM", color: "green" },
  rm: { type: "rm", text: "RM", color: "yellow" },
  cm: { type: "cm", text: "CM", color: "red" },
  ob: { type: "ob", text: "OB", color: "teal" },
};

Object.freeze(TAB);
Object.freeze(TAB_WITH_ALL);
Object.freeze(TAB_WITH_COLOR);

export default { TAB, TAB_WITH_ALL, TAB_WITH_COLOR };
