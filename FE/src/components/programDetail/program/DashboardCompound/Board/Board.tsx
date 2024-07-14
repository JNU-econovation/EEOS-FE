import { useContext } from "react";
import { DashboardContext } from "../DashboardWrapper";
import Chat from "./Chat";
import { useGetQuestion } from "@/hooks/query/useQuestion";

const Board = () => {
  const {
    teamValues: { selectedTeamId },
    programValue: { programId },
  } = useContext(DashboardContext);
  const { data, isLoading } = useGetQuestion(programId, selectedTeamId);

  // TODO: Loader 적용, 에러 처리
  if (isLoading) return <div>Loading...</div>;

  const { comments } = data;

  return (
    <div className="flex max-h-[36rem] w-full flex-col overflow-hidden overflow-y-auto rounded-sm border">
      {comments.map((props) => (
        <Chat key={props.commentId} {...props} />
      ))}
    </div>
  );
};

export default Board;
