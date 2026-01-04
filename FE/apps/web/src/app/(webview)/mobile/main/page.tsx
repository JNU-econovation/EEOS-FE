import { SsgoiTransition } from "@ssgoi/react";
import Link from "next/link";

const WebviewMainPage = () => {
  return (
    <SsgoiTransition id="/main" className="min-h-screen bg-white">
      <div className="flex h-72 gap-3 p-4">
        <Link
          href="/mobile/programs"
          className="grow rounded-lg border bg-teal-500 p-4"
        >
          <p className="text-2xl font-semibold text-white">행사 목록</p>
          <span className="justify-start text-sm font-normal text-white">
            전체 행사 보기
          </span>
        </Link>
        <div className="flex grow flex-col gap-3 rounded-lg">
          <Link
            href="/mobile/mypage"
            className="grow rounded-lg border bg-gray-200 p-4"
          >
            <p className="text-2xl font-semibold">마이페이지</p>
            <span className="justify-start text-sm font-normal">
              전체 행사 보기
            </span>
          </Link>
          <Link
            href="/mobile/calendar"
            className="grow rounded-lg border bg-gray-200 p-4"
          >
            <p className="text-xl font-semibold">캘린더</p>
            <span className="justify-start text-sm font-normal">
              전체 행사 보기
            </span>
          </Link>
        </div>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMainPage;
