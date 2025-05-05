import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReduxProvider from "@/providers/redux-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ModalProvider } from "@/providers/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orderly - Your Business, In Perfect Order",
  description:
    "The e-commerce management system designed to bring clarity and control to your business. Manage products, orders, inventory, and more, all in perfect order.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
