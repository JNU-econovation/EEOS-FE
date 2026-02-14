"use client";

import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const HelloSection = () => {
  const { data, isLoading, isError } = useGetMyActiveStatus();

  if (!data || isLoading || isError) return null;

  const { name } = data;

  return (
    <section>
      <p className="text-base font-medium leading-5">{`${
        name.split(" ")[1]
      }님 안녕하세요`}</p>
      <p className="text-base font-medium leading-5">오늘도 화이팅이에요!</p>
    </section>
  );
};

export default HelloSection;
