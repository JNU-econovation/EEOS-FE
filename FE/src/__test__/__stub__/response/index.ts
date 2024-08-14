import memberResponse from "./member";
import programResponse from "./program";
import questionResponse from "./question";

interface GetResponseParams {
  url: string;
  method: string;
}
const getResponse = ({ url, method }: GetResponseParams) => {
  const responseData = {
    ...programResponse,
    ...memberResponse,
    ...questionResponse,
  };

  return responseData[url][method];
};

export default getResponse;
