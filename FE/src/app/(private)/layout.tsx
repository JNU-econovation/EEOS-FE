import { PropsWithChildren } from "react";
import useAuthValidate from "@/hooks/useAuthValidate";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  useAuthValidate();
  return <>{children}</>;
};
export default PrivateLayout;
