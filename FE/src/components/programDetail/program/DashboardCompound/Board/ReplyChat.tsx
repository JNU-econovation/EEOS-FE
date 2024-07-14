import ChatList from "./common/ChatList";
import { Answer } from "@/apis/dtos/question.dto";

const ReplyChat = ({
  writer,
  content,
  time,
  commentId,
  accessRight,
}: Answer) => {
  return (
    <div className="border bg-gray-10 p-4">
      <ChatList
        writer={writer}
        content={content}
        time={time}
        commentId={commentId}
        accessRight={accessRight}
        markdownStyle="!bg-inherit"
      />
    </div>
  );
};

export default ReplyChat;
