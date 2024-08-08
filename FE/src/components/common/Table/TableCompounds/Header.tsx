import classNames from "classnames";
import CheckBox from "../../CheckBox";
import { useTableContext } from "../TableWrapper";

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
    if (checked) {

    }
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

export default Header;
