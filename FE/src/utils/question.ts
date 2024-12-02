import type { Comment, QuestionListDto } from "@/apis/dtos/question.dto";

export const makeNewQuestionData = (
  prevData: QuestionListDto,
  newComment: Comment,
  newCommentParentId: number,
): QuestionListDto => {
  // 일반 질문인 경우
  if (newCommentParentId === -1) {
    const newComments = [...prevData.comments, newComment];
    return {
      comments: newComments,
    };
  }

  // 답변인 경우
  const newComments = prevData.comments.map((comment) => {
    // 부모 댓글의 답변으로 추가
    if (comment.commentId === newCommentParentId) {
      return {
        ...comment,
        answers: [...comment.answers, newComment],
      };
    }

    // 해당 comment가 부모가 아닌 경우, 해당 comment의 답변을 추가로 살펴보고 만약 대댓글이 부모인 경우
    const isCommentOfComment = comment.answers.some((answer) => {
      return answer.commentId === newCommentParentId;
    });

    // 대댓글의 대댓글인 경우 해당 대댓글에 추가
    if (isCommentOfComment) {
      return {
        ...comment,
        answers: [...comment.answers, newComment],
      };
    }

    return comment;
  });

  return {
    comments: newComments,
  };
};
