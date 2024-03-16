import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import LabeledInput from "@/components/common/form/LabeledInput";
import FORM_INFO from "@/constants/FORM_INFO";

interface MaxTeamSizeInputProps {
  maxTeamSize: number;
  setMaxTeamSize: Dispatch<SetStateAction<number>>;
}

export const MaxTeamSizeInput = ({
  maxTeamSize,
  setMaxTeamSize,
}: MaxTeamSizeInputProps) => {
  const handleMaxTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) <= 0) {
      return;
    }
    if (parseInt(e.target.value) > 100) {
      toast.error("최대 팀원 수는 100명을 넘을 수 없습니다.");
      setMaxTeamSize(100);
      return;
    }
    setMaxTeamSize(parseInt(e.target.value));
  };

  return (
    <LabeledInput
      id={FORM_INFO.TEAM_BUILDING.MAX_TEAM_SIZE.id}
      type={FORM_INFO.TEAM_BUILDING.MAX_TEAM_SIZE.type}
      label={FORM_INFO.TEAM_BUILDING.MAX_TEAM_SIZE.label}
      placeholder={FORM_INFO.TEAM_BUILDING.MAX_TEAM_SIZE.placeholder}
      value={maxTeamSize}
      onChange={handleMaxTeamSizeChange}
    />
  );
};
