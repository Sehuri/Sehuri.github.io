import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sehuri.github.io"),
  title: "深绘里｜Sehuri's Digital Garden",
  description: "在旅行、阅读、知识、音乐与两个月亮之间，收藏我看见的世界。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "深绘里｜Sehuri's Digital Garden",
    description: "今日庭院、两个月亮、春树书房与庭院年轮，记录深绘里持续生长的路径。",
    type: "website",
    locale: "zh_CN",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "深绘里——在自己的世界里，慢慢生长。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "深绘里｜Sehuri's Digital Garden",
    description: "今日庭院、两个月亮、春树书房与庭院年轮，记录深绘里持续生长的路径。",
    images: ["/og.png"],
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
