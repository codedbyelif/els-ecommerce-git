import Link from "next/link";

const quickLinks = [
  { label: "Kadın", href: "/kadin" },
  { label: "Erkek", href: "/erkek" },
  { label: "Denim", href: "/denim" },
  { label: "Ayakkabı", href: "/ayakkabi" },
  { label: "Çanta", href: "/canta" },
  { label: "Parfüm", href: "/parfum" },
  { label: "Makyaj", href: "/makyaj" },
  { label: "Saatler", href: "/saatler" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white overflow-hidden">
      {/* Big logo section */}
      <div className="relative py-24 md:py-32">
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="text-[120px] md:text-[200px] lg:text-[280px] tracking-[0.3em] font-bold font-playfair text-white/[0.03]">
            EL&apos;S
          </span>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <Link href="/">
            <span className="text-[32px] md:text-[40px] tracking-[0.4em] font-medium font-playfair">

            </span>
          </Link>

          {/* Horizontal links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.2em] text-neutral-500 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-neutral-700 mx-auto mt-10 mb-10" />

          {/* Social row */}
          <div className="flex items-center justify-center gap-8">
            <a href="#" className="group" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 group-hover:text-white transition-colors duration-300">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="group" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-neutral-600 group-hover:text-white transition-colors duration-300" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="group" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-neutral-600 group-hover:text-white transition-colors duration-300" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.26 8.26 0 0 0 4.76 1.5V6.77a4.83 4.83 0 0 1-1-.08z" />
              </svg>
            </a>
            <a href="#" className="group" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 group-hover:text-white transition-colors duration-300">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-[0.1em] text-neutral-700">
            &copy; {new Date().getFullYear()} EL&apos;S
          </p>
          <div className="flex items-center gap-6">
            {["Gizlilik", "Koşullar", "Çerezler", "İletişim"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] tracking-[0.1em] text-neutral-700 hover:text-neutral-400 transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
