import classNames from "classnames";

const colors = {
  background: {
    green: "bg-success-10",
    yellow: "bg-warning-10",
    red: "bg-action-10",
    gray: "bg-gray-10",
  },
  text: {
    green: "text-success-30",
    yellow: "text-warning-30",
    red: "text-action-20",
    gray: "text-gray-30",
  },
};

interface NumberBadgeProps {
  color: keyof typeof colors.background;
  number: number;
}

const NumberBadge = ({ color, number }: NumberBadgeProps) => {
  const backgroundColor = colors.background[color];
  const textColor = colors.text[color];

  const badgeStyle = classNames("rounded-full", "px-2 py-0.5", backgroundColor);
  const textStyle = classNames("text-xs", textColor);

  return (
    <div className={badgeStyle}>
      <p className={textStyle}>{number}</p>
    </div>
  );
};

export default NumberBadge;
