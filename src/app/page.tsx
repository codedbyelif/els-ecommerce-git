import Link from "next/link";
import Image from "next/image";
import SaleBanner from "@/components/SaleBanner";

export default function Home() {
  return (
    <>
      {/* Video Section */}
      <section className="pt-[100px] md:pt-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="group relative overflow-hidden aspect-[9/12] md:aspect-auto md:h-[85vh] cursor-pointer">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/jungkook.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-[28px] md:text-[36px] tracking-[0.3em] font-light font-playfair drop-shadow-lg">
                ERKEK
              </span>
            </div>
          </div>
          <div className="group relative overflow-hidden aspect-[9/12] md:aspect-auto md:h-[85vh] cursor-pointer">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/rose.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-white text-[28px] md:text-[36px] tracking-[0.3em] font-light font-playfair drop-shadow-lg">
                KADIN
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <SaleBanner />

      {/* Featured Categories */}
      <section className="py-12 md:py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.35em] text-neutral-400 mb-3 uppercase">Koleksiyonlar</p>
            <h3
              className="text-[24px] md:text-[30px] tracking-[0.06em] font-light text-neutral-900 font-playfair"
            >
              Öne Çıkanlar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Makyaj", subtitle: "İlkbahar / Yaz 2026", image: "/jisoo.jpeg" },
              { title: "Parfüm", subtitle: "Haute Joaillerie", image: "/p.jpeg" },
              { title: "Ayakkabı", subtitle: "N°5 Koleksiyonu", image: "/Black and white.jpeg" },
            ].map((cat, index) => (
              <Link
                key={index}
                href="#"
                className="group block relative overflow-hidden"
              >
                <div className="relative aspect-[3/4] transition-transform duration-700 group-hover:scale-105">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-neutral-200 to-neutral-300" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>
                <div className="mt-5 text-center">
                  <h4 className="text-[12px] tracking-[0.2em] font-medium text-neutral-900 mb-1.5">
                    {cat.title.toUpperCase()}
                  </h4>
                  <p className="text-[11px] tracking-wide text-neutral-400 font-light">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Makyaj Video Section */}
      <section className="w-full">
        <div className="group relative overflow-hidden h-[60vh] md:h-[75vh] cursor-pointer">
          <iframe
            src="https://www.youtube.com/embed/MM7GHU-pJXM?si=NV0gqzGY94um0G-j&autoplay=1&mute=1&loop=1&playlist=MM7GHU-pJXM&controls=0&showinfo=0"
            title="Makyaj"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full object-cover border-0 scale-150 pointer-events-none"
          />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 pointer-events-auto" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <span className="text-white text-[28px] md:text-[36px] tracking-[0.3em] font-light font-playfair drop-shadow-lg">
              ÇANTA
            </span>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="relative flex flex-col gap-6">
          {/* First row - scrolling left */}
          <div className="flex animate-[marqueeLeft_25s_linear_infinite] whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 mx-8">
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] text-neutral-900">
                  Zarafet
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] italic text-neutral-400">
                  Tutku
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] text-neutral-900">
                  Lüks
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] italic text-neutral-400">
                  EL&apos;S
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
              </span>
            ))}
          </div>

          {/* Second row - scrolling right */}
          <div className="flex animate-[marqueeRight_30s_linear_infinite] whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 mx-8">
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] italic text-neutral-400">
                  Moda
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] text-neutral-900">
                  Cesaret
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] italic text-neutral-400">
                  Stil
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
                <span className="text-[40px] md:text-[64px] lg:text-[80px] font-light font-playfair tracking-[0.06em] text-neutral-900">
                  EL&apos;S
                </span>
                <span className="text-[20px] md:text-[28px] text-neutral-300">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Video Banner */}
      <section className="w-full relative overflow-hidden h-[35vh] md:h-[40vh] group cursor-pointer">
        <iframe
          src="https://www.youtube.com/embed/8VorjBczswQ?si=BaTY7_-iuvcWvodt&autoplay=1&mute=1&loop=1&playlist=8VorjBczswQ&controls=0&showinfo=0"
          title="EL'S Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] border-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white text-[28px] md:text-[36px] tracking-[0.3em] font-light font-playfair drop-shadow-lg">
            AKSESUAR
          </span>
        </div>
      </section>
    </>
  );
}
