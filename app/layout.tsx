import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gut Clarity Lab — Run your gut-health practice on one platform",
  description:
    "Gut Clarity Lab turns a client’s microbiome test into a 12-week, food-first programme. Daily check-ins, weekly summaries, session prep and Sage — all on one client profile.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
