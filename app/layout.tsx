import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Petits Lutins Malin",
    template: "%s | Petits Lutins Malin",
  },
  description:
    "Boutique dropshipping electronique et high-tech construite avec Next.js 16, App Router et Server Actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentHour = new Date().getHours();
  const isDarkMode = currentHour >= 19 || currentHour < 7;

  return (
    <html
      lang="fr"
      className={`${bodyFont.variable} ${headingFont.variable} ${isDarkMode ? "theme-dark" : "theme-light"}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
