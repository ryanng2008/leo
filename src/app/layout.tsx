import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import '@/app/lib/googleAuth';
import GoogleAuthInitializer from "@/app/lib/googleAuth";
import { UserProvider } from "@/app/context/authContext";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Amburo",
  description: "Promote your tutoring & coaching for free, with just 2 minutes. The centralised platform for tutoring & coaching — find a tutor or connect with clients.",
  icons: {
    icon: '/logo2.png',
  },
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
