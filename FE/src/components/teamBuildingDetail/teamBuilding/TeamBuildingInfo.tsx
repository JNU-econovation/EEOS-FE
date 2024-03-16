"use client";

import TeamBuildingDetail from "./TeamBuildingDetail";
import TeamBuildingHeader from "./TeamBuildingHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGetTeamBuilding } from "@/features/teamBuilding";

const TeamBuildingInfo = () => {
  const { data: teamBuildingData, isLoading } = useGetTeamBuilding();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="space-y-8">
      <TeamBuildingHeader
        title={teamBuildingData.title}
        accessRight={teamBuildingData.accessRight}
      />
      <TeamBuildingDetail content={teamBuildingData.content} />
    </section>
  );
};

export default TeamBuildingInfo;
