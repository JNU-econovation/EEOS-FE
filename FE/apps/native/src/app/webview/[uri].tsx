import WebviewWithInjected from "@/src/components/WebviewWithInjected";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const WebviewScreen = () => {
  const { uri } = useLocalSearchParams<{ uri: string }>();

  if (!uri) return <View />;

  const decodedUri = decodeURIComponent(uri);

  return <WebviewWithInjected source={{ uri: decodedUri }} />;
};

export default WebviewScreen;
