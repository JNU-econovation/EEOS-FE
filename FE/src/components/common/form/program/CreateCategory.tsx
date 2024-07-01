import { ProgramCategory } from "../../../../types/program";
import Label from "../input/Label";
import Tab from "@/components/common/tabs/Tab";
import PROGRAM from "@/constants/PROGRAM";

interface CreateCategoryProps {
  selectedCategory: ProgramCategory;
  setCategory: (v: ProgramCategory) => void;
}
const CreateCategory = ({
  selectedCategory,
  setCategory,
}: CreateCategoryProps) => {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-fit">
      <Label label="카테고리" />
      <Tab<ProgramCategory>
        options={Object.values(PROGRAM.CATEGORY_TAB)}
        selected={selectedCategory}
        onItemClick={(v) => setCategory(v)}
        size="lg"
        baseColor="gray"
        pointColor="yellow"
        align="line"
      />
    </div>
  );
};

export default CreateCategory;