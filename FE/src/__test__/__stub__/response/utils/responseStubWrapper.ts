interface CreateResponseStubParams<DataType> {
  status?: number;
  message?: string;
  data: DataType;
}
export const createResponseStub = <DataType>({
  status = 200,
  message = "성공",
  data,
}: CreateResponseStubParams<DataType>) => {
  return {
    data: {
      status,
      message,
      data,
    },
  };
};
