import "./globals.css";
import MainNavbar from "../components/layout";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
