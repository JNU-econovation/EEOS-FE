import {
  // ableProgramAccess,
  attendMembers,
  guestProgram,
  guestPrograms,
  nonAbleProgramAccess,
  program,
  programAttend,
  programMembers,
  programs,
} from "./data/program";
import { createResponseStub } from "./utils/responseStubWrapper";
import { deleteProgram } from "@/apis/program";

const programResponse = {
  "/programs": {
    GET: createResponseStub({ data: programs }),
  },
  "/programs/:programId": {
    GET: createResponseStub({ data: program }),
    DELETE: createResponseStub({ data: deleteProgram }),
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
};

export default programResponse;
