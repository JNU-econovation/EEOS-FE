"use client";
//FIXME: 하위 호환성을 위해 만들어진 컴포넌트로, 타 컴포넌트와의 의존성을 줄이는 방식으로 리팩토링이 필요

import MemberTableWrapper from "./MemberTableWrapper";
import { Members } from "@/components/programEdit/ProgramEditForm";
import { FormType } from "@/types/form";
import { AttendStatus } from "@/types/member";

interface MemberTableProps {
  formType: FormType;
  members: Set<number> | Map<number, Members>;
  setMembers:
    | ((memberId: number) => void)
    | ((memberId: number, before: AttendStatus, after: AttendStatus) => void);
  onClickHeaderCheckBox?: (selected: boolean) => void;
  programId?: number;
  isEditable?: boolean;
}

const MemberTable = ({
  formType,
  members,
  setMembers,
  onClickHeaderCheckBox = () => {},
  programId,
  isEditable = true,
}: MemberTableProps) => {
  return (
    <MemberTableWrapper applyLayout>
      <MemberTableWrapper.StatusTab />
      <div className="overflow-x-scroll scrollbar-hide">
        <MemberTableWrapper.Header
          formType={formType}
          onClickCheckBox={onClickHeaderCheckBox}
        />
        {formType === "create" && (
          <MemberTableWrapper.CreateList
            members={members}
            setMembers={setMembers as (memberId: number) => void}
          />
        )}
        {formType === "edit" && (
          <MemberTableWrapper.EditList
            programId={programId}
            setMembers={setMembers}
            isEditable={isEditable}
          />
        )}
      </div>
    </MemberTableWrapper>
  );
};

export default MemberTable;
