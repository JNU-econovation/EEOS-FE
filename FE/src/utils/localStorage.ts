export const setAccessToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
  localStorage.setItem("accessToken", token);
};

export const setTokenExpiration = (accessExpiredTime: number) => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("tokenExpiration");
  const accessExpiredTimeDate = new Date().getTime() + accessExpiredTime;
  localStorage.setItem("tokenExpiration", accessExpiredTimeDate.toString());
};

export const removeAccessToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("accessToken");
};

export const removeTokenExpiration = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("tokenExpiration");
};

export const deleteTokenInfo = () => {
  removeAccessToken();
  removeTokenExpiration();
};

export const getAccessToken = () => {
  if (typeof window === "undefined") return;

  return localStorage.getItem("accessToken");
};

export const getTokenExpiration = () => {
  if (typeof window === "undefined") return;

  return localStorage.getItem("tokenExpiration");
};
