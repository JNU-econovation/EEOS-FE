// import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import useAuthStore from "@/src/store/authStore";
import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import { IS_DEV } from "..";
import * as SecureStore from "expo-secure-store";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function LoginScreen() {
  const { mutate: postLogin } = useLoginMutation();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onPressLogin = async () => {
    try {
      postLogin(undefined, {
        onSuccess: async ({ accessToken, accessExpiredTime }) => {
          await setAccessToken(accessToken, accessExpiredTime);
          if (IS_DEV) {
            const storedToken = await SecureStore.getItemAsync("accessToken");
            setTimeout(() => {
              console.log("[DEV] 로그인 성공 여부:", storedToken !== null);
            }, 1000);
          }
          router.replace("/(tabs)/home");
        },
      });
    } catch (error) {
      console.error("[Login] Failed:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4 flex justify-center items-center w-full h-full">
        <TouchableOpacity
          onPress={onPressLogin}
          className="px-4 py-4 rounded-full bg-primary"
        >
          <Text className="text-black text-center text-2xl">
            테스트 아이디로 로그인하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
