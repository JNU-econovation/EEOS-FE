import { https } from "../instance";
import {
  getMyActiveStatus,
  getMyAttendStatus,
  postMyAttendance,
} from "../user";
import getResponse from "@/__test__/__stub__/response";

jest.mock("../instance");
const mockHttps = https as jest.MockedFunction<typeof https>;

// 본인의 출석 상태 조회 api
describe("getMyAttendStatus", () => {
  const mockReturnData = getResponse({
    url: "/attend/programs/:programId",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("본인의 출석 상태를 반환한다", async () => {
    // arrange
    const programId = 1;

    // act
    const response = await getMyAttendStatus(programId);

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "/attend/programs/1",
      method: "GET",
    });
    expect(response).toEqual({
      name: "26기 홍길동",
      attendStatus: "attend",
    });
  });
});

// 출석 체크 하기 api
describe("postMyAttendance", () => {
  const mockReturnData = getResponse({
    url: "/attend/programs/:programId",
    method: "POST",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("출석 체크한다", async () => {
    // arrange
    const programId = 1;

    // act
    const response = await postMyAttendance(programId);

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "/attend/programs/1",
      method: "POST",
    });
    expect(response).toEqual({
      name: "26기 홍길동",
      attendStatus: "attend",
    });
  });
});

// 본인의 활동상태 조회 api
describe("getMyActiveStatus", () => {
  const mockReturnData = getResponse({
    url: "/members/activeStatus",
    method: "GET",
  });

  beforeEach(() => {
    mockHttps.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("본인의 회원 상태를 반환한다", async () => {
    // act
    const response = await getMyActiveStatus();

    // assert
    expect(mockHttps).toHaveBeenCalledWith({
      url: "/members/activeStatus",
      method: "GET",
    });
    expect(response).toEqual({
      name: "26기 홍길동",
      activeStatus: "am",
    });
  });
});
