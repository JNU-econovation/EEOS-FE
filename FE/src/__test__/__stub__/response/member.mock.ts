import {
  members,
  myActiveStatus,
  updateMemberActiveStatus,
  updateMyActiveStatus,
} from "./mockData/member";
import { createResponseStub } from "./utils/responseStubWrapper";

const memberResponse = {
  "/members": {
    GET: createResponseStub({ data: members }),
  },
  "/members/:memberId": {
    DELETE: createResponseStub({ message: "삭제 성공", data: null }),
  },
  "/members/activeStatus": {
    GET: createResponseStub({ data: myActiveStatus }),
    PUT: createResponseStub({ data: updateMyActiveStatus }),
  },
  "/members/activeStatus/:memberId": {
    PUT: createResponseStub({ data: updateMemberActiveStatus }),
  },
};

export default memberResponse;
