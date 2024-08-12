import {
  // ableProgramAccess,
  attendMembers,
  deleteProgram,
  guestProgram,
  guestPrograms,
  nonAbleProgramAccess,
  program,
  programAttend,
  programMembers,
  programs,
  sendSlackMessage,
  postProgram,
  patchProgram,
  changeProgramAttendMode,
} from "./mockData/program";
import { createResponseStub } from "./utils/responseStubWrapper";

const programResponse = {
  "/programs": {
    GET: createResponseStub({ data: programs }),
    POST: createResponseStub({ data: postProgram }),
  },
  "/programs/:programId": {
    GET: createResponseStub({ data: program }),
    DELETE: createResponseStub({ data: deleteProgram }),
    PATCH: createResponseStub({ data: patchProgram }),
    POST: createResponseStub({ data: changeProgramAttendMode }),
  },
  "/guest/programs/:programId": {
    GET: createResponseStub({ data: guestProgram }),
  },
  "/guest/programs": {
    GET: createResponseStub({ data: guestPrograms }),
  },
  "/programs/:programId/members": {
    GET: createResponseStub({ data: programMembers }),
  },
  "/attend/programs/:programId": {
    GET: createResponseStub({ data: programAttend }),
  },
  "/programs/:programId/accessRight": {
    GET: createResponseStub({ data: nonAbleProgramAccess }),
  },
  // "/programs/:programId/accessRight": {
  //   GET: createResponseStub({ data: ableProgramAccess }),
  // },
  "/attend/programs/:programId/members": {
    GET: createResponseStub({ data: attendMembers }),
  },
  "/programs/:programId/slack/notification": {
    POST: createResponseStub({ data: sendSlackMessage }),
  },
} as const;

export default programResponse;
