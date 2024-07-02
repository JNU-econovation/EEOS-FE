"use client";

import Title from "@/components/common/Title";
import AccessRightValidate from "@/components/common/validate/AccessRight";
import EditForm from "@/components/programEdit/EditForm";

interface ProgramEditPageProps {
  params: {
    programId: string;
  };
}

const ProgramEditPage = ({ params }: ProgramEditPageProps) => {
  const { programId } = params;

  return (
    <>
      <AccessRightValidate programId={programId} />
      <div className="space-y-12">
        <Title text="행사 수정" />
        <EditForm programId={programId} />
      </div>
    </>
  );
};

export default ProgramEditPage;
