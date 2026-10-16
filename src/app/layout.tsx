import type { Metadata } from "next";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageMetadata } from "../data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata(SITE_NAME, SITE_DESCRIPTION),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/lakeBackground.webp" fetchPriority="high" />
      </head>
      <body>
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
        {/* Dark fallback colour shows while the background photo loads */}
        <div className="bg-[#1c2733] bg-cover bg-center" style={{ backgroundImage: "url('/lakeBackground.webp')" }}>
          <div className="bg-black/60 w-full min-h-dvh flex justify-center items-center flex-col">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
