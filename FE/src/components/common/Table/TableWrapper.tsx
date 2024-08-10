import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import Header from "./TableCompounds/Header";
import MemberManageList from "./TableCompounds/MemberManageList";
import SelectMemberList from "./TableCompounds/SelectedMemberList";

interface TableContextType {
  checkboxState: {
    hasCheckBox: boolean;
    isCheckedAll: boolean;
    setIsCheckedAll: (checked: boolean) => void;
  };
  columnWidths: string;
  headerItems: string[];
}

const TableContext = createContext<TableContextType>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("TableContext는 TableWrapper 내부에서 사용되어야 합니다.");
  }
  return context;
};

interface TabWrapperProps extends PropsWithChildren {
  hasCheckBox?: boolean;
  columnWidths: string[];
  headerItems: string[];
}
const TableWrapper = ({
  hasCheckBox = false,
  columnWidths,
  headerItems,
  children,
}: TabWrapperProps) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const checkboxState = {
    hasCheckBox,
    isCheckedAll,
    setIsCheckedAll,
  };

  const providerValue: TableContextType = useMemo(
    () => ({
      checkboxState,
      columnWidths: columnWidths.join("_"),
      headerItems,
    }),
    [checkboxState, columnWidths, headerItems],
  );

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
};

TableWrapper.Header = Header;
TableWrapper.MemberManageList = MemberManageList;
TableWrapper.SelectMemberList = SelectMemberList;

export default TableWrapper;
