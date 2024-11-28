import type { Comment, QuestionListDto } from "@/apis/dtos/question.dto";

export const makeNewQuestionData = (
  prevData: QuestionListDto,
  newComment: Comment,
  newCommentParentId: number,
): QuestionListDto => {
  let result: QuestionListDto;

  // 일반 질문인 경우
  if (newCommentParentId === -1) {
    const newComments = [...prevData.comments, newComment];
    result = {
      comments: newComments,
    };
  }

  const newComments = prevData.comments.map((comment) => {
    if (comment.commentId === newCommentParentId) {
      return {
        ...comment,
        answers: [...comment.answers, newComment],
      };
    }
    return comment;
  });

  result = {
    comments: newComments,
  };

  return result;
};
