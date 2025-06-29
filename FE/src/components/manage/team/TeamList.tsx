import classNames from "classnames";
import Image from "next/image";
import { useDeleteTeam } from "@/hooks/query/useTeamQuery";
import Check from "@/components/icons/items/Check";

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
    "flex select-none justify-between rounded border px-4 py-2 shadow-sm transition-colors duration-300",
    {
      "border-success-30 bg-success-10 hover:bg-success-30/10": isSelected,
      "hover:bg-gray-10": !isSelected,
    },
  );
  return (
    <li className={classNames(listClassName, "flex items-center ")}>
      <span>{teamName}</span>
      {type === "manage" && (
        <div onClick={() => deleteSelectedTeam(teamId)}>
          <Image
            src="/icons/trash.svg"
            width={18}
            height={18}
            alt="Delete Btn"
          />
        </div>
      )}
      {type === "select" && <div className={classNames("w-5 flex items-center justify-center h-5 border-2 rounded-full", isSelected ? "border-success-30 bg-success-30" : "border-gray-300 bg-none")}>{
          isSelected && <Check className="fill-white w-3 h-3 stroke-white" />
      }</div>}
    </li>
  );
};

export default TeamList;

