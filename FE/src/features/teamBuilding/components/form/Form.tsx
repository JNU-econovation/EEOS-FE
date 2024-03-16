import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { MaxTeamSizeInput } from "./MaxTeamSizeInput";
import TitleInput from "./TitleInput";
import FormBtn from "@/components/common/form/FormBtn";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import FORM_INFO from "@/constants/FORM_INFO";
import { TeamBuildingFormData } from "@/hooks/useTeamBuildingFormData";
import { FormType } from "@/types/form";

interface TeamBuildingFormProps extends TeamBuildingFormData {
  formType: FormType;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TeamBuildingForm = ({
  children,
  formType,
  title,
  setTitle,
  content,
  setContent,
  maxTeamSize,
  setMaxTeamSize,
  reset,
  onSubmit,
}: PropsWithChildren<TeamBuildingFormProps>) => {
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.back();
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-[1fr_5rem] gap-4 sm:grid-cols-[1fr_8rem]">
        <TitleInput title={title} setTitle={setTitle} />
        <MaxTeamSizeInput
          maxTeamSize={maxTeamSize}
          setMaxTeamSize={setMaxTeamSize}
        />
      </div>
      <MarkdownEditor
        id={FORM_INFO.TEAM_BUILDING.CONTENT.id}
        label={FORM_INFO.TEAM_BUILDING.CONTENT.label}
        placeholder={FORM_INFO.TEAM_BUILDING.CONTENT.placeholder}
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

export default TeamBuildingForm;
