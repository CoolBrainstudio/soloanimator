import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SoloAnimator Network | Discover and Hire Talented Animators",
  description: "SoloAnimator is a curated network of independent animators where creators and businesses can discover talented artists for animation projects. Hire 2D animators, motion designers, and more.",
  keywords: ["animator", "2D animation", "hire animator", "motion graphics", "character design", "animation freelance", "animation services", "find animator"],
  authors: [{ name: "SoloAnimator Network" }],
  openGraph: {
    title: "SoloAnimator Network | Discover and Hire Talented Animators",
    description: "A curated network of independent animators ready to bring your ideas to life.",
    type: "website",
    siteName: "SoloAnimator Network",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoloAnimator Network | Discover and Hire Talented Animators",
    description: "A curated network of independent animators ready to bring your ideas to life.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function stripAttrs() {
                  var body = document.body;
                  if (!body) return;
                  Array.from(body.attributes).forEach(function(attr) {
                    if (attr.name.startsWith('__processed') || attr.name.startsWith('bis_')) {
                      body.removeAttribute(attr.name);
                    }
                  });
                }
                stripAttrs();
                setInterval(stripAttrs, 100);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
