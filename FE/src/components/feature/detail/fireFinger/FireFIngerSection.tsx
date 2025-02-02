"use client";

import Title from "@/components/common/Title/Title";
import { BlockFrame, Frame } from "@/components/icons";
import { useGetFireFinger } from "@/hooks/query/useMemberQuery";
import { useGetProgramId } from "@/hooks/usePrograms";

const FireFIngerSection = () => {
  const programId = useGetProgramId();
  const { data } = useGetFireFinger(programId);
  if (!data) return null;

  return (
    <section>
      <div className="flex items-center gap-2">
        <Title text="오늘의 얼리버드" textSize="xl" />
        <div className="-translate-y-1">
          <BlockFrame />
        </div>
      </div>
      <div className="mt-8" />

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {data.map(({ memberId, name }) => (
          <li
            key={memberId}
            className="flex select-none items-center gap-3 rounded-lg border p-4"
          >
            <Frame />
            <div>
              <p>{name}</p>
              <span className="text-sm text-gray-30">00:00</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FireFIngerSection;
