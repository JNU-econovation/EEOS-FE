"use client";

import Spacing from "@/components/common/Spacing";
import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const HelloSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { name } = data;

  return (
    <section>
      <p className="text-xl font-medium leading-5 text-black">{`${
        name.split(" ")[1]
      }님 안녕하세요`}</p>
      <Spacing size={4} direction="vertical" unit="px" />
      <p className="text-xl font-medium leading-5 text-black">
        오늘도 화이팅이에요!
      </p>
    </section>
  );
};

export default HelloSection;
