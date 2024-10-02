import authResponse from "./auth.mock";
import memberResponse from "./member.mock";
import programResponse from "./program.mock";
import questionResponse from "./question.mock";
import userResponse from "./user.mock";

interface GetResponseParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}
const getResponse = ({ url, method }: GetResponseParams) => {
  const responseData = {
    ...programResponse,
    ...memberResponse,
    ...questionResponse,
    ...userResponse,
    ...authResponse,
  };
  return responseData[url][method];
};

export default getResponse;
