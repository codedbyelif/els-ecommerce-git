"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-neutral-950 text-white">

      {/* Newsletter + Logo band */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left: big logo */}
        <div>
          <p className="text-[9px] tracking-[0.6em] text-neutral-600 uppercase mb-6">
            Paris · Milano · İstanbul
          </p>
          <Link href="/">
            <span className="text-[64px] md:text-[80px] lg:text-[100px] font-light font-playfair tracking-[0.12em] text-white leading-none hover:text-neutral-300 transition-colors duration-500">
              EL&apos;S
            </span>
          </Link>
          <p className="text-[12px] text-neutral-500 font-light mt-6 leading-relaxed max-w-xs">
            Zarafeti günlük hayatın her anına taşıyın. Her parça, her dikiş — bir tutkudan doğar.
          </p>
        </div>

        {/* Right: newsletter */}
        <div>
          <p className="text-[9px] tracking-[0.5em] text-neutral-500 uppercase mb-4">Newsletter</p>
          <h3 className="text-[24px] md:text-[30px] font-light font-playfair tracking-[0.03em] mb-8 leading-snug">
            Yeni sezondan<br />ilk siz haberdar olun.
          </h3>
          {submitted ? (
            <p className="text-[12px] text-neutral-400 font-light tracking-wide">
              Teşekkürler — aramıza hoş geldiniz.
            </p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 text-[13px] text-white placeholder-neutral-600 outline-none focus:border-neutral-400 transition-colors duration-300"
              />
              <button
                type="submit"
                className="self-start mt-2 px-8 py-3 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-neutral-200 transition-colors duration-300"
              >
                Abone Ol
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Nav links row */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {[
          { label: "Kadın", href: "/kadin" },
          { label: "Erkek", href: "/erkek" },
          { label: "Ayakkabı", href: "/ayakkabi" },
          { label: "Çanta", href: "/canta" },
          { label: "Aksesuar", href: "/aksesuar" },
          { label: "Parfüm", href: "/parfum" },
          { label: "Makyaj", href: "/makyaj" },
          { label: "Favorilerim", href: "/favorilerim" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[10px] tracking-[0.3em] text-neutral-500 hover:text-white transition-colors duration-300 uppercase"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a
          href="https://github.com/codedbyelif"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.1em] text-neutral-700 hover:text-neutral-400 transition-colors duration-300"
        >
          &copy; {new Date().getFullYear()} EL&apos;S. Tüm hakları saklıdır.
        </a>
        {/* Socials */}
        <div className="flex items-center gap-6">
          <a href="https://github.com/codedbyelif" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-600 hover:text-white transition-colors duration-300">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="https://github.com/codedbyelif" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-neutral-600 hover:text-white transition-colors duration-300">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://github.com/codedbyelif" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-neutral-600 hover:text-white transition-colors duration-300">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.26 8.26 0 0 0 4.76 1.5V6.77a4.83 4.83 0 0 1-1-.08z" />
            </svg>
          </a>
          <a href="https://github.com/codedbyelif" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-neutral-600 hover:text-white transition-colors duration-300">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </a>
          <a href="https://github.com/codedbyelif" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-neutral-600 hover:text-white transition-colors duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
