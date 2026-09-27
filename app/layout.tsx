import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// GCL brand faces: Fraunces for headings, Karla for everything else.
const fraunces = Fraunces({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-fraunces", display: "swap" });
const karla = Karla({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-karla", display: "swap" });

export const metadata: Metadata = {
  title: "Gut Clarity Lab — Feel better about your gut, one step at a time",
  description:
    "A science-backed, food-first 12-week programme that helps you understand your body, build better habits and create a healthier relationship with food. Guided by your practitioner and Sage.",
  icons: { icon: "/app/gcl-logo.jpeg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${karla.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
