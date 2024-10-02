"use client";

import ProgressDisplay from "@/components/common/ProgressDisplay";
import Title from "@/components/common/Title/Title";
import {
  useCompleteTeamBuildingMutation,
  useDeleteTeamBuildingMutation,
} from "@/hooks/query/useTeamBuildingQuery";
import { AccessRight } from "@/types/program";

interface TeamBuildingHeaderProps {
  title: string;
  accessRight: AccessRight;
}

const TeamBuildingHeader = ({
  title,
  accessRight,
}: TeamBuildingHeaderProps) => {
  return (
    <section className="flex justify-between border-b-2 py-4">
      <Title text={title} />
      <div className="flex gap-6">
        {accessRight === "read_only" && (
          <ProgressDisplay progressText="진행중" color="action" />
        )}
        {accessRight === "edit" && <CloseBtn />}
      </div>
    </section>
  );
};

const CloseBtn = () => {
  const { mutate: completeTeamBuilding } = useCompleteTeamBuildingMutation();
  const { mutate: deleteTeamBuilding } = useDeleteTeamBuildingMutation();

  const handleCompleteButtonClick = () => {
    if (confirm("팀빌딩을 완료하시겠습니까?")) {
      completeTeamBuilding();
    }
  };

  const handleDeleteButtonClick = () => {
    if (confirm("팀빌딩을 삭제하시겠습니까?")) {
      deleteTeamBuilding();
    }
  };

  return (
    <>
      <button
        className="text-lg font-bold text-gray-30 transition-colors duration-300 hover:text-stroke-30"
        onClick={handleCompleteButtonClick}
      >
        완료하기
      </button>
      <button
        className="text-lg font-bold text-gray-30 transition-colors duration-300 hover:text-error"
        onClick={handleDeleteButtonClick}
      >
        삭제하기
      </button>
    </>
  );
};

export default TeamBuildingHeader;
