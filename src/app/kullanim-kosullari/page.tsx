import Link from "next/link";

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-[10px] tracking-[0.45em] text-neutral-400 uppercase mb-4">Yasal</p>
        <h1 className="text-[36px] font-light font-playfair text-neutral-900 mb-12 leading-tight">
          Kullanım Koşulları
        </h1>

        <div className="space-y-10 text-[14px] text-neutral-500 font-light leading-relaxed">
          <section>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-800 mb-3">1. Açık Kaynak Proje</h2>
            <p>
              Bu platform açık kaynaklı bir projedir. Kaynak koduna{" "}
              <a
                href="https://github.com/codedbyelif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
              >
                github.com/codedbyelif
              </a>{" "}
              adresinden ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-800 mb-3">2. Telif Hakkı</h2>
            <p>
              Bu proje <strong className="text-neutral-700 font-medium">Elif Kaynar</strong> tarafından tasarlanmış ve geliştirilmiştir.
              Tüm tasarım, kod ve içerik hakları saklıdır. Projeyi kullanmak, kopyalamak veya dağıtmak için
              önceden yazılı izin almanız gerekmektedir.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-800 mb-3">3. İzin Talebi</h2>
            <p>
              Bu projeyi ticari veya kişisel amaçlarla kullanmak istiyorsanız lütfen{" "}
              <a
                href="https://github.com/codedbyelif"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
              >
                GitHub
              </a>{" "}
              üzerinden iletişime geçin. İzinsiz kullanım hukuki sonuçlar doğurabilir.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-800 mb-3">4. Sorumluluk Reddi</h2>
            <p>
              Platform eğitim ve portföy amaçlı geliştirilmiştir. Gerçek bir satış platformu değildir.
              Olası hatalar veya veri kayıpları için sorumluluk kabul edilmez.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-neutral-800 mb-3">5. Değişiklikler</h2>
            <p>
              Bu koşullar önceden bildirim yapılmaksızın değiştirilebilir.
              Güncel koşullar her zaman bu sayfada yayınlanır.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-10 border-t border-neutral-100 flex items-center justify-between">
          <p className="text-[11px] text-neutral-400">© 2026 EL&apos;S — Elif Kaynar</p>
          <Link
            href="/"
            className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-800 transition-colors duration-300"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
