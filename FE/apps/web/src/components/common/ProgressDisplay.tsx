import classNames from "classnames";

const colorCandidate = {
  success: "success-30",
  action: "action-20",
};

interface ProgressDisplayProps {
  progressText: string;
  color?: keyof typeof colorCandidate;
}

const ProgressDisplay = ({ progressText, color }: ProgressDisplayProps) => {
  const bgColor = "bg-" + colorCandidate[color];
  const textColor = "text-" + colorCandidate[color];
  return (
    <div className="flex shrink-0 items-center gap-3">
      <span className="relative flex h-3 w-3">
        <div
          className={classNames(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-40",
            bgColor,
          )}
        />
        <div
          className={classNames(
            "relative inline-flex h-3 w-3 rounded-full",
            bgColor,
          )}
        />
      </span>
      <p className={classNames("text text-lg font-bold", textColor)}>
        {progressText}
      </p>
    </div>
  );
};
export default ProgressDisplay;
