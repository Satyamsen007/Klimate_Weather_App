import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/customcomponents/navbar/Navbar";
import Footer from "@/components/customcomponents/footer/Footer";
import Providers from "@/components/customcomponents/main/providers/Providers";
import { Toaster } from "sonner";
import { Component as SpotlightCursor } from "@/components/spotlight-cursor";
import { GridBackground, Spotlight } from "@/components/spotlight-new";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Klimate - Your personal weather dashboard",
  description: "Stay up to date with the latest weather conditions and forecasts with Klimate",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <Toaster richColors />
          <main className="antialiased relative overflow-hidden">
            {children}
            <GridBackground />
            <Spotlight />
          </main>
          <SpotlightCursor />
          <Footer />
        </Providers>
      </body>
    </html >
  );
}
