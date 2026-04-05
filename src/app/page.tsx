"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const heroSlides = [
  {
    video: "/rose.mp4",
    label: "Kadın Koleksiyonu",
    sub: "İlkbahar / Yaz 2026",
    href: "/kadin",
    cta: "Koleksiyonu Keşfet",
  },
  {
    video: "/jungkook.mp4",
    label: "Erkek Koleksiyonu",
    sub: "İlkbahar / Yaz 2026",
    href: "/erkek",
    cta: "Koleksiyonu Keşfet",
  },
];

const splitBanner = [
  { image: "/kadin-product-1.jpg",  label: "KADIN", sub: "İlkbahar / Yaz 2026", href: "/kadin" },
  { image: "/erkek-takim-1-b.jpg",  label: "ERKEK", sub: "İlkbahar / Yaz 2026", href: "/erkek" },
];

const featured = [
  { image: "/canta-5.jpg",        title: "Birkin 30",          category: "Çanta",    href: "/canta" },
  { image: "/ayakkabi-1.jpg",     title: "Opyum Sandalet",     category: "Ayakkabı", href: "/ayakkabi" },
  { image: "/aksesuar-3.jpg",     title: "Pırlanta Saat",      category: "Aksesuar", href: "/aksesuar" },
  { image: "/kadin-ceket-1.jpg",  title: "Korse Deri Ceket",  category: "Kadın",    href: "/kadin/ceket" },
  { image: "/parfum-2.jpg",       title: "Coco Mademoiselle", category: "Parfüm",   href: "/parfum" },
  { image: "/erkek-takim-3.jpg",  title: "Lacivert Kruvaze",  category: "Erkek",    href: "/erkek/takim" },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = heroSlides[slide];

  const [twIndex, setTwIndex] = useState(0);
  const [twText, setTwText] = useState("");
  const [twDeleting, setTwDeleting] = useState(false);

  useEffect(() => {
    const texts = ["Zarafet Zamansızdır.", "Stil Bir Tutumdur.", "Lüks Bir Duygudur."];
    let timeout: ReturnType<typeof setTimeout>;

    if (!twDeleting && twText === texts[twIndex]) {
      timeout = setTimeout(() => setTwDeleting(true), 2500);
    } else if (twDeleting && twText === "") {
      setTwDeleting(false);
      setTwIndex(i => (i + 1) % texts.length);
    } else if (twDeleting) {
      timeout = setTimeout(() => setTwText(t => t.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(() => setTwText(texts[twIndex].slice(0, twText.length + 1)), 80);
    }

    return () => clearTimeout(timeout);
  }, [twText, twDeleting, twIndex]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={s.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center text-white">
          <p className="text-[10px] tracking-[0.45em] uppercase text-white/60 mb-3">
            {current.sub}
          </p>
          <h1 className="text-[36px] md:text-[56px] lg:text-[72px] font-light font-playfair tracking-[0.06em] leading-none mb-8">
            {current.label}
          </h1>
          <Link
            href={current.href}
            className="group flex items-center gap-3 border border-white/60 px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500"
          >
            {current.cta}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-[1px] transition-all duration-500 ${i === slide ? "w-8 bg-white" : "w-4 bg-white/40"}`}
            />
          ))}
        </div>

        <div className={`absolute bottom-8 right-8 flex flex-col items-center gap-2 transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}>
          <span className="text-[9px] tracking-[0.3em] text-white/50 uppercase rotate-90 origin-center mb-4">Scroll</span>
          <ChevronDown size={16} strokeWidth={1} className="text-white/50 animate-bounce" />
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="py-3 bg-black overflow-hidden">
        <div className="flex animate-[marqueeLeft_20s_linear_infinite] whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-6">
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">Yeni Sezon</span>
              <span className="text-white/20">◆</span>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">İlkbahar / Yaz 2026</span>
              <span className="text-white/20">◆</span>
              <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase">EL&apos;S</span>
              <span className="text-white/20">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── SPLIT BANNER ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {splitBanner.map((item, i) => (
          <Link key={i} href={item.href} className="group relative overflow-hidden h-[70vh] md:h-[85vh]">
            <Image
              src={item.image}
              alt={item.label}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-14 text-white text-center">
              <p className="text-[9px] tracking-[0.5em] text-white/60 uppercase mb-3">{item.sub}</p>
              <h2 className="text-[32px] md:text-[44px] font-light font-playfair tracking-[0.12em] mb-6">{item.label}</h2>
              <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase border-b border-white/50 pb-0.5 group-hover:border-white transition-colors duration-300">
                Keşfet <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── STATEMENT ── */}
      <section className="py-24 md:py-32 px-6 bg-white text-center">
        <p className="text-[10px] tracking-[0.5em] text-neutral-300 uppercase mb-6">EL&apos;S — Manifesto</p>
        <blockquote className="text-[22px] md:text-[32px] lg:text-[40px] font-light font-playfair tracking-[0.03em] text-neutral-900 max-w-4xl mx-auto leading-relaxed">
          &ldquo;Moda geçer, stil kalır.&rdquo;
        </blockquote>
        <div className="w-12 h-[1px] bg-neutral-200 mx-auto mt-10" />
      </section>

      {/* ── FEATURED GRID ── */}
      <section className="pb-24 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-2">Seçkiler</p>
              <h2 className="text-[26px] md:text-[34px] font-light font-playfair tracking-[0.04em]">Bu Sezonun Parçaları</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {featured.map((item, i) => (
              <Link key={i} href={item.href} className="group relative overflow-hidden bg-neutral-50">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <p className="text-[9px] tracking-[0.3em] text-white/60 uppercase">{item.category}</p>
                    <p className="text-[14px] text-white font-light font-playfair mt-1">{item.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL BANNER ── */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/kadin-bluz-1.jpg"
          alt="EL'S Koleksiyon"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-20 lg:px-32 text-white max-w-2xl">
          <p className="text-[9px] tracking-[0.5em] text-white/50 uppercase mb-5">Yeni Koleksiyon</p>
          <h2 className="text-[28px] md:text-[44px] font-light font-playfair tracking-[0.04em] leading-tight mb-6">
            Kadın Bluz<br />& Gömlek
          </h2>
          <Link
            href="/kadin/bluz"
            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase border-b border-white/50 pb-1 hover:border-white transition-colors duration-300"
          >
            Koleksiyonu Gör
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-20 bg-neutral-50 overflow-hidden border-y border-neutral-100">
        <div className="flex flex-col gap-4">
          <div className="flex animate-[marqueeLeft_35s_linear_infinite] whitespace-nowrap">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="flex items-center gap-10 mx-10">
                <span className="text-[44px] md:text-[64px] font-light font-playfair text-neutral-800">Zarafet</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair italic text-neutral-300">Tutku</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair text-neutral-800">Lüks</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair italic text-neutral-300">EL&apos;S</span>
                <span className="text-neutral-300 text-xl">◆</span>
              </span>
            ))}
          </div>
          <div className="flex animate-[marqueeRight_28s_linear_infinite] whitespace-nowrap">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="flex items-center gap-10 mx-10">
                <span className="text-[44px] md:text-[64px] font-light font-playfair italic text-neutral-300">Moda</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair text-neutral-800">Cesaret</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair italic text-neutral-300">Stil</span>
                <span className="text-neutral-300 text-xl">◆</span>
                <span className="text-[44px] md:text-[64px] font-light font-playfair text-neutral-800">EL&apos;S</span>
                <span className="text-neutral-300 text-xl">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING VIDEO ── */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/8VorjBczswQ?si=8h6BOpmphX7-jEgB&autoplay=1&mute=1&loop=1&playlist=8VorjBczswQ&controls=0&showinfo=0&rel=0&disablekb=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] border-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-[9px] tracking-[0.6em] text-white/40 uppercase mb-8">İlkbahar / Yaz 2026</p>
          <h2 className="text-[36px] md:text-[58px] lg:text-[72px] font-light font-playfair tracking-[0.04em] leading-tight mb-8 min-h-[1.2em]">
            {twText}
            <span className="animate-pulse">|</span>
          </h2>
          <div className="w-10 h-[1px] bg-white/30" />
        </div>
      </section>
    </>
  );
}
