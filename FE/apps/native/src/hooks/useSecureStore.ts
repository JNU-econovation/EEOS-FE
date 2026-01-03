import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const useSecureStore = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let result = await SecureStore.getItemAsync("accessToken");
      setAccessToken(result);
    })();
  }, []);

  return { accessToken };
};

export default useSecureStore;
