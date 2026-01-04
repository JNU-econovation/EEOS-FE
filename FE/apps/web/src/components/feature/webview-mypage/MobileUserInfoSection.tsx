"use client";

import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const MobileUserInfoSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { activeStatus, name } = data;

  return (
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
  );
};

export default MobileUserInfoSection;
