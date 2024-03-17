"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { ProgramCategory } from "../../types";
import { ProgramDateInput } from "./DateInput";
import { ProgramDemandCheckBox } from "./DemandCheckBox";
import { ProgramTitleInput } from "./TitleInput";
import FormBtn from "@/components/common/form/FormBtn";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import Tab from "@/components/common/tabs/Tab";
import FORM_INFO from "@/constants/FORM_INFO";
import PROGRAM from "@/constants/PROGRAM";
import { ProgramFormData } from "@/hooks/useProgramFormData";
import { FormType } from "@/types/form";

interface ProgramFormProps extends ProgramFormData {
  formType: FormType;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProgramForm = ({
  children,
  formType,
  title,
  setTitle,
  deadLine,
  setDeadLine,
  category,
  setCategory,
  type,
  setType,
  content,
  setContent,
  reset,
  onSubmit,
}: PropsWithChildren<ProgramFormProps>) => {
  const router = useRouter();
  const isDemand = type === "demand";
  const demandCheckBoxDisabled = formType === "edit";

  const handleChangeType = () => {
    setType(isDemand ? "notification" : "demand");
  };

  const handleReset = () => {
    reset();
    router.back();
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <ProgramTitleInput
        title={title}
        setTitle={setTitle}
        prefix={isDemand && FORM_INFO.DEMAND_PREFIX}
      >
        <ProgramDemandCheckBox
          disabled={demandCheckBoxDisabled}
          isDemand={isDemand}
          onClick={() => handleChangeType()}
        />
      </ProgramTitleInput>
      <div className="flex flex-col items-end gap-8 sm:flex-row">
        <ProgramDateInput programDate={deadLine} setProgramDate={setDeadLine} />
        <div className="flex w-full flex-col gap-2 sm:w-fit">
          <label className="text-sm">행사 카테고리</label>
          <Tab<ProgramCategory>
            options={Object.values(PROGRAM.CATEGORY_TAB)}
            selected={category}
            onItemClick={(v) => setCategory(v)}
            size="lg"
            baseColor="gray"
            pointColor="yellow"
            align="line"
          />
        </div>
      </div>
      <MarkdownEditor
        id={FORM_INFO.PROGRAM.CONTENT.id}
        label={FORM_INFO.PROGRAM.CONTENT.label}
        placeholder={FORM_INFO.PROGRAM.CONTENT.placeholder}
        value={content}
        onChange={(v) => setContent(v)}
      />
      {children}
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT[formType]}
        formReset={handleReset}
      />
    </form>
  );
};

export default ProgramForm;
