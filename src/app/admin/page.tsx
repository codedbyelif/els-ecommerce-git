"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const typewriterLines = [
  "Mağaza yönetimini tek yerden yapın.",
  "Ürünleri kolayca güncelleyin.",
  "Siparişleri anlık takip edin.",
  "Stok yönetimi artık kolay.",
  "Zarafeti yönetmek bu kadar sade.",
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typewriterLines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), 2800);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % typewriterLines.length);
    } else if (deleting) {
      timeout = setTimeout(() => setDisplayed((t) => t.slice(0, -1)), 35);
    } else {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        70
      );
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, lineIndex]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("admin_auth", "1");
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sol panel */}
      <div className="hidden lg:flex w-[52%] bg-neutral-950 flex-col justify-between p-16 relative overflow-hidden">
        {/* İnce grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px), repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        <p className="relative text-white text-[13px] tracking-[0.5em] font-light">EL&apos;S</p>

        <div className="relative">
          <p className="text-neutral-500 text-[10px] tracking-[0.45em] uppercase mb-6">
            Yönetim Paneli
          </p>
          <div className="min-h-[100px]">
            <h2 className="text-white text-[36px] font-light leading-tight font-playfair">
              {displayed}
              <span className="inline-block w-[2px] h-[34px] bg-white/70 ml-1 align-middle animate-pulse" />
            </h2>
          </div>

          <div className="mt-10 flex gap-1.5">
            {typewriterLines.map((_, i) => (
              <div
                key={i}
                className={`h-[1px] transition-all duration-500 ${
                  i === lineIndex ? "w-6 bg-white/60" : "w-3 bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="relative text-neutral-600 text-[11px] tracking-wide">
          © 2026 EL&apos;S. Tüm hakları saklıdır.
        </p>
      </div>

      {/* Sağ — form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-white">
        <div className="w-full max-w-sm">
          <p className="text-[11px] tracking-[0.5em] text-neutral-400 uppercase mb-10 lg:hidden">
            EL&apos;S
          </p>

          <p className="text-[10px] tracking-[0.45em] text-neutral-400 uppercase mb-3">
            Yönetici Girişi
          </p>
          <h1 className="text-[30px] font-light text-neutral-900 mb-1 font-playfair">
            Hoş geldin.
          </h1>
          <p className="text-[13px] text-neutral-400 font-light mb-12">
            Devam etmek için şifrenizi girin.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase block mb-3">
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="••••••••"
                autoFocus
                className="w-full border-b border-neutral-200 px-0 py-3.5 text-[15px] font-light focus:outline-none focus:border-neutral-800 transition-colors bg-transparent placeholder:text-neutral-300"
              />
              {error && (
                <p className="text-[12px] text-red-400 mt-2.5 tracking-wide">
                  Hatalı şifre. Tekrar deneyin.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-4 bg-neutral-900 text-white text-[10px] tracking-[0.35em] uppercase font-medium hover:bg-black transition-colors duration-300"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
