import Tab from "./tab/TabCompound/TabCompound";

type MemberTabItem = "all" | "am" | "rm" | "cm" | "ob";
const memberTabItemList: MemberTabItem[] = ["all", "am", "rm", "cm", "ob"];

interface MemberActiveStatusTabProps {
  children: (selectedItem: MemberTabItem) => JSX.Element;
}
const MemberActiveStatusTab = ({ children }: MemberActiveStatusTabProps) => {
  return (
    <Tab<MemberTabItem>
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
      <Tab.Content<MemberTabItem>>
        {({ selectedItem }) => children(selectedItem)}
      </Tab.Content>
    </Tab>
  );
};

export default MemberActiveStatusTab;
