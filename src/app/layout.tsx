import "./globals.css";
import type { Metadata } from "next";

import Providers from "@/lib/Provider";

export const metadata: Metadata = {
  title: "HotelHaven",
  description: "This is a Hotel Booking Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning={true}>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
