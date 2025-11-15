import type { Metadata } from "next";
import { DM_Sans, Red_Hat_Display, Plus_Jakarta_Sans } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";
import { ToastContainer } from "./toast";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crowdshaki",
  description: "Reliable means to help people needing fund",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white mx-auto min-h-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-full`}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}