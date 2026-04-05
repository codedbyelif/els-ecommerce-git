import { useState, useMemo } from "react";

export function useProductSort(products: any[]) {
  const [sortBy, setSortBy] = useState("Önerilen");

  const sortedProducts = useMemo(() => {
    const arr = [...products];
    if (sortBy === "Fiyat: Düşükten Yükseğe") {
      arr.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "Fiyat: Yüksekten Düşüğe") {
      arr.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "Yeni Gelenler") {
      arr.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return arr;
  }, [products, sortBy]);

  return { sortBy, setSortBy, sortedProducts };
}
