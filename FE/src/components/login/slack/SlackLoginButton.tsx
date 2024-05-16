"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import StyledLoginButton from "../ui/StyledLoginButton";
import { useSlackLoginMutation } from "@/hooks/query/useAuthQuery";

const SlackLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI;
  const teamId = process.env.NEXT_PUBLIC_SLACK_TEAM_ID;

  const slackLoginUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&team_id=${teamId}&scope=&user_scope=users.profile:read&redirect_uri=${redirectUri}`;

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { mutate: loginSlack } = useSlackLoginMutation();

  useEffect(() => {
    if (code) {
      loginSlack({ code, redirect_uri: redirectUri });
    }
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

export default SlackLoginButton;