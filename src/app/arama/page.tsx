"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

function AramaResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) return;
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${q}%,category.ilike.%${q}%`)
      .then(({ data, error }) => {
        if (!error && data) setProducts(data);
        setLoading(false);
      });
  }, [q]);

  return (
    <main className="pt-[120px] md:pt-[140px] pb-20 bg-white min-h-screen">
      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] text-neutral-400 mb-2 uppercase">
            <Link href="/" className="hover:text-black transition-colors">Ana Sayfa</Link>
            {" "}&rsaquo;{" "}Arama
          </p>
          <h1 className="text-2xl md:text-3xl font-medium tracking-wide font-playfair mb-2">
            Arama Sonuçları
          </h1>
          {q && (
            <p className="text-sm text-neutral-500 mb-10">
              &ldquo;{q}&rdquo; için {loading ? "aranıyor..." : `${products.length} sonuç bulundu`}
            </p>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 size={28} strokeWidth={1.5} className="animate-spin text-neutral-400" />
            </div>
          ) : products.length === 0 && q ? (
            <div className="text-center py-32">
              <p className="text-neutral-400 text-sm tracking-wide">Sonuç bulunamadı.</p>
              <p className="text-neutral-300 text-xs mt-2">Farklı bir arama terimi deneyin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AramaPage() {
  return (
    <Suspense>
      <AramaResults />
    </Suspense>
  );
}
