import Image from "next/image";
import { useDeleteTeam } from "@/hooks/query/useTeamQuery";

interface TeamListProps {
  teamId: number;
  teamName: string;
}

const TeamList = ({ teamId, teamName }: TeamListProps) => {
  const { mutate: deleteTeam } = useDeleteTeam(teamId);
  const deleteSelectedTeam = (teamId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) deleteTeam(teamId);
  };
  return (
    <li className="flex justify-between rounded border-2 px-4 py-2 shadow-sm">
      <span>{teamName}</span>
      <button onClick={() => deleteSelectedTeam(teamId)}>
        <Image src="/icons/trash.svg" width={22} height={22} alt="Delete Btn" />
      </button>
    </li>
  );
};

export default TeamList;
