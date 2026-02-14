import BellIcon from "@/components/common/icons/BellIcon";
import LogoIcon from "@/components/common/icons/LogoIcon";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMainPage = () => {
  const name = "홍길동";
  return (
    <SsgoiTransition id="/main" className="min-h-screen bg-white">
      <div>
        <section className="bg-[#F2F2F7] px-6 pb-4 pt-16">
          <div className="flex items-center justify-between">
            <LogoIcon />
            <BellIcon />
          </div>
          <div className="h-6" />
          <div>
            <p className="text-base font-medium leading-5">{`${name}님 안녕하세요`}</p>
            <p className="text-base font-medium leading-5">
              오늘도 화이팅이에요!
            </p>
          </div>

          <div className="h-8" />

          <div className="flex gap-2">
            <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
              30기
            </div>
            <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
              디자이너
            </div>
            <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
              AM
            </div>
          </div>

          <div className="h-3" />
        </section>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMainPage;
