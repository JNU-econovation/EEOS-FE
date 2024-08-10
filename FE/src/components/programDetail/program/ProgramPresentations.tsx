"use client";

import Image from "next/image";
import Link from "next/link";
import Title from "@/components/common/Title";
import usePresentations from "@/hooks/query/usePresentations";

interface ProgramPresentationsProps {
  programId: number;
}
const ProgramPresentations = ({ programId }: ProgramPresentationsProps) => {
  const {
    data: presentations,
    isLoading,
    isError,
  } = usePresentations(programId);

  if (isError) return null;

  if (isLoading) return null;
  if (!presentations) return null;
  if (presentations.length === 0) return null;
  return (
    <section>
      <Title text="발표자료 " />
      {/* TODO: 로더 적용하기 */}
      {isLoading && <div>로딩중...</div>}
      <div className="mx-auto mt-8 grid w-fit gap-x-40 gap-y-8 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {presentations &&
          presentations.map(({ download_url, name }) => (
            <Link
              key={name}
              className="flex gap-4"
              href={download_url}
              target="_blank"
            >
              <Image
                src="/icons/folder.svg"
                width={20}
                height={20}
                alt="folder"
              />
              {name}
            </Link>
          ))}
      </div>
    </section>
  );
};

export default ProgramPresentations;
