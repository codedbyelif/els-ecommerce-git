"use client";

import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, Mail, Lock, Eye, EyeOff, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { useAuthPrompt } from "@/context/AuthPromptContext";

const navLinks = [
  {
    label: "KADIN",
    href: "/kadin",
    mega: {
      columns: [
        {
          title: "Giyim",
          links: [
            { label: "Tüm Kadın", href: "/kadin" },
            { label: "Elbise", href: "/kadin/elbise" },
            { label: "Bluz & Gömlek", href: "/kadin/bluz" },
            { label: "Ceket", href: "/kadin/ceket" },
            { label: "Etek", href: "/kadin/etek" },
            { label: "Pantolon", href: "/kadin/pantolon" },
          ],
        },
        {
          title: "Dış Giyim",
          links: [
            { label: "Ceket", href: "/kadin/ceket" },
          ],
        },
        {
          title: "Öne Çıkanlar",
          links: [
            { label: "Yeni Gelenler", href: "/kadin/yeni" },
            { label: "Çok Satanlar", href: "/kadin/cok-satan" },
            { label: "İlkbahar / Yaz 2026", href: "/kadin/koleksiyon" },
          ],
        },
      ],
      image: "/kadin-product-1.jpg",
      imageLabel: "İlkbahar / Yaz 2026",
    },
  },
  {
    label: "ERKEK",
    href: "/erkek",
    mega: {
      columns: [
        {
          title: "Giyim",
          links: [
            { label: "Tüm Erkek", href: "/erkek" },
            { label: "Takım Elbise", href: "/erkek/takim" },
            { label: "Gömlek", href: "/erkek/gomlek" },
            { label: "Pantolon", href: "/erkek/pantolon" },
          ],
        },
        {
          title: "Dış Giyim",
          links: [
            { label: "Ceket", href: "/erkek/ceket" },
          ],
        },
        {
          title: "Öne Çıkanlar",
          links: [
            { label: "Yeni Gelenler", href: "/erkek/yeni" },
            { label: "Çok Satanlar", href: "/erkek/cok-satan" },
            { label: "İlkbahar / Yaz 2026", href: "/erkek/koleksiyon" },
          ],
        },
      ],
      image: "/erkek-takim-3.jpg",
      imageLabel: "Erkek Koleksiyonu",
    },
  },
  { label: "PARFÜM", href: "/parfum", mega: null },
  { label: "AYAKKABI", href: "/ayakkabi", mega: null },
  { label: "AKSESUAR", href: "/aksesuar", mega: null },
  { label: "ÇANTA", href: "/canta", mega: null },
  { label: "MAKYAJ", href: "/makyaj", mega: null },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const loginRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/arama?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  // Auth States
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { favoritesCount } = useFavorites();
  const { items, totalCount, totalPrice, removeItem, updateQuantity, cartOpen, setCartOpen } = useCart();
  const { promptMessage, clearPrompt } = useAuthPrompt();

  useEffect(() => {
    if (!promptMessage) return;
    setAuthTab("register");
    setLoginOpen(true);
    const t = setTimeout(() => clearPrompt(), 3500);
    return () => clearTimeout(t);
  }, [promptMessage, clearPrompt]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setLoginOpen(false); // Close modal on success
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      alert("Kayıt başarılı! Lütfen e-postanızı onaylayın.");
      setAuthTab("login");
      setEmail("");
      setPassword("");
      setFullName("");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (loginRef.current && !loginRef.current.contains(e.target as Node)) {
        setLoginOpen(false);
        clearPrompt();
      }
    }
    if (loginOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [loginOpen]);

  return (
    <>
      {/* Auth Toast */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-400 ease-out ${
          promptMessage
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 bg-neutral-900 text-white px-5 py-3.5 shadow-xl">
          <User size={15} strokeWidth={1.5} className="text-white/60 shrink-0" />
          <p className="text-[11px] tracking-[0.15em] whitespace-nowrap">{promptMessage}</p>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out overflow-hidden ${scrolled
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
              className="text-[22px] md:text-[28px] lg:text-[32px] tracking-[0.35em] font-medium select-none font-playfair"
            >
              EL&apos;S
            </h1>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* Utility Icons - right */}
          <div className="absolute right-6 md:right-10 lg:right-16 flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group"
              aria-label="Ara"
            >
              <Search size={19} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-neutral-500" />
            </button>

            {/* User — sadece desktop */}
            <div className="relative group/auth hidden md:block">
              <button
                onClick={() => user ? handleLogout() : setLoginOpen(true)}
                className="relative p-1.5 transition-all duration-300 hover:scale-110 group flex items-center gap-2"
                aria-label="Hesabım"
              >
                {user ? (
                  <>
                    <span className="text-[10px] tracking-wider text-neutral-600 hidden lg:block">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                    <LogOut size={19} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-red-500" />
                  </>
                ) : (
                  <User size={19} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-neutral-500" />
                )}
              </button>
            </div>

            {/* Favorites — sadece desktop */}
            <Link
              href="/favorilerim"
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group hidden md:block"
              aria-label="Favorilerim"
            >
              <Heart size={19} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-neutral-500" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center animate-in zoom-in-0 duration-300 font-sans">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart — her zaman */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 transition-all duration-300 hover:scale-110 group"
              aria-label="Sepetim"
            >
              <ShoppingBag size={19} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-neutral-500" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center font-sans">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-[1px] bg-neutral-200 mx-6 md:mx-10 lg:mx-16" />

        {/* Navigation links - desktop */}
        <nav className="hidden md:block overflow-x-auto">
          <ul className="flex items-center justify-center gap-6 lg:gap-10 px-6 md:px-10 lg:px-16 py-3">
            {navLinks.map((link) => (
              <li
                key={link.href}
                onMouseEnter={() => {
                  if (megaTimeout.current) clearTimeout(megaTimeout.current);
                  setMegaOpen(link.mega ? link.href : null);
                  setHoveredLink(link.href);
                }}
                onMouseLeave={() => {
                  megaTimeout.current = setTimeout(() => {
                    setMegaOpen(null);
                    setHoveredLink(null);
                  }, 100);
                }}
              >
                <Link
                  href={link.href}
                  className="relative px-2.5 lg:px-3.5 py-2 text-[10.5px] lg:text-[11px] tracking-[0.18em] font-medium text-neutral-800 transition-colors duration-300 hover:text-black whitespace-nowrap group"
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1px] bg-black transition-all duration-300 ease-out ${hoveredLink === link.href ? "w-[70%]" : "w-0"
                      }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom separator */}
        <div
          className={`h-[1px] transition-all duration-500 ${scrolled ? "bg-neutral-100" : "bg-neutral-200"
            }`}
        />
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          <div className="bg-white border-b border-neutral-200 px-6 md:px-10 lg:px-16 py-5 flex items-center gap-4 shadow-sm">
            <Search size={18} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün, kategori veya marka ara..."
                className="w-full text-sm tracking-wide outline-none placeholder:text-neutral-400"
              />
            </form>
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} aria-label="Kapat">
              <X size={20} strokeWidth={1.5} className="text-neutral-500 hover:text-black transition-colors" />
            </button>
          </div>
          <div className="flex-1 bg-black/20 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} />
        </div>
      )}

      {/* Mega Menu */}
      {navLinks.map((link) =>
        link.mega ? (
          <div
            key={link.href}
            onMouseEnter={() => {
              if (megaTimeout.current) clearTimeout(megaTimeout.current);
              setMegaOpen(link.href);
            }}
            onMouseLeave={() => {
              megaTimeout.current = setTimeout(() => setMegaOpen(null), 100);
            }}
            className={`fixed left-0 right-0 z-40 bg-white border-t border-neutral-100 shadow-xl transition-all duration-400 ease-out ${megaOpen === link.href
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            style={{ top: "var(--navbar-height, 130px)" }}
          >
            <div className="max-w-7xl mx-auto px-10 lg:px-16 py-10 flex gap-16">
              {/* Columns */}
              <div className="flex gap-16 flex-1">
                {link.mega.columns.map((col) => (
                  <div key={col.title}>
                    <h4 className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-5 font-medium">
                      {col.title}
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {col.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setMegaOpen(null)}
                            className="text-[13px] text-neutral-700 hover:text-black transition-colors duration-200 tracking-wide font-light"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Feature image */}
              <div className="hidden lg:block w-[200px] flex-shrink-0">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <Image
                    src={link.mega.image}
                    alt={link.mega.imageLabel}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mt-3 text-center">
                  {link.mega.imageLabel}
                </p>
              </div>
            </div>
          </div>
        ) : null
      )}

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-400 md:hidden ${mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-[340px] bg-white shadow-2xl transition-transform duration-500 ease-out md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
            <h2
              className="text-[20px] tracking-[0.35em] font-medium font-playfair"
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
            <button
              onClick={() => { setMobileMenuOpen(false); user ? handleLogout() : setLoginOpen(true); }}
              className="p-2 transition-all duration-300 hover:scale-110"
              aria-label="Hesabım"
            >
              {user ? <LogOut size={20} strokeWidth={1.5} /> : <User size={20} strokeWidth={1.5} />}
            </button>
            <Link
              href="/favorilerim"
              onClick={() => setMobileMenuOpen(false)}
              className="relative p-2 transition-all duration-300 hover:scale-110"
              aria-label="Favorilerim"
            >
              <Heart size={20} strokeWidth={1.5} />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 right-0 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center font-sans">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }}
              className="relative p-2 transition-all duration-300 hover:scale-110"
              aria-label="Sepetim"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 right-0 w-4 h-4 bg-black text-white text-[9px] font-medium rounded-full flex items-center justify-center font-sans">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Login Full Page Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-400 ${loginOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => { setLoginOpen(false); clearPrompt(); }}
      />

      {/* Login Panel - slides from right */}
      <div
        ref={loginRef}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full xs:w-[90%] sm:w-[440px] bg-white shadow-2xl transition-transform duration-500 ease-out ${loginOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
            <h2 className="text-[13px] tracking-[0.25em] font-medium uppercase">Hesabım</h2>
            <button
              onClick={() => { setLoginOpen(false); clearPrompt(); }}
              className="p-1.5 transition-transform duration-300 hover:rotate-90"
              aria-label="Kapat"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-neutral-100">
            <button
              onClick={() => setAuthTab("login")}
              className={`flex-1 py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${authTab === "login"
                  ? "text-black border-b-2 border-black"
                  : "text-neutral-400 hover:text-neutral-600"
                }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setAuthTab("register")}
              className={`flex-1 py-4 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${authTab === "register"
                  ? "text-black border-b-2 border-black"
                  : "text-neutral-400 hover:text-neutral-600"
                }`}
            >
              Kayıt Ol
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col px-6 sm:px-8 md:px-14 overflow-y-auto py-8">
            <div className="max-w-sm mx-auto w-full">

              {authTab === "login" ? (
                <>
                  <h3 className="text-[24px] md:text-[28px] font-light font-playfair tracking-[0.04em] mb-2">
                    Hoş Geldiniz
                  </h3>
                  <p className="text-[12px] text-neutral-400 font-light mb-10">
                    EL&apos;S hesabınıza giriş yapın
                  </p>

                  <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {error && (
                      <div className="bg-red-50 text-red-500 text-[11px] p-3 border border-red-100">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        E-posta
                      </label>
                      <div className="relative">
                        <Mail size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ornek@email.com"
                          className="w-full pl-7 pr-4 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-7 pr-10 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 accent-black" />
                        <span className="text-[11px] tracking-wide text-neutral-500">Beni hatırla</span>
                      </label>
                      <Link href="#" className="text-[11px] tracking-wide text-neutral-500 hover:text-black transition-colors duration-300">
                        Şifremi unuttum
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300 mt-4 disabled:bg-neutral-400 flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 size={14} className="animate-spin" />}
                      Giriş Yap
                    </button>
                  </form>

                  <p className="text-[11px] text-neutral-400 font-light mt-4 leading-relaxed">
                    Giriş yaparak{" "}
                    <Link href="/kullanim-kosullari" onClick={() => setLoginOpen(false)} className="underline underline-offset-2 hover:text-neutral-700 transition-colors">
                      kullanım koşullarını
                    </Link>{" "}
                    kabul etmiş olursunuz.
                  </p>

                  <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-[1px] bg-neutral-200" />
                    <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">veya</span>
                    <div className="flex-1 h-[1px] bg-neutral-200" />
                  </div>

                  <button className="w-full py-3 border border-neutral-200 text-[11px] tracking-[0.15em] uppercase font-medium hover:border-black hover:bg-neutral-50 transition-all duration-300">
                    Google ile Giriş Yap
                  </button>

                  <p className="text-center text-[12px] text-neutral-400 mt-8">
                    Hesabınız yok mu?{" "}
                    <button onClick={() => setAuthTab("register")} className="text-black font-medium hover:underline">
                      Kayıt Ol
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-[24px] md:text-[28px] font-light font-playfair tracking-[0.04em] mb-2">
                    Kayıt Ol
                  </h3>
                  <p className="text-[12px] text-neutral-400 font-light mb-10">
                    EL&apos;S dünyasına katılın
                  </p>

                  <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    {error && (
                      <div className="bg-red-50 text-red-500 text-[11px] p-3 border border-red-100">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        Ad Soyad
                      </label>
                      <div className="relative">
                        <User size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Adınız Soyadınız"
                          className="w-full pl-7 pr-4 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        E-posta
                      </label>
                      <div className="relative">
                        <Mail size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ornek@email.com"
                          className="w-full pl-7 pr-4 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        Şifre
                      </label>
                      <div className="relative">
                        <Lock size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-7 pr-10 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2 block">
                        Şifre Tekrar
                      </label>
                      <div className="relative">
                        <Lock size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-300" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          className="w-full pl-7 pr-4 py-2.5 text-[13px] tracking-wide border-b border-neutral-200 focus:border-black outline-none transition-colors duration-300 bg-transparent"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300 mt-4 disabled:bg-neutral-400 flex items-center justify-center gap-2"
                    >
                      {loading && <Loader2 size={14} className="animate-spin" />}
                      Kayıt Ol
                    </button>
                  </form>

                  <p className="text-[11px] text-neutral-400 font-light mt-4 leading-relaxed">
                    Kayıt olarak{" "}
                    <Link href="/kullanim-kosullari" onClick={() => setLoginOpen(false)} className="underline underline-offset-2 hover:text-neutral-700 transition-colors">
                      kullanım koşullarını
                    </Link>{" "}
                    kabul etmiş olursunuz.
                  </p>

                  <div className="flex items-center gap-4 my-8">
                    <div className="flex-1 h-[1px] bg-neutral-200" />
                    <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">veya</span>
                    <div className="flex-1 h-[1px] bg-neutral-200" />
                  </div>

                  <button className="w-full py-3 border border-neutral-200 text-[11px] tracking-[0.15em] uppercase font-medium hover:border-black hover:bg-neutral-50 transition-all duration-300">
                    Google ile Kayıt Ol
                  </button>

                  <p className="text-center text-[12px] text-neutral-400 mt-8">
                    Zaten hesabınız var mı?{" "}
                    <button onClick={() => setAuthTab("login")} className="text-black font-medium hover:underline">
                      Giriş Yap
                    </button>
                  </p>
                </>
              )}

            </div>
          </div>

          {/* Bottom */}
          <div className="px-8 py-6 border-t border-neutral-100 text-center">
            <p className="text-[10px] tracking-[0.1em] text-neutral-400">
              Giriş yaparak <Link href="#" className="underline hover:text-black transition-colors">kullanım koşullarını</Link> kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Cart Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-400 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 bottom-0 z-[70] w-full xs:w-[90%] sm:w-[440px] bg-white shadow-2xl transition-transform duration-500 ease-out ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
            <h2 className="text-[13px] tracking-[0.25em] font-medium uppercase">
              Sepetim {totalCount > 0 && <span className="text-neutral-400 font-light">({totalCount})</span>}
            </h2>
            <button onClick={() => setCartOpen(false)} className="p-1.5 transition-transform duration-300 hover:rotate-90" aria-label="Kapat">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
                <ShoppingBag size={48} strokeWidth={0.75} className="text-neutral-200" />
                <p className="text-[13px] font-light text-neutral-400">Sepetiniz boş</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-2 px-8 py-3 bg-black text-white text-[11px] tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors"
                >
                  Alışverişe Başla
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <li key={`${item.id}-${item.size}`} className="flex gap-4 px-8 py-5">
                    <div className="relative w-20 aspect-[3/4] flex-shrink-0 bg-neutral-50 overflow-hidden">
                      <Image src={item.image_url} alt={item.name} fill className="object-cover object-top" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">{item.category}</p>
                        <p className="text-[13px] font-light text-neutral-900 mt-0.5 font-playfair">{item.name}</p>
                        {item.size && (
                          <p className="text-[11px] text-neutral-400 mt-0.5">Beden: {item.size}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500">
                            −
                          </button>
                          <span className="w-8 text-center text-[12px]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-neutral-50 transition-colors text-neutral-500">
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-[13px] font-medium">
                            {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                          </p>
                          <button onClick={() => removeItem(item.id, item.size)} className="text-neutral-300 hover:text-red-400 transition-colors">
                            <X size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-8 py-6 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] tracking-[0.15em] text-neutral-500 uppercase">Toplam</span>
                <span className="text-[16px] font-medium">
                  {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(totalPrice)}
                </span>
              </div>
              <button className="w-full py-4 bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-colors duration-300">
                Ödemeye Geç
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
