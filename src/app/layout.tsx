import type { Metadata } from "next";
import { dmSerif, outfit, cormorant } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "M3 Consultants",
  description: "Cabinet de conseil en ressources humaines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${dmSerif.variable} ${outfit.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
