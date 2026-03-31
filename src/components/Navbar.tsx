"use client";

import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "HAUTE COUTURE", href: "/haute-couture" },
  { label: "MODA", href: "/moda" },
  { label: "HIGH JEWELLERY", href: "/high-jewellery" },
  { label: "FINE JEWELLERY", href: "/fine-jewellery" },
  { label: "SAATLER", href: "/saatler" },
  { label: "GÖZLÜKLER", href: "/gozlukler" },
  { label: "PARFÜM", href: "/parfum" },
  { label: "MAKYAJ", href: "/makyaj" },
  { label: "CİLT BAKIMI", href: "/cilt-bakimi" },
  { label: "HAKKINDA", href: "/hakkinda" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        {/* Top bar: Logo centered, icons on right */}
        <div className="relative flex items-center justify-center px-6 md:px-10 lg:px-16 py-4 md:py-5">
          {/* Mobile menu toggle - left */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute left-6 md:hidden p-1 transition-transform duration-300 hover:scale-110"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="group relative">
            <h1
              className="text-[22px] md:text-[28px] lg:text-[32px] tracking-[0.35em] font-medium select-none"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              EL&apos;S
            </h1>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* Utility Icons - right */}
          <div className="absolute right-6 md:right-10 lg:right-16 flex items-center gap-4 md:gap-5">
            <button
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group"
              aria-label="Ara"
            >
              <Search
                size={19}
                strokeWidth={1.5}
                className="transition-colors duration-300 group-hover:text-neutral-500"
              />
            </button>
            <button
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group hidden sm:block"
              aria-label="Hesabım"
            >
              <User
                size={19}
                strokeWidth={1.5}
                className="transition-colors duration-300 group-hover:text-neutral-500"
              />
            </button>
            <button
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group hidden sm:block"
              aria-label="Favorilerim"
            >
              <Heart
                size={19}
                strokeWidth={1.5}
                className="transition-colors duration-300 group-hover:text-neutral-500"
              />
            </button>
            <button
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group"
              aria-label="Sepetim"
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.5}
                className="transition-colors duration-300 group-hover:text-neutral-500"
              />
              {/* Cart badge */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-[1px] bg-neutral-200 mx-6 md:mx-10 lg:mx-16" />

        {/* Navigation links - desktop */}
        <nav className="hidden md:block overflow-x-auto">
          <ul className="flex items-center justify-center gap-1 lg:gap-2 px-6 md:px-10 lg:px-16 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-2.5 lg:px-3.5 py-2 text-[10.5px] lg:text-[11px] tracking-[0.18em] font-medium text-neutral-800 transition-colors duration-300 hover:text-black whitespace-nowrap group"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1px] bg-black transition-all duration-400 ease-out ${
                      hoveredLink === link.href ? "w-[70%]" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom separator */}
        <div
          className={`h-[1px] transition-all duration-500 ${
            scrolled ? "bg-neutral-100" : "bg-neutral-200"
          }`}
        />
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-400 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-[340px] bg-white shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
            <h2
              className="text-[20px] tracking-[0.35em] font-medium"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              EL&apos;S
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 transition-transform duration-300 hover:rotate-90"
              aria-label="Kapat"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="opacity-0 animate-[slideIn_0.4s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={link.href}
                    className="block px-8 py-3.5 text-[11px] tracking-[0.2em] font-medium text-neutral-700 hover:text-black hover:bg-neutral-50 transition-all duration-300 border-b border-neutral-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile bottom icons */}
          <div className="px-8 py-6 border-t border-neutral-100 flex items-center gap-6">
            <button className="p-2 transition-all duration-300 hover:scale-110" aria-label="Hesabım">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="p-2 transition-all duration-300 hover:scale-110" aria-label="Favorilerim">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button className="p-2 transition-all duration-300 hover:scale-110" aria-label="Sepetim">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
