import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// GCL brand faces: Fraunces for headings, Karla for everything else.
const fraunces = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const karla = Karla({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-karla", display: "swap" });

export const metadata: Metadata = {
  title: "Gut Clarity Lab — for gut-health practitioners",
  description:
    "Gut Clarity Lab brings client goals, daily logs, check-ins and microbiome test reports into one place, with Sage to help organize information and prepare for sessions.",
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
