import EditAndDeleteButton from "./EditAndDeleteButton";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import TabItem from "@/components/common/tabs/tab/TabItem";
import Title from "@/components/common/Title/Title";
import PROGRAM from "@/constants/PROGRAM";
import { formatTimestamp } from "@/utils/convert";

interface ProgramHeaderProps {
  data: ProgramInfoDto;
}

const DEADLINE_TEXT = "행사일정 : ";

const ProgramHeader = ({ data }: ProgramHeaderProps) => {
  const { category, title, deadLine, programId, accessRight } = data;

  const categoryText = PROGRAM.CATEGORY_TAB[category]?.text ?? "기타";

  return (
    <section className="space-y-4 border-b-2 py-4">
      <TabItem color="yellow" size="sm" text={categoryText} rounded />
      <Title text={title} />
      <div className="flex justify-between">
        <p className="sm:text-lg">
          {DEADLINE_TEXT + formatTimestamp(deadLine)}
        </p>
        {accessRight === "edit" && (
          <EditAndDeleteButton programId={programId} />
        )}
      </div>
    </section>
  );
};
export default ProgramHeader;
