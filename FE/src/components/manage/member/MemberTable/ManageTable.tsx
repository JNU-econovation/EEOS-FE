import Header from "./Header/Header";
import List from "./List/List";
import { ActiveStatusWithAll } from "@/types/member";

interface TableProps {
  selectedItem: ActiveStatusWithAll;
}
const ManageTable = ({ selectedItem }: TableProps) => {
  return (
    <>
      <Header formType="manage" />
      <List selectedItem={selectedItem} />
    </>
  );
};

export default ManageTable;
