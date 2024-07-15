import { useContext } from "react";
import { DashboardContext } from "../DashboardWrapper";
import Chat from "./Chat";
import { useGetQuestion } from "@/hooks/query/useQuestion";

interface BoardProps {
  isGuest?: boolean;
}
const Board = ({ isGuest = false }: BoardProps) => {
  const {
    teamValues: { selectedTeamId },
    programValue: { programId },
  } = useContext(DashboardContext);
  const { data, isLoading, error } = useGetQuestion(programId, selectedTeamId);

  // TODO: Loader 적용, 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { comments } = data;

  return (
    <div className="flex max-h-[36rem] w-full flex-col overflow-hidden overflow-y-auto rounded-sm border">
      {comments.map((props) => (
        <Chat key={props.commentId} isGuest={isGuest} {...props} />
      ))}
    </div>
  );
};

export default Board;
