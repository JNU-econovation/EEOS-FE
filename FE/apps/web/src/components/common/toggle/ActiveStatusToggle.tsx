import StatusToggleItem, { StatusToggleItemColor } from "../StatusToggleItem";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { useUpdateMemberActiveStatus } from "@/hooks/query/useMemberQuery";
import { ActiveStatus } from "@/types/member";

interface ActiveStatusToggleProps {
  memberId: number;
  selectedValue: ActiveStatus;
}
const ActiveStatusToggle = ({
  memberId,
  selectedValue,
}: ActiveStatusToggleProps) => {
  const options = Object.values(ACTIVE_STATUS.TAB_WITH_COLOR);
  const { mutate } = useUpdateMemberActiveStatus();

  const handleClick = (activeStatus: ActiveStatus) => {
    if (selectedValue === activeStatus) return;
    mutate({ memberId, activeStatus });
  };

  const getItemColor = (type: ActiveStatus, color: StatusToggleItemColor) =>
    selectedValue === type ? color : "gray";

  return (
    <div className="flex h-fit w-fit transform rounded-3xl bg-gray-10">
      {options.map(({ type, color, text }) => (
        <button key={text} onClick={() => handleClick(type)}>
          <StatusToggleItem text={text} color={getItemColor(type, color)} />
        </button>
      ))}
    </div>
  );
};

export default ActiveStatusToggle;
