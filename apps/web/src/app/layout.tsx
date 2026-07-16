import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import ParticleProviderWrapper from "@/components/ParticleProviderWrapper";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusPots — One link. One balance. Any chain.",
  description:
    "Chain-abstracted fundraising for students, creators, and communities. Contributors pay from any chain. Organizers see one clean balance on Arbitrum.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground min-h-screen antialiased" suppressHydrationWarning>
        <ParticleProviderWrapper>{children}</ParticleProviderWrapper>
      </body>
    </html>
  );
}
