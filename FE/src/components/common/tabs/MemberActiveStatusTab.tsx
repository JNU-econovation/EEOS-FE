import Tab from "./tab/TabCompound/TabCompound";
import { ActiveStatusWithAll } from "@/types/member";

const memberTabItemList: ActiveStatusWithAll[] = [
  "all",
  "am",
  "rm",
  "cm",
  "ob",
];

interface MemberActiveStatusTabProps {
  children: (selectedItem: ActiveStatusWithAll) => JSX.Element;
}
const MemberActiveStatusTab = ({ children }: MemberActiveStatusTabProps) => {
  return (
    <Tab<ActiveStatusWithAll>
      align="line"
      defaultSelected={memberTabItemList[0]}
      nonPickedColor="gray"
      pickedColor="teal"
      tabItemList={memberTabItemList}
      tabSize="lg"
    >
      <Tab.List>
        {memberTabItemList.map((tabItem) => (
          <Tab.Item key={tabItem} text={tabItem} />
        ))}
      </Tab.List>
      <Tab.Content<ActiveStatusWithAll>>
        {({ selectedItem }) => children(selectedItem)}
      </Tab.Content>
    </Tab>
  );
};

export default MemberActiveStatusTab;
