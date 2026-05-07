"use client";

import Spacing from "@/components/common/Spacing";
import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const MobileUserInfoSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { name, activeStatus } = data;

  return (
    <section className="flex flex-col gap-2 px-4">
      <div className="mx-auto h-24 w-24 rounded-full bg-white" />
      <Spacing size={18} direction="vertical" unit="px" />
      <div className="flex items-center justify-center">
        <span className="text-xl font-medium text-black">
          {name.split(" ")[1]}
        </span>
      </div>
      <div className="mx-auto flex gap-2">
        <div className="rounded-full bg-white px-2 py-1 text-sm font-medium text-black">
          {name.split(" ")[0]}
        </div>
        {/* <div className="rounded-full bg-white px-2 py-1 text-sm font-medium text-black">
          디자이너
        </div> */}
        <div className="rounded-full bg-white px-2 py-1 text-sm font-medium text-black">
          {activeStatus.toUpperCase()}
        </div>
      </div>
    </section>
  );
};

export default MobileUserInfoSection;
