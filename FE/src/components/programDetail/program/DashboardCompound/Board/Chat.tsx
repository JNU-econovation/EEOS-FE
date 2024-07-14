import ChatList from "./common/ChatList";
import ReplyChat from "./ReplyChat";
import { Comment } from "@/apis/dtos/question.dto";

interface ChatProps extends Comment {
  isGuest: boolean;
}
const Chat = ({
  commentId,
  content,
  writer,
  time,
  answers,
  accessRight,
  isGuest,
}: ChatProps) => {
  return (
    <div className="border p-4">
      <ChatList
        commentId={commentId}
        writer={writer}
        accessRight={accessRight}
        time={time}
        content={content}
        isGuest={isGuest}
      />
      <div className="mt-8 px-14">
        {answers && (
          <>
            {answers.map((props) => (
              <ReplyChat key={props.commentId} isGuest={isGuest} {...props} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
