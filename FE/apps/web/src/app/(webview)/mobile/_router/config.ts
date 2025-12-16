// app/layout.tsx
import { fade } from "@ssgoi/react/view-transitions";

export const pageTransitionConfig = {
  transitions: [
    {
      from: "/main",
      to: "/programs",
      transition: fade(),
      symmetric: true,
    },
    {
      from: "/main",
      to: "/calendar",
      transition: fade(),
      symmetric: true,
    },
    {
      from: "/main",
      to: "/mypage",
      transition: fade(),
      symmetric: true,
    },
  ],
};
