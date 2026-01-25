import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andreas Rokopanos",
  description: "Andreas Rokopanos - Software Engineer & Researcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
        <div className="bg-cover bg-center" style={{ backgroundImage: "url('/lakeBackground.jpeg')" }}>
          <div className="bg-black/60 w-full min-h-screen flex justify-center items-center flex-col">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
