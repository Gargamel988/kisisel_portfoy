"use client"
import "./globals.css";

import NavBarDemo from "../components/layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
      <NavBarDemo/>
        {children}
      
      </body>
    </html>
  );
}
