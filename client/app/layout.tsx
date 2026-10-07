import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/provider/contextProvide";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HirePro — Find Work & Hire Talent",
  description: "HirePro connects job seekers with employers. Browse open roles, post jobs, and prepare with AI-powered mock interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Toaster position="top-center" />
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
