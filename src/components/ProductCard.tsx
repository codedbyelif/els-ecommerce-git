"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string;
    tag?: string | null;
    brand?: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const isFav = isFavorite(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative">
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 sm:opacity-0"
        aria-label={isFav ? "Favorilerden Çıkar" : "Favorilere Ekle"}
      >
        <Heart
          size={18}
          strokeWidth={1.5}
          className={`transition-colors duration-300 ${
            isFav ? "fill-red-500 text-red-500" : "text-neutral-400 group-hover:text-black"
          }`}
        />
      </button>

      <Link href={`/${product.category.toLowerCase().split(' ')[0].replace(/ç/g,'c').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ö/g,'o').replace(/ı/g,'i')}/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-50 mb-4">
          {product.tag && (
            <span className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.15em] uppercase bg-black text-white px-2 py-1">
              {product.tag}
            </span>
          )}
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Quick Add Overlay */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, category: product.category, size: null });
            }}
            className="absolute inset-x-0 bottom-0 bg-black/80 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-400"
          >
            <span className="text-[10px] tracking-[0.2em] text-white uppercase">
              Sepete Ekle
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {product.brand && (
            <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
              {product.brand}
            </p>
          )}
          <p className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase text-[9px]">
            {product.category}
          </p>
          <h3 className="text-[13px] tracking-wide text-neutral-900 font-light group-hover:underline underline-offset-2 font-playfair mt-0.5">
            {product.name}
          </h3>
          <p className="text-[13px] font-medium text-neutral-900 mt-1">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
