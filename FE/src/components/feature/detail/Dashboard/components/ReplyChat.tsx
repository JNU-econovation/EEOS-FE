import classNames from "classnames";
import ChatList from "./ChatList";
import { Answer } from "@/apis/dtos/question.dto";

interface ReplyChatProps extends Answer {
  index: number;
}

const ReplyChat = ({
  commentId,
  content,
  writer,
  time,
  accessRight,
  index,
}: ReplyChatProps) => {
  // const chatListStyle = index === 0 ? "border-t" : "border-t border-gray-10";
  const chatListStyle = classNames("bg-gray-10 p-4", {
    "border-t border-t-2": index !== 0,
  });
  return (
    <div className={chatListStyle}>
      <ChatList
        writer={writer}
        content={content}
        time={time}
        commentId={commentId}
        accessRight={accessRight}
        markdownStyle="!bg-inherit"
        showReplyButton={true}
      />
    </div>
  );
};

export default ReplyChat;
