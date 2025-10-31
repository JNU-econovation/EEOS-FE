import classNames from "classnames";

export type StatusToggleItemColor = keyof typeof badgeColors;
interface StatusToggleItemProps {
  text: string;
  color: keyof typeof badgeColors;
}

export const badgeColors = {
  green: "bg-success-10 text-success-30 border-success-30",
  yellow: "bg-warning-10 text-warning-30 border-warning-30",
  red: "bg-action-10 text-action-20 border-action-20",
  gray: "bg-gray-10 text-gray-30 border-gray-10",
  teal: "bg-secondary-20 text-tertiary-20 border-tertiary-20",
};
/**
 * 해당하는 색상 타입은 전부 badgeColors에 정의되어 있어야 합니다.
 * 해당 버튼에 사용되는 모든 색상에 대한 책임은 badgeColors에 있습니다.
 * 색상 변경 혹은 추가시 badgeColors에 새로운 색상을 추가해주세요.
 */
const StatusToggleItem = ({ text, color = "gray" }: StatusToggleItemProps) => {
  const badgeStyle = classNames(
    "flex h-fit w-fit transform cursor-pointer items-center justify-center rounded-3xl border-2 px-8 py-2 font-bold duration-200",
    badgeColors[color],
  );

  return (
    <div className={badgeStyle} role="button">
      <span>{text}</span>
    </div>
  );
};
export default StatusToggleItem;
