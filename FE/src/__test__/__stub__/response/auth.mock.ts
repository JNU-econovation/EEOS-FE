import { slackAuth } from "./mockData/auth";
import { createResponseStub } from "./utils/responseStubWrapper";

const authResponse = {
  "/auth/login/slack": {
    POST: createResponseStub({
      data: slackAuth,
    }),
  },
};

export default authResponse;
