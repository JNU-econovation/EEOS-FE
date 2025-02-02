"use client";
import Title from "@/components/common/Title/Title";
import { useGetFireFinger } from "@/hooks/query/useMemberQuery";
import { useGetProgramId } from "@/hooks/usePrograms";

const FireFIngerSection = () => {
  const programId = useGetProgramId();
  const { data } = useGetFireFinger(programId);
  return (
    <section>
      <Title text="오늘의 얼리버드 🔥" textSize="xl" />

      <ul>
        {data.map(({ memberId, name }) => (
          <li key={memberId}>{name}</li>
        ))}
      </ul>
    </section>
  );
};

export default FireFIngerSection;
