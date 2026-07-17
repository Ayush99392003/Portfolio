import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Chat With Ayush | AI/ML Engineer Portfolio",
  description:
    "Interactive conversational portfolio of Ayush Agarwal — AI/ML Engineer specializing in Agentic AI, RAG Systems, and Full-Stack LLM Applications.",
  keywords: [
    "Ayush Agarwal",
    "AI Engineer",
    "ML Engineer",
    "RAG Systems",
    "LLM Applications",
    "Portfolio",
    "VIT Bhopal",
  ],
  authors: [{ name: "Ayush Agarwal" }],
  openGraph: {
    title: "Chat With Ayush | AI/ML Engineer",
    description:
      "Experience a portfolio like no other — a guided conversation with Ayush, AI/ML Engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
                    antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
