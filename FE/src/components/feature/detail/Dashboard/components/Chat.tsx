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
    <div className="border-b p-4">
      <ChatList
        showReplyButton={true}
        markdownStyle=""
        commentId={commentId}
        writer={writer}
        accessRight={accessRight}
        time={time}
        content={content}
      />
      <div className="mt-8" />
      <div className="overflow-hidden rounded-md">
        {answers && (
          <>
            {answers.map((props, index) => (
              <ReplyChat key={props.commentId} index={index} {...props} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
