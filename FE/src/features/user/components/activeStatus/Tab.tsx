import { useUpdateActiveStatus } from "../../apis/updateActiveStatus";
import Tab from "@/components/common/tabs/Tab";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import MESSAGE from "@/constants/MESSAGE";
import { ActiveStatus } from "@/types/member";

const UserActiveStatusTab = ({ activeStatus }) => {
  const { mutate: updateActiveStatus } = useUpdateActiveStatus();

  const handleChangeActiveStatus = (activeStatus: ActiveStatus) => {
    if (confirm(MESSAGE.CONFIRM.EDIT)) {
      updateActiveStatus(activeStatus);
    }
  };

  return (
    <Tab<ActiveStatus>
      selected={activeStatus}
      onItemClick={(activeStatus) => handleChangeActiveStatus(activeStatus)}
      options={Object.values(ACTIVE_STATUS.TAB)}
      size="lg"
      baseColor="gray"
      pointColor="teal"
      align="square"
    />
  );
};

export default UserActiveStatusTab;
