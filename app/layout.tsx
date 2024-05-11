import { Inter } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const orbitron = Orbitron({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
