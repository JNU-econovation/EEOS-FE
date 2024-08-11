import { MemberActiveStatusInfoDto } from "../dtos/member.dto";
import { https } from "../instance";
import { getMembersByActiveStatus } from "../member";

jest.mock("../instance");

// 활동 상태별 회원 정보 조회 api
describe("getMembersByActiveStatus", () => {
  const mockReturnData = {
    status: 200,
    message: "정보 조회 성공",
    data: {
      data: {
        members: [
          {
            memeberId: 1,
            name: "00기 홍길동",
            activeStatus: "active",
          },
        ],
      },
    },
  };

  beforeEach(() => {
    https.mockReturnValue(mockReturnData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    it("/members 위치로 get 요청을 보낸다. 파라미터로 activeStatus 를 넣는다", async () => {
      const activeStatus = "all";

      await getMembersByActiveStatus(activeStatus);

      expect(https).toBeCalledWith({
        url: "/members",
        method: "GET",
        params: { activeStatus },
      });
    });
  });

  describe("response", () => {
    it("회원 정보 리스트를 반환한다", async () => {
      const result = await getMembersByActiveStatus("all");

      expect(result[0]).toBeInstanceOf(MemberActiveStatusInfoDto);
    });
  });
});
