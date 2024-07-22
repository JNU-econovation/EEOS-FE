import classNames from "classnames";
import Image from "next/image";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import CheckBox from "@/components/common/CheckBox";
import ActiveStatusToggle from "@/components/common/toggle/ActiveStatusToggle";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { useDeleteMember } from "@/hooks/query/useMemberQuery";

interface TableContextType {
  checkboxState: {
    hasCheckBox: boolean;
    checked: boolean;
    setChecked: (checked: boolean) => void;
  };
  headerStyle: string;
  headerItems: string[];
}

const TableContext = createContext<TableContextType>(null);

const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("TableContext must be used within TableWrapper");
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
  const [checked, setChecked] = useState(false);
  const headerStyle = columnWidths.join("_");

  const checkboxState = {
    hasCheckBox,
    checked,
    setChecked,
  };

  const providerValue: TableContextType = useMemo(
    () => ({
      checkboxState,
      headerStyle,
      headerItems,
    }),
    [checkboxState, headerStyle, headerItems],
  );

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
};

const Header = () => {
  const {
    headerItems,
    headerStyle,
    checkboxState: { hasCheckBox, checked, setChecked },
  } = useTableContext();

  const headerGridStyle = `grid-cols-[${headerStyle}]`;
  const HeaderStyle = classNames(
    "grid w-fit  justify-items-center gap-4 border-y-2 border-stroke-10 bg-gray-10 px-10 py-4 font-bold sm:w-full",
    headerGridStyle,
  );

  const handleClickCheckBox = () => {
    // onClickCheckBox(!checked);
    setChecked(!checked);
  };

  return (
    <div className={HeaderStyle}>
      {hasCheckBox && (
        <CheckBox checked={checked} onClick={handleClickCheckBox} />
      )}
      {headerItems.map((text: string, index: number) => (
        <span key={`${index}-${text}`}>{text}</span>
      ))}
    </div>
  );
};

interface ListProps {
  memberList: MemberActiveStatusInfoDto[];
}
const List = ({ memberList }: ListProps) => {
  const { mutate: deleteMember } = useDeleteMember();

  const handleDeleteMember = (memberId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    ok && deleteMember({ memberId });
  };

  //TODO: queryClient로직은 훅에서 처리하도록 변경
  // queryClient.setQueryData(
  //   ["memberIdList"],
  //   memberList.map((v) => v.memberId),
  // );

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[7rem_7.25rem_1fr_10rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
          <div className="flex w-full items-center justify-end">
            <ActiveStatusToggle
              memberId={memberId}
              selectedValue={activeStatus}
            />
          </div>
          <button onClick={() => handleDeleteMember(memberId)}>
            <Image
              src="/icons/trash.svg"
              width={22}
              height={22}
              alt="Delete Btn"
            />
          </button>
        </div>
      ))}
    </>
  );
};

TableWrapper.Header = Header;
TableWrapper.List = List;
export default TableWrapper;
