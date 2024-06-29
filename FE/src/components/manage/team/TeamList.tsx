import Image from "next/image";
import { deleteTeam } from "@/apis/team";

interface TeamListProps {
  teamId: number;
  teamName: string;
}

const TeamList = ({ teamId, teamName }: TeamListProps) => {
  const deleteSelectedTeam = (teamId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) deleteTeam(teamId);
    return;
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
