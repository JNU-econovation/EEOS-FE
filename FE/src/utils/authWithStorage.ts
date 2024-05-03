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
  // if (typeof window !== "undefined") return false;
  const accessToken = getAccessToken();
  const tokenExpiration = getTokenExpiration();

  if (!accessToken || !tokenExpiration) {
    deleteTokenInfo();
    return false;
  }

  const tokenExpirationDate = new Date(+tokenExpiration);
  const now = new Date();

  if (tokenExpirationDate < now) {
    deleteTokenInfo();
    return false;
  }
  return true;
};
