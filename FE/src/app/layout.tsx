import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";
import Provider from "@/utils/provider";

export const metadata: Metadata = {
  title: "EEOS",
  description: "에코노베이션 행사 관리 서비스",
  openGraph: {
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center">
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
