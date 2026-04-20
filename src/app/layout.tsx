import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CartProvider } from "@/context/CartContext";
import { AuthPromptProvider } from "@/context/AuthPromptContext";
import SiteShell from "@/components/SiteShell";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EL'S | Luxury Fashion & Lifestyle",
  description:
    "Discover the world of EL'S — timeless elegance, haute couture, fine jewellery, and luxury lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <AuthPromptProvider>
          <CartProvider>
            <FavoritesProvider>
              <SiteShell>{children}</SiteShell>
            </FavoritesProvider>
          </CartProvider>
        </AuthPromptProvider>
      </body>
    </html>
  );
}
