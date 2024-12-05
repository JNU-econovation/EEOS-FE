"use client";

import ChatList from "./ChatList";
import { Comment } from "@/apis/dtos/question.dto";
import ReplyChat from "./ReplyChat";

const Chat = ({
  commentId,
  content,
  writer,
  time,
  answers,
  accessRight,
}: Comment) => {
  return (
    <div className="border p-4">
      <ChatList
        showReplyButton={true}
        markdownStyle=""
        commentId={commentId}
        writer={writer}
        accessRight={accessRight}
        time={time}
        content={content}
      />
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
