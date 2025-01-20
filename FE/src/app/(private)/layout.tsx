import { PropsWithChildren } from "react";
import Header from "@/components/common/header/Header";
import AuthValidate from "@/components/common/validate/Auth";

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthValidate>
        <Header />
        <main className="my-16 w-full px-3 sm:max-w-[800px] lg:max-w-[1112px]">
          {children}
        </main>
      </AuthValidate>
    </>
  );
};
export default PrivateLayout;
