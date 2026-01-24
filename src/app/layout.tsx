import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import "./globals.css";

// 这部分决定了你浏览器标签栏显示的文字
export const metadata: Metadata = {
  title: "Unimelb Journey | My Portfolio",
  description: "Personal website of a Melbourne University student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* className 里的 antialiased 是让字体显示更平滑 testing */}
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        {/* flex-1 确保了内容不够多时，Footer 也会固定在页面底部 */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}