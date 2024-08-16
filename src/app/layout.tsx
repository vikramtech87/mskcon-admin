import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "./_components/footer";
import Header from "./_components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MSKCon Admin",
  description: "Admin app to monitor MSKCon registration app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex-col flex justify-between",
          inter.className
        )}
      >
        <div>
          <Header />
          <div>{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
