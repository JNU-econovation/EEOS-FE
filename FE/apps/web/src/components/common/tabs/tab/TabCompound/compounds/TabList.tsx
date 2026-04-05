import classNames from "classnames";
import { PropsWithChildren } from "react";
import { tabAlign, useTab } from "../TabCompound";

interface TabListProps extends PropsWithChildren {
  className?: string;
}

const TabList = ({ children, className }: TabListProps) => {
  const { align } = useTab<string>();

  const tabStyle = classNames(
    tabAlign[align],
    className,
    "w-full overflow-x-scroll scrollbar-hide",
  );

  return <div className={tabStyle}>{children}</div>;
};

export default TabList;
