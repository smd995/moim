import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "개발자 스터디 매칭 - MOIM",
  description: "개발자들을 위한 스터디 매칭 플랫폼",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-lg mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">
                <a href="/" className="text-blue-600">
                  MOIM
                </a>
              </h1>
              <nav className="flex space-x-4">
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  스터디
                </a>
                <a
                  href="/create"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  생성
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-lg mx-auto px-4 py-6">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-lg mx-auto px-4 py-4">
            <p className="text-center text-sm text-gray-500">
              개발자 스터디 매칭 플랫폼 MOIM
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
