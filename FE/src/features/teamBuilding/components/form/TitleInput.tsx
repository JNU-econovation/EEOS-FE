import { Dispatch, SetStateAction } from "react";
import LabeledInput from "@/components/common/form/LabeledInput";
import FORM_INFO from "@/constants/FORM_INFO";

interface TitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const TitleInput = ({ title, setTitle }: TitleInputProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <LabeledInput
      id={FORM_INFO.TEAM_BUILDING.TITLE.id}
      type={FORM_INFO.TEAM_BUILDING.TITLE.type}
      label={FORM_INFO.TEAM_BUILDING.TITLE.label}
      placeholder={FORM_INFO.TEAM_BUILDING.TITLE.placeholder}
      value={title}
      onChange={handleTitleChange}
    />
  );
};

export default TitleInput;
