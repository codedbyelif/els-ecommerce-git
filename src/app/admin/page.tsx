"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

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
      {/* Sol — dekoratif panel */}
      <div className="hidden lg:flex flex-1 bg-neutral-900 flex-col justify-between p-16">
        <p className="text-white text-[15px] tracking-[0.4em] font-light">EL&apos;S</p>
        <div>
          <p className="text-neutral-500 text-[11px] tracking-[0.3em] uppercase mb-3">Yönetim Paneli</p>
          <h2 className="text-white text-[38px] font-light leading-tight">
            Mağaza yönetimini<br />tek yerden yapın.
          </h2>
        </div>
        <p className="text-neutral-600 text-[11px]">© 2026 EL&apos;S. Tüm hakları saklıdır.</p>
      </div>

      {/* Sağ — form */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <p className="text-[11px] tracking-[0.4em] text-neutral-400 uppercase mb-2 lg:hidden">EL&apos;S</p>
          <h1 className="text-[32px] font-light text-neutral-900 mb-2">Hoş geldin</h1>
          <p className="text-[13px] text-neutral-400 font-light mb-12">Devam etmek için şifrenizi girin.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <label className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase block mb-3">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="••••••••"
                autoFocus
                className="w-full border border-neutral-200 px-5 py-4 text-[15px] font-light focus:outline-none focus:border-neutral-800 transition-colors bg-transparent placeholder:text-neutral-300"
              />
              {error && (
                <p className="text-[12px] text-red-400 mt-2.5">Hatalı şifre. Tekrar deneyin.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-neutral-900 text-white text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-black transition-colors duration-300"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
