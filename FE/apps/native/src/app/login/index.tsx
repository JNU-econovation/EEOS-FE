// import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import useAuthStore from "@/src/store/authStore";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function LoginScreen() {
  // const { mutate: postLogin } = useLoginMutation();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onPressLogin = async () => {
    try {
      // postLogin(
      //   {
      //     id: "test",
      //     password: "test",
      //   },
      //   {
      //     onSuccess: async (data) => {
      //       // API 응답: { accessToken: string, accessExpiredTime: number }
      //       // accessExpiredTime은 밀리초 단위의 상대 시간 (예: 3600000 = 1시간)
      //       await setAccessToken(data.accessToken, data.accessExpiredTime);
      //       router.replace("/(tabs)/home");
      //     },
      //   },
      // );
      await setAccessToken("dummyAccessToken", 99999999999);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("[Login] Failed:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Text></Text>
      <View className="p-4">
        <TextInput
          placeholder="ID"
          className="border rounded-lg p-4 border-gray-300 mb-4"
        />
        <TextInput
          placeholder="PW"
          className="border rounded-lg p-4 border-gray-300 mb-4"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={onPressLogin}
          className="px-4 py-2 rounded-full bg-primary"
        >
          <Text className="text-black text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
