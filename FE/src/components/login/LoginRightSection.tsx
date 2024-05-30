"use client";
import Image from "next/image";
import Link from "../common/Link";
import Title from "../common/Title";
import LoginSection from "./LoginSection";
const LoginRightSection = () => {
  return (
    <div
      id="right"
      className="flex flex-col items-center justify-center gap-24"
    >
      <Title text={"로그인"} />
      <div className="flex flex-col gap-6">
        <LoginSection title="에코노베이션 슬랙으로 로그인">
          <LoginSection.SlackLoginButton />
        </LoginSection>
        <LoginSection title="게스트모드로 EEOS 둘러보기">
          <LoginSection.GuestLoginButton />
        </LoginSection>
        <Link href={"/admin/login"}>
          관리자 로그인
          <Image
            src="/icons/arrowRight.svg"
            width={20}
            height={20}
            alt="arrow right to go admin login page"
          />
        </Link>
      </div>
    </div>
  );
};
export default LoginRightSection;
