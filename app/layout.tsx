import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "深绘里｜Sehuri's Digital Garden",
  description: "在旅行、阅读与知识之间，收藏我看见的世界。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
