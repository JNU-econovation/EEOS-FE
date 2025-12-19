import { PropsWithChildren } from "react";
import SsgoiConfigWrapper from "./_router/provider";

const WebviewLayout = ({ children }: PropsWithChildren) => {
  return (
    <SsgoiConfigWrapper>
      <main className="min-h-screen w-screen">{children}</main>
    </SsgoiConfigWrapper>
  );
};
export default WebviewLayout;
