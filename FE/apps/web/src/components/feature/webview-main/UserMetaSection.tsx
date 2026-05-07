"use client";

import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const UserMetaSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { name, activeStatus } = data;

  return (
    <section className="flex gap-2">
      <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
        {name.split(" ")[0]}
      </div>
      {/* <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
        디자이너
      </div> */}
      <div className="rounded-full bg-white px-2  py-1 text-sm  font-medium">
        {activeStatus.toUpperCase()}
      </div>
    </section>
  );
};

export default UserMetaSection;
