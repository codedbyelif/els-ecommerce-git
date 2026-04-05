"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { Loader2, Heart, ShoppingBag } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export default function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { favorites, loading: favoritesLoading } = useFavorites();

  useEffect(() => {
    if (!favoritesLoading) {
      if (favorites.length > 0) {
        fetchFavoriteProducts();
      } else {
        setFavoriteProducts([]);
        setLoadingProducts(false);
      }
    }
  }, [favorites, favoritesLoading]);

  const fetchFavoriteProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in("id", favorites);

    if (!error && data) {
      setFavoriteProducts(data);
    }
    setLoadingProducts(false);
  };

  const isLoading = favoritesLoading || loadingProducts;

  return (
    <main className="pt-[120px] md:pt-[140px] pb-20 bg-white min-h-screen">
      <div className="px-6 md:px-10 lg:px-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] text-neutral-400 mb-2 uppercase">
            <Link href="/" className="hover:text-black transition-colors">Ana Sayfa</Link>
            {" "}&rsaquo;{" "}
            <span>Favorilerim</span>
          </p>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[28px] md:text-[36px] font-light font-playfair tracking-[0.04em] text-neutral-900 mt-2">
                Favorilerim
              </h1>
              <p className="text-[12px] text-neutral-400 mt-1 uppercase tracking-widest">
                {isLoading ? "Yükleniyor..." : `${favoriteProducts.length} Ürün Arzulandı`}
              </p>
            </div>
          </div>
          <div className="h-[1px] bg-neutral-100 mt-8" />
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="animate-spin text-neutral-200" size={48} />
              <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-light">Arşiviniz Yükleniyor</p>
            </div>
          ) : favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="relative mb-8">
                <Heart size={64} strokeWidth={0.5} className="text-neutral-100" />
                <Heart size={32} strokeWidth={1} className="text-neutral-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <h2 className="text-[20px] font-light font-playfair tracking-wide text-neutral-900 mb-4">
                Henüz Favori Ürününüz Yok
              </h2>
              <p className="text-[12px] text-neutral-400 max-w-xs mx-auto mb-10 font-light leading-relaxed">
                Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilir ve satın alabilirsiniz.
              </p>
              <Link 
                href="/kadin" 
                className="px-10 py-4 bg-black text-white text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-neutral-800 transition-all duration-500 shadow-lg shadow-black/10"
              >
                Koleksiyonu Keşfet
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
