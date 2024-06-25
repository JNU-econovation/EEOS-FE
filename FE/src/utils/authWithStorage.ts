export const setAccessToken = (token: string) => {
  localStorage.removeItem("accessToken");
  localStorage.setItem("accessToken", token);
};

export const setTokenExpiration = (accessExpiredTime: number) => {
  localStorage.removeItem("tokenExpiration");
  const accessExpiredTimeDate = new Date().getTime() + accessExpiredTime;
  localStorage.setItem("tokenExpiration", accessExpiredTimeDate.toString());
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const removeTokenExpiration = () => {
  localStorage.removeItem("tokenExpiration");
};

export const deleteTokenInfo = () => {
  removeAccessToken();
  removeTokenExpiration();
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getTokenExpiration = () => {
  return localStorage.getItem("tokenExpiration");
};

export const CheckIsLoggedIn = () => {
  const accessToken = getAccessToken();
  const tokenExpiration = getTokenExpiration();

  if (!accessToken || !tokenExpiration) return false;

  const tokenExpirationDate = new Date(+tokenExpiration);
  const now = new Date();

  if (tokenExpirationDate < now) return false;
  return true;
};
