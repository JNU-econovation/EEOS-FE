import classNames from "classnames";
import Image from "next/image";
import { useDeleteTeam } from "@/hooks/query/useTeamQuery";

interface TeamListProps {
  type?: "select" | "manage";
  teamId: number;
  teamName: string;
  isSelected?: boolean;
}

const TeamList = ({
  teamId,
  teamName,
  isSelected = false,
  type = "manage",
}: TeamListProps) => {
  const { mutate: deleteTeam } = useDeleteTeam(teamId);
  const deleteSelectedTeam = (teamId: number) => {
    const ok = confirm("정말로 삭제하시겠습니까?");
    if (ok) deleteTeam(teamId);
  };

  const listClassName = classNames(
    "flex select-none justify-between rounded border-2 px-4 py-2 shadow-sm",
    {
      "bg-success-10": isSelected,
    },
  );
  return (
    <li className={listClassName}>
      <span>{teamName}</span>
      {type == "manage" && (
        <div onClick={() => deleteSelectedTeam(teamId)}>
          <Image
            src="/icons/trash.svg"
            width={22}
            height={22}
            alt="Delete Btn"
          />
        </div>
      )}
      {isSelected ? (
        <Image
          src="/icons/non_select.svg"
          width={22}
          height={22}
          alt="Delete Btn"
        />
      ) : (
        <Image
          src="/icons/select.svg"
          width={22}
          height={22}
          alt="Delete Btn"
        />
      )}
    </li>
  );
};

export default TeamList;
