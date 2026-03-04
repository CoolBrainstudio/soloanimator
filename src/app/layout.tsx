import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SoloAnimator Network | Watch. Connect. Create.",
  description: "A niche animation ecosystem where original short animation series can be streamed, talented animators can showcase their skills, and clients can submit animation project requirements.",
  keywords: ["animation", "animator", "2D animation", "anime", "hire animator", "animation series"],
  openGraph: {
    title: "SoloAnimator Network | Watch. Connect. Create.",
    description: "Stream original animation series and connect with talented animators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
