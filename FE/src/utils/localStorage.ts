class LocalStorage {
  constructor() {}

  static setItem(key: string, value: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      const value = localStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  static setToken(token: string, expiration: number) {
    LocalStorage.setItem("accessToken", token);
    LocalStorage.setItem("tokenExpiration", expiration);
  }

  static getToken() {
    const accessToken = LocalStorage.getItem("accessToken");
    const tokenExpiration = LocalStorage.getItem("tokenExpiration");
    return { accessToken, tokenExpiration };
  }

  static clearToken() {
    LocalStorage.removeItem("accessToken");
    LocalStorage.removeItem("tokenExpiration");
  }
}

export default LocalStorage;
