import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prizmalive.com"),
  title: {
    default: "Prizma Entertainment - Live Music Band in Sri Lanka",
    template: "%s | Prizma Entertainment",
  },
  description:
    "Professional live music band in Sri Lanka for weddings, corporate events, and private functions. Experience unforgettable live music performances.",
  keywords: [
    "live band",
    "sri lanka band",
    "wedding band",
    "live music",
    "corporate events",
    "prizma entertainment",
  ],
  authors: [{ name: "Prizma Entertainment" }],
  creator: "Prizma Entertainment",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prizmalive.com",
    siteName: "Prizma Entertainment",
    images: [
      {
        url: "/band-hero.png",
        width: 1200,
        height: 630,
        alt: "Prizma Entertainment Band",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/band-hero.png"],
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
    <html lang="en" className={poppins.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            success: {
              style: {
                background: "#1a1a1a",
                color: "#F9B104",
                border: "1px solid #F9B104",
              },
              iconTheme: {
                primary: "#F9B104",
                secondary: "#1a1a1a",
              },
            },
            error: {
              style: {
                background: "#1a1a1a",
                color: "#ef4444",
                border: "1px solid #ef4444",
              },
            },
            loading: {
              style: {
                background: "#1a1a1a",
                color: "#F9B104",
                border: "1px solid #F9B104",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
