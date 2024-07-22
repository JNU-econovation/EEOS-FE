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
import { Members } from "@/hooks/useMemberForm";

interface TableContextType {
  checkboxState: {
    hasCheckBox: boolean;
    checked: boolean;
    setChecked: (checked: boolean) => void;
  };
  columnWidths: string;
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

  const checkboxState = {
    hasCheckBox,
    checked,
    setChecked,
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

const Header = () => {
  const {
    headerItems,
    columnWidths,
    checkboxState: { hasCheckBox, checked, setChecked },
  } = useTableContext();

  const headerGridStyle = `grid-cols-[${columnWidths}]`;
  const headerStyle = classNames(
    "grid w-fit  justify-items-center gap-4 border-y-2 border-stroke-10 bg-gray-10 px-10 py-4 font-bold sm:w-full",
    headerGridStyle,
  );

  const handleClickCheckBox = () => {
    // onClickCheckBox(!checked);
    setChecked(!checked);
  };

  return (
    <div className={headerStyle}>
      {hasCheckBox && (
        <CheckBox checked={checked} onClick={handleClickCheckBox} />
      )}
      {headerItems.map((text: string, index: number) => (
        <span key={`${index}-${text}`}>{text}</span>
      ))}
    </div>
  );
};

interface MemberManageListProps {
  memberList: MemberActiveStatusInfoDto[];
}
const MemberManageList = ({ memberList }: MemberManageListProps) => {
  const { columnWidths } = useTableContext();
  const { mutate: deleteMember } = useDeleteMember();

  const handleDeleteMember = (memberId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    ok && deleteMember({ memberId });
  };

  const listGridStyle = `grid-cols-[${columnWidths}]`;
  const listColumnStyle = classNames(
    "grid h-20 w-fit items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full",
    listGridStyle,
  );

  //TODO: queryClient로직은 훅에서 처리하도록 변경
  // queryClient.setQueryData(
  //   ["memberIdList"],
  //   memberList.map((v) => v.memberId),
  // );

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div className={listColumnStyle} key={memberId}>
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

interface ListInCreateTypeProps {
  members: Set<number> | Map<number, Members>;
  setMembers: (memberId: number) => void;
  memberList: MemberActiveStatusInfoDto[];
}
const SelectMemberList = ({
  members,
  setMembers,
  memberList,
}: ListInCreateTypeProps) => {
  const {
    checkboxState: { setChecked },
  } = useTableContext();

  const isCheckedAll = memberList
    .map((v) => v.memberId)
    .every((v) => members.has(v));
  setChecked(isCheckedAll);

  const handleCheck = (memberId) => {
    setMembers(memberId);
  };

  return (
    <>
      {memberList.map(({ activeStatus, memberId, name }) => (
        <div
          className="grid h-20 w-fit grid-cols-[4.75rem_7rem_7.25rem_1fr_20.5rem] items-center justify-items-center gap-4 border-b-2 border-stroke-10 bg-background px-10 sm:w-full"
          key={memberId}
        >
          <CheckBox
            checked={members.has(memberId)}
            onClick={() => handleCheck(memberId)}
          />
          <span>{ACTIVE_STATUS.TAB[activeStatus]?.text ?? "."}</span>
          <span className="font-bold">{name}</span>
        </div>
      ))}
    </>
  );
};

TableWrapper.Header = Header;
TableWrapper.MemberManageList = MemberManageList;
TableWrapper.SelectMemberList = SelectMemberList;
export default TableWrapper;
