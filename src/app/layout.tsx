import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { LayoutResponsibility } from "@/components/layoutResponsibility";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Estoque Fácil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className={`${poppins.className} h-screen antialiased`}>
        <LayoutResponsibility>{children}</LayoutResponsibility>
        <Toaster />
      </body>
    </html>
  );
}
