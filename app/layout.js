import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agemi Dashboard",
  description: "Next-generation cyber security monitoring dashboard for Agemi.",
  keywords: [
    "Agemi",
    "Cybersecurity",
    "Dashboard",
    "Threat Detection",
    "Monitoring",
    "DDoS Protection",
    "Security Logs",
  ],
  authors: [{ name: "Agemi Security Team" }],
  creator: "Agemi Security",
  publisher: "Agemi Inc.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Agemi Dashboard",
    description:
      "Real-time cybersecurity insights, logs, and threat detection powered by Agemi.",
    url: "https://yourdomain.com",
    siteName: "Agemi Dashboard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agemi Cybersecurity Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agemi Dashboard",
    description:
      "Real-time cybersecurity insights, logs, and threat detection powered by Agemi.",
    images: ["/og-image.png"],
    creator: "@AgemiSecurity",
  },
  themeColor: "#0B1120",
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0B1120]`}
      >
        {children}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </body>
    </html>
  );
}
