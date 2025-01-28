import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import '@/app/lib/googleAuth';
import GoogleAuthInitializer from "@/app/lib/googleAuth";
import { UserProvider } from "@/app/context/authContext";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Africa",
  description: "I got chills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <GoogleAuthInitializer />
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
