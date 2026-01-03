import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const useSecureStore = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let result = await SecureStore.getItemAsync("accessToken");
      setAccessToken(result);
      setIsLoading(false);
    })();
  }, []);

  return { accessToken, isLoading };
};

export default useSecureStore;
