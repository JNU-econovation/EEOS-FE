//TODO: 겹치는 ui 부분 분리하기 =>
//TODO: 결국 겹치는 비지니스 로직을 반복하기 위해서 패턴 쓴건데 이를 분리해서 재사용할 수 있게 만들어야함

import { useContext, useState } from "react";
import { DashboardContext } from "../DashboardWrapper";
import ReplyChat from "./ReplyChat";
import { Comment } from "@/apis/dtos/question.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";

const Chat = ({
  commentId,
  content,
  writer,
  time,
  answers,
  accessRight,
}: Comment) => {
  const {
    commentValues: {
      create: { setParentsCommentId, changeSelectedCommentContent },
      update: { updateComment, isSuccess },
    },
  } = useContext(DashboardContext);

  const [userInputToModify, setUserInputToModify] = useState(content);
  const [isModify, setIsModify] = useState(false);

  const handleReply = () => {
    setParentsCommentId(commentId);
    changeSelectedCommentContent(content);
  };

  const handleUpdateComment = () => {
    if (isModify) {
      const newContents = userInputToModify;

      if (!newContents) return;
      if (content === newContents) {
        setIsModify((prev) => !prev);
        return;
      }

      updateComment({ commentId, contents: newContents });
      isSuccess && setUserInputToModify(newContents);
    }
    setIsModify((prev) => !prev);
  };

  return (
    <div className="border p-4">
      <div className="relative my-4 h-2 w-fit translate-y-4 bg-emerald-300">
        <p className="w-fit -translate-y-4 text-lg font-semibold">{writer}</p>
      </div>
      <div>{!isModify && <MarkdownViewer value={content} />}</div>
      {isModify && (
        <textarea
          className="mt-4 h-40 w-full rounded-sm border-2 p-4 text-lg"
          value={userInputToModify}
          onChange={(e) => setUserInputToModify(e.target.value)}
        />
      )}
      <div className="mt-4 flex items-center gap-4">
        <span className="opacity-60">{time}</span>
        <button
          className="opacity-60 transition-all hover:opacity-100"
          onClick={handleReply}
        >
          답변하기
        </button>
        <button
          className="opacity-60 transition-all hover:opacity-100"
          onClick={handleUpdateComment}
        >
          {isModify ? "수정 완료" : "수정하기"}
        </button>
        {accessRight === "edit" && (
          <button
            className="opacity-60 transition-all hover:opacity-100"
            onClick={handleReply}
          >
            삭제하기
          </button>
        )}
      </div>
      <div className="mt-8 px-14">
        {answers && (
          <>
            {answers.map((props) => (
              <ReplyChat key={props.commentId} {...props} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
