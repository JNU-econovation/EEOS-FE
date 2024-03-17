import Image from "next/image";
import Link from "next/link";
import { useDeleteProgram } from "../../apis/deleteProgram";
import { ProgramInfoDto } from "../../apis/dtos";
import TabItem from "@/components/common/tabs/TabItem";
import Title from "@/components/common/Title";
import MESSAGE from "@/constants/MESSAGE";
import PROGRAM from "@/constants/PROGRAM";
import ROUTES from "@/constants/ROUTES";
import { convertDate } from "@/utils/convert";

interface ProgramViewerHeaderProps {
  data: ProgramInfoDto;
}

const DEADLINE_TEXT = "마감기한 : ";

export const ProgramViewerHeader = ({ data }: ProgramViewerHeaderProps) => {
  const { category, title, deadLine, programId, accessRight } = data;

  const categoryText = PROGRAM.CATEGORY_TAB[category]?.text ?? "기타";

  return (
    <section className="space-y-4 border-b-2 py-4">
      <TabItem color="yellow" size="sm" text={categoryText} rounded />
      <Title text={title} />
      <div className="flex justify-between">
        <p className="sm:text-lg">{DEADLINE_TEXT + convertDate(deadLine)}</p>
        {accessRight === "edit" && (
          <EditAndDeleteButton programId={programId} />
        )}
      </div>
    </section>
  );
};

const EditAndDeleteButton = ({ programId }: { programId: number }) => {
  const { mutate: deleteProgram } = useDeleteProgram(programId);
  const handleClickDelete = () => {
    if (confirm(MESSAGE.CONFIRM.DELETE)) {
      deleteProgram();
    }
  };
  return (
    <div className="flex items-end gap-3 sm:gap-6">
      <Link href={ROUTES.EDIT(programId)}>
        <Image
          src="/icons/pencil.svg"
          alt="프로그램 수정"
          width={22}
          height={22}
          className="h-[22px] w-[22px] hover:cursor-pointer"
        />
      </Link>
      <button onClick={handleClickDelete} type="button">
        <Image
          src="/icons/trash.svg"
          alt="프로그램 삭제"
          width={22}
          height={22}
          style={{ width: 22, height: 22 }}
          className="h-[22px] w-[22px] hover:cursor-pointer"
        />
      </button>
    </div>
  );
};
