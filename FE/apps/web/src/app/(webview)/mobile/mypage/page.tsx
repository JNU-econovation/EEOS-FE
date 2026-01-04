"use client";

import AttendanceBadge from "@/components/mypage/AttendanceBadge";
import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";
import { SsgoiTransition } from "@ssgoi/react";
import Link from "next/link";

const WebviewMypage = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { activeStatus, name } = data;

  return (
    <SsgoiTransition id="/mypage" className="min-h-screen bg-white">
      {/* <UserInfoSection /> */}
      <div className="flex h-screen flex-col px-4">
        <div className="mt-8" />
        <section className="flex flex-col gap-2 px-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">{name}</span>
            <div className="rounded-xl border border-tertiary-20 bg-secondary-20 px-4 py-1.5 text-sm font-bold text-tertiary-20">
              {activeStatus.toUpperCase()}
            </div>
          </div>
          <span className="text-xs font-light opacity-70">
            활동 상태 변경은 관리자에게 요청해주세요!
          </span>
        </section>
        <div className="mt-8" />
        <section className="flex h-16 grow flex-col rounded-t-xl bg-gray-10 px-4 pt-4">
          <div className="flex w-full grow items-end gap-2">
            <p className="min-w-20 truncate text-xl font-semibold">출결 현황</p>
            <p className="text-sm opacity-75">참석 5회 | 지각 3회 | 불참 2회</p>
          </div>

          {/*  */}
          <div className="mt-4" />
          <ul className="flex grow flex-col gap-2 overflow-y-auto">
            <Link href="/mobile/program/94">
              <li>
                <div className="rounded-xl border bg-white p-4">
                  <p className="text-sm font-semibold">진행중</p>
                  <p className="text-lg font-semibold">
                    2024-2 B팀 2차 주간발표
                  </p>
                </div>
              </li>
            </Link>
            {Array.from({ length: 15 }).map((_, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between gap-1 rounded-xl border bg-gray-20 p-4 opacity-50"
              >
                <div>
                  <p className="text-xs font-semibold">진행중</p>
                  <p className="font-semibold">2024-2 B팀 2차 주간발표</p>
                </div>
                <div className="truncate !text-sm">
                  <AttendanceBadge attendStatus="absent" programId={94} />
                </div>
              </li>
            ))}
            <div className="mt-4" />
          </ul>
        </section>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMypage;
