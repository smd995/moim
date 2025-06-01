import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "개발자 스터디 매칭",
  description: "개발자들을 위한 스터디 매칭 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
