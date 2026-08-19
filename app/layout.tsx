import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마케팅 지표 계산기",
  description: "ROAS·CAC·LTV·손익분기점을 계산하고 시나리오를 비교하는 도구",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
