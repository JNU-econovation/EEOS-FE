import useLoginMutation from "@/src/hooks/query/useLoginMutation";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * TODO: 웹 - 앱 로그인 상태 동기화
 * TODO: 앱에 토큰 저장
 */

export default function LoginScreen() {
  const { mutate: postLogin } = useLoginMutation();

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
          onPress={() => {}}
          className="px-4 py-2 rounded-full bg-primary"
        >
          <Text className="text-black text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
