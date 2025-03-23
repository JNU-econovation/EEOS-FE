"use client";

import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const UserInfoSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold">{data.name}</span>
        <div className="rounded-xl border border-tertiary-20 bg-secondary-20 px-6 py-2 font-bold text-tertiary-20">
          {data.activeStatus.toUpperCase()}
        </div>
      </div>
      <span className="text-lg font-light">
        활동 상태 변경은 관리자에게 요청해주세요!
      </span>
    </section>
  );
};

export default UserInfoSection;
