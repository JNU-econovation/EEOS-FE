import { myAttendStatus, updateMyAttendStatus } from "./mockData/user";
import { createResponseStub } from "./utils/responseStubWrapper";

const userResponse = {
  "/attend/programs/:programId": {
    GET: createResponseStub({ data: myAttendStatus }),
    PUT: createResponseStub({
      data: updateMyAttendStatus,
      message: "수정 성공",
    }),
    POST: createResponseStub({
      data: updateMyAttendStatus,
      message: "수정 성공",
    }),
  },
};

export default userResponse;
