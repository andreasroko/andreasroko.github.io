import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "../components/Header";
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
        <div className="header-fixed">
          <Header />
        </div>
        <div className="container">
          <div className="overlay">
            {children}
            <div className='footer'>
              <div className='horizontal-padding-small'>© ANDREAS ROKOPANOS {new Date().getFullYear()}</div>
              <div className='horizontal-padding-small' aria-label='Photo Location'>📌 Tymphi</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
