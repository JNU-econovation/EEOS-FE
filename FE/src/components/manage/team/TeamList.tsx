interface TeamListProps {
  teamName: string;
}

const TeamList = ({ teamName }: TeamListProps) => {
  return (
    <li className="flex justify-between rounded border-2 px-4 py-2 shadow-sm">
      <span>{teamName}</span>
      <span className="cursor-pointer">x</span>
    </li>
  );
};

export default TeamList;
