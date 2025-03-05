import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componants/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Vehichle Tracking</title>
        <link rel="shortcut-icon" src="@/public/Screenshot 2025-02-19 230734" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-white`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
