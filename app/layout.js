import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vehicle Tracking",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <div className="navbar flex">
          <div className="navbar-start w-1/3">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><Link href="/vehicle-tracking"><p>Vehicle Tracking</p></Link></li>
              </ul>
            </div>
            <Link href="/"><p className="btn btn-ghost text-xl"><Image src="/Screenshot 2025-02-19 230734.png" alt="logo" height={100} width={100} /></p></Link>
          </div>
          <div className="navbar-center justify-center hidden lg:flex w-1/3">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/vehicle-tracking"><p>Vehicle Tracking</p></Link></li>
            </ul>
          </div>
          <div className="navbar-end w-1/3">
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
