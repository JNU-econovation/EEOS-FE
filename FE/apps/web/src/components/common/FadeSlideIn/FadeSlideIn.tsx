"use client";

import classNames from "classnames";
import { PropsWithChildren, useEffect, useState } from "react";

const FadeSlideIn = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const className = classNames(
    `transform-gpu transition-opacity duration-300 ease-out`,
    {
      "opacity-100": isVisible,
      "opacity-0": !isVisible,
    },
  );

  return <div className={className}>{children}</div>;
};

export default FadeSlideIn;
