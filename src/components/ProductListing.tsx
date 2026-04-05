"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import { Loader2, ChevronRight } from "lucide-react";
import { getCategoryBySlug, CategoryDef } from "@/lib/categories";

interface ProductListingProps {
  mainCategory: string; // e.g., "Kadın", "Erkek", "Parfüm"
  subCategory?: string; // e.g., "Elbise", "Gömlek"
  subCategorySlug?: string;
}

export default function ProductListing({ mainCategory, subCategory, subCategorySlug }: ProductListingProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");

  // Handle Turkish İ/ı vs I/i mapping for keys
  const mainCategoryKey = mainCategory.toLowerCase().replace(/ı/g, 'i');
  
  // Categorization Logic
  const isMainCategoryOnly = !subCategorySlug;
  const categoryDef = subCategorySlug ? getCategoryBySlug(mainCategoryKey, subCategorySlug) : undefined;
  
  const dbCategory = categoryDef ? categoryDef.dbCategory : mainCategory;
  const displayTitle = subCategory || mainCategory;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase.from("products").select("*");

      if (isMainCategoryOnly) {
        query = query.ilike("category", `${mainCategory}%`);
      } else if (subCategorySlug === "yeni") {
        query = query.ilike("category", `${mainCategory}%`).eq("tag", "Yeni");
      } else if (subCategorySlug === "cok-satan") {
        query = query.ilike("category", `${mainCategory}%`).eq("tag", "Çok Satan");
      } else if (subCategorySlug === "koleksiyon") {
        query = query.ilike("category", `${mainCategory}%`);
      } else {
        query = query.eq("category", dbCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
      } else if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [mainCategory, subCategorySlug, dbCategory, isMainCategoryOnly]);

  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => (a.tag === "Yeni" ? -1 : 1));
    }
    return sorted;
  };

  const sortedProducts = getSortedProducts();

  return (
    <main className="pt-[120px] md:pt-[140px] pb-20 bg-white min-h-screen">
      {/* Breadcrumbs & Header */}
      <div className="px-6 md:px-10 lg:px-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-4">
             <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-neutral-400 uppercase">
                <a href="/" className="hover:text-black transition-colors font-medium">Ana Sayfa</a>
                <ChevronRight size={10} strokeWidth={3} />
                {subCategorySlug ? (
                  <>
                    <a href={`/${mainCategoryKey}`} className="hover:text-black transition-colors font-medium">{mainCategory}</a>
                    <ChevronRight size={10} strokeWidth={3} />
                    <span className="text-neutral-600 font-semibold">{displayTitle}</span>
                  </>
                ) : (
                  <span className="text-neutral-600 font-semibold">{mainCategory}</span>
                )}
             </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[28px] md:text-[36px] font-light font-playfair tracking-[0.04em] text-neutral-900 mt-2">
                {displayTitle}
              </h1>
              <p className="text-[12px] text-neutral-400 mt-1">
                {loading ? "Yükleniyor..." : `${sortedProducts.length} ürün`}
              </p>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[11px] tracking-[0.15em] text-neutral-400 uppercase">Sırala</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[11px] tracking-[0.1em] border-b border-neutral-200 py-1 px-2 bg-transparent outline-none cursor-pointer text-neutral-700 font-medium"
              >
                <option value="recommended">Önerilen</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="newest">Yeni Gelenler</option>
              </select>
            </div>
          </div>
          
          <div className="h-[1px] bg-neutral-100 mt-8" />
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="animate-spin text-neutral-200" size={48} />
              <p className="text-[9px] tracking-[0.4em] text-neutral-400 uppercase font-light">Koleksiyon Hazırlanıyor</p>
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-neutral-100 rounded-lg">
              <p className="text-neutral-400 font-light italic">Bu kategoride henüz ürün bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
