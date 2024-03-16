import { TeamBuildingDetailInfoHeader } from "./InfoHeader";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { useGetTeamBuilding } from "@/features/teamBuilding";

export const TeamBuildingDetailInfo = () => {
  const { data: teamBuildingData, isLoading } = useGetTeamBuilding();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="space-y-8">
      <TeamBuildingDetailInfoHeader
        title={teamBuildingData.title}
        accessRight={teamBuildingData.accessRight}
      />
      <MarkdownViewer value={teamBuildingData.content} />
    </section>
  );
};
