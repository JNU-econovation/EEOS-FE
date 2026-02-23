import X from "@/assets/icons/X.svg";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import WebviewWithInjected from "../../components/WebviewWithInjected";
import { WEBVIEW_PATH } from "../../constants/webview";

const createEvent = () => {
  const { date: selectedTimestamp } = useLocalSearchParams<{ date: string }>();

  return (
    <View className="flex-1 bg-white">
      <View className="py-8 flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-8"
        >
          <X />
        </TouchableOpacity>
        <Text className="text-xl">일정 등록</Text>
      </View>
      <WebviewWithInjected
        source={{ uri: WEBVIEW_PATH.CREATE_EVENT(selectedTimestamp) }}
      />
    </View>
  );
};

export default createEvent;
