import { postQuestionList, questionList } from "./mockData/question";
import { createResponseStub } from "./utils/responseStubWrapper";

const questionResponse = {
  "/comments": {
    GET: createResponseStub({ data: questionList }),
    POST: createResponseStub({ data: postQuestionList }),
  },
  "/comments/:commentId": {
    PUT: createResponseStub({
      data: {},
      message: "질문 수정 성공",
    }),
    DELETE: createResponseStub({
      data: {},
      message: "질문 삭제 성공",
    }),
  },
};

export default questionResponse;
