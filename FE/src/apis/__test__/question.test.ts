import { https } from "../instance";
import { getQuestionsByTeam, postQuestion, updateQuestion } from "../question";
import getResponse from "@/__test__/__stub__/response";

jest.mock("../instance");
const mockHttps = https as jest.MockedFunction<typeof https>;

describe("getQuestionsByTeam", () => {
  const mockReturnData = getResponse({
    url: "/comments",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("팀의 질문 리스트를 반환한다", async () => {
    // arrange
    const programId = 1;
    const teamId = 1;

    // act
    await getQuestionsByTeam(programId, teamId);

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "comments",
      method: "GET",
      params: { programId, teamId },
    });
  });
});

// 질문 및 답변 등록 api
describe("postQuestion", () => {
  const mockReturnData = getResponse({
    url: "/comments",
    method: "POST",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("질문을 등록한다", async () => {
    // arrange
    const programId = 1;
    const teamId = 1;
    const questionContent = "질문 내용";

    // act
    await postQuestion({ programId, teamId, questionContent });

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "comments",
      method: "POST",
      data: {
        programId,
        teamId,
        content: questionContent,
        parentsCommentId: -1,
      },
    });
  });
  it("답변을 등록한다", async () => {
    // arrange
    const programId = 1;
    const teamId = 1;
    const questionContent = "답변 내용";
    const parentsCommentId = 1;

    // act
    await postQuestion({
      programId,
      teamId,
      questionContent,
      parentsCommentId,
    });

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "comments",
      method: "POST",
      data: {
        programId,
        teamId,
        content: questionContent,
        parentsCommentId,
      },
    });
  });
});

// 질문 수정 api
describe("updateQuestion", () => {
  const mockReturnData = getResponse({
    url: "/comments/:commentId",
    method: "PUT",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("질문을 수정한다", async () => {
    // arrange
    const commentId = 1;
    const contents = "수정된 질문 내용";

    // act
    await updateQuestion(commentId, contents);

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "comments/1",
      method: "PUT",
      data: {
        contents,
      },
    });
  });
});

// 질문 삭제 api
describe("deleteQuestion", () => {
  const mockReturnData = getResponse({
    url: "/comments/:commentId",
    method: "DELETE",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("질문을 삭제한다", async () => {
    // arrange
    const commentId = 1;

    // act
    await updateQuestion(commentId, "삭제된 질문 내용");

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "comments/1",
      method: "PUT",
      data: {
        contents: "삭제된 질문 내용",
      },
    });
  });
});
