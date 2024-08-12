import programResponse from "./program";

interface GetResponseParams {
  url: string;
  method: string;
}
const getResponse = ({ url, method }: GetResponseParams) => {
  // 만약 데이터를 추가하고 싶다면, 아래와 같이 추가하면 된다.
  const responseData = {
    ...programResponse,
  };

  return responseData[url][method];
};

export default getResponse;
