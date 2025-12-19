"use client";

import { Ssgoi } from "@ssgoi/react";
import { PropsWithChildren } from "react";
import { pageTransitionConfig } from "./config";

interface ProviderProps extends PropsWithChildren {}

const SsgoiConfigWrapper = ({ children }: ProviderProps) => {
  return <Ssgoi config={pageTransitionConfig}>{children}</Ssgoi>;
};

export default SsgoiConfigWrapper;
