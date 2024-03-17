import Image from "next/image";
import { SlackLoginButton } from "./SlackLoginButton";
import Title from "@/components/common/Title";

const LeftSection = () => {
  return (
    <div className="hidden flex-col gap-28 bg-secondary-10 p-8 sm:flex">
      <div className="flex flex-col">
        <Image
          src="/black_logo.svg"
          alt="eeos 블랙 버전 로고"
          width={81}
          height={36}
        />
        <p className="text-xs font-light">에코노베이션 행사 관리 시스템</p>
      </div>
      <Image src="/saly.svg" alt="login hero" width={400} height={400} />
    </div>
  );
};

const RightSection = () => {
  return (
    <div
      id="right"
      className="flex flex-col items-center justify-center gap-24"
    >
      <Title text={"로그인"} />
      <SlackLoginButton />
    </div>
  );
};

export const Login = () => {
  return (
    <div className="grid h-[80vh] sm:h-[44rem] sm:grid-cols-[25rem_1fr] sm:shadow-lg">
      <LeftSection />
      <RightSection />
    </div>
  );
};
