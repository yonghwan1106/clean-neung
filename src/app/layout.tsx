import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "클린릉 - AI 기반 강릉 스마트 분리수거 플랫폼",
  description: "사진 한 장으로 쓰레기 분류하고 포인트도 적립하세요. 강릉시 분리수거를 쉽고 재미있게!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="pb-16 md:pb-0">
            {children}
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
