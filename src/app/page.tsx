import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Video Section */}
      <section className="pt-[100px] md:pt-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="relative overflow-hidden aspect-[9/12] md:aspect-auto md:h-[70vh]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/jungkook.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative overflow-hidden aspect-[9/12] md:aspect-auto md:h-[70vh]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/rose.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-28 px-6 md:px-10 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.35em] text-neutral-400 mb-3 uppercase">Koleksiyonlar</p>
            <h3
              className="text-[24px] md:text-[30px] tracking-[0.06em] font-light text-neutral-900"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Öne Çıkanlar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Moda", subtitle: "İlkbahar / Yaz 2026", image: "from-neutral-200 to-neutral-300" },
              { title: "Fine Jewellery", subtitle: "Haute Joaillerie", image: "from-neutral-100 to-neutral-200" },
              { title: "Parfüm", subtitle: "N°5 Koleksiyonu", image: "from-neutral-200 to-neutral-100" },
            ].map((cat, index) => (
              <Link
                key={index}
                href="#"
                className="group block relative overflow-hidden"
              >
                <div className={`aspect-[3/4] bg-gradient-to-b ${cat.image} transition-transform duration-700 group-hover:scale-105`}>
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
    </>
  );
}
