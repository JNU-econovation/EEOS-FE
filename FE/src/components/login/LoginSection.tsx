import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import StyledLoginButton from "./ui/StyledLoginButton";
import { useSlackLoginMutation } from "@/hooks/query/useAuthQuery";

interface LoginSectionProps {
  title: string;
  children: React.ReactNode;
}
//Wrapper
const LoginSection = ({ title, children }: LoginSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-light">{title}</p>
      {children}
    </div>
  );
};

//Children_1 SlackLoginButton
const SlackLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI;
  const teamId = process.env.NEXT_PUBLIC_SLACK_TEAM_ID;

  const slackLoginUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&team_id=${teamId}&scope=&user_scope=users.profile:read&redirect_uri=${redirectUri}`;

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { mutate: loginSlack } = useSlackLoginMutation();

  useEffect(() => {
    if (code) loginSlack({ code, redirect_uri: redirectUri });
  }, [code]);

  return (
    <StyledLoginButton
      linkUrl={slackLoginUrl}
      buttonText="슬랙으로 로그인"
      imageUrl="/icons/slack.svg"
      color="slack"
    />
  );
};

//Children_2 GuestLoginButton
const GuestLoginButton = () => {
  return (
    <StyledLoginButton
      linkUrl="/guest/main"
      buttonText="Visit to EEOS"
      imageUrl="/icons/blackCompany.svg"
      color="guest"
    />
  );
};

LoginSection.SlackLoginButton = SlackLoginButton;
LoginSection.GuestLoginButton = GuestLoginButton;

export default LoginSection;
