import classNames from "classnames";
import { useEffect } from "react";
import CheckBox from "../../CheckBox/CheckBox";
import { useTableContext } from "../TableWrapper";

interface HeaderProps {
  handleSetCheckBox?: () => void;
  handleResetCheckBox?: () => void;
  isChecked?: boolean;
}
const Header = ({
  isChecked,
  handleSetCheckBox,
  handleResetCheckBox,
}: HeaderProps) => {
  const {
    headerItems,
    columnWidths,
    checkboxState: { hasCheckBox, isCheckedAll, setIsCheckedAll },
  } = useTableContext();

  const headerStyle = classNames(
    "grid w-fit justify-items-center gap-4 border-y-2 border-stroke-10 bg-gray-10 px-10 py-4 font-bold sm:w-full",
  );

  useEffect(() => {
    setIsCheckedAll(isChecked);
  }, [isChecked]);

  const handleClickCheckBox = () => {
    if (isCheckedAll) handleResetCheckBox();
    else handleSetCheckBox();

    setIsCheckedAll(!isCheckedAll);
  };

  return (
    <div
      className={headerStyle}
      style={{ gridTemplateColumns: columnWidths.replace(/_/g, " ") }}
    >
      {hasCheckBox && (
        <CheckBox
          checked={isCheckedAll || isChecked}
          onClick={handleClickCheckBox}
        />
      )}
      {headerItems.map((text: string, index: number) => (
        <span key={`${index}-${text}`}>{text}</span>
      ))}
    </div>
  );
};

export default Header;
