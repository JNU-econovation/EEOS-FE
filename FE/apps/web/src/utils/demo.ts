export const notAllowDecorator = (
  fn: unknown,
  alertText = "현재는 사용할 수 없는 기능입니다",
) => {
  fn;
  return () => alert(alertText);
};
