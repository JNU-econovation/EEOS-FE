import WebviewWithInjected from "@/src/components/WebviewWithInjected/WebviewWithInjected";

const OnboardingScreen = () => {
  const source = {
    uri: "https://docs.celestia.org/app-onboarding",
  };
  return <WebviewWithInjected source={source} />;
};

export default OnboardingScreen;
