// app/layout.tsx
import { slide } from "@ssgoi/react/view-transitions";

export const pageTransitionConfig = {
  transitions: [
    {
      from: "/main",
      to: "/programs",
      transition: slide({
        direction: "left",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/programs",
      to: "/main",
      transition: slide({
        direction: "right",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/main",
      to: "/calendar",
      transition: slide({
        direction: "left",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/calendar",
      to: "/main",
      transition: slide({
        direction: "left",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/main",
      to: "/mypage",
      transition: slide({
        direction: "left",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/mypage",
      to: "/main",
      transition: slide({
        direction: "right",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/programs",
      to: "/programs/[programId]",
      transition: slide({
        direction: "right",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/mypage",
      to: "/programs/[programId]",
      transition: slide({
        direction: "right",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
    {
      from: "/mypage",
      to: "/setting",
      transition: slide({
        direction: "left",
        spring: {
          damping: 100,
          stiffness: 1000,
        },
      }),
      symmetric: true,
    },
  ],
};
