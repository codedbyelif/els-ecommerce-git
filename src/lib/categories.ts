export interface CategoryDef {
  slug: string;
  name: string;
  dbCategory: string;
}

export const KADIN_CATEGORIES: Record<string, CategoryDef> = {
  elbise: { slug: "elbise", name: "Elbise", dbCategory: "Kadın Elbise" },
  bluz: { slug: "bluz", name: "Bluz & Gömlek", dbCategory: "Kadın Bluz & Gömlek" },
  ceket: { slug: "ceket", name: "Ceket", dbCategory: "Kadın Ceket" },
  etek: { slug: "etek", name: "Etek", dbCategory: "Kadın Etek" },
  pantolon: { slug: "pantolon", name: "Pantolon", dbCategory: "Kadın Pantolon" },
  yeni: { slug: "yeni", name: "Yeni Gelenler", dbCategory: "Kadın" }, // Handled by tags
  "cok-satan": { slug: "cok-satan", name: "Çok Satanlar", dbCategory: "Kadın" }, // Handled by tags
  koleksiyon: { slug: "koleksiyon", name: "Koleksiyon", dbCategory: "Kadın" }, // Handled by tags
};

export const ERKEK_CATEGORIES: Record<string, CategoryDef> = {
  takim: { slug: "takim", name: "Takım Elbise", dbCategory: "Erkek Takım Elbise" },
  gomlek: { slug: "gomlek", name: "Gömlek", dbCategory: "Erkek Gömlek" },
  pantolon: { slug: "pantolon", name: "Pantolon", dbCategory: "Erkek Pantolon" },
  ceket: { slug: "ceket", name: "Ceket", dbCategory: "Erkek Ceket" },
  yeni: { slug: "yeni", name: "Yeni Gelenler", dbCategory: "Erkek" }, // Handled by tags
  "cok-satan": { slug: "cok-satan", name: "Çok Satanlar", dbCategory: "Erkek" }, // Handled by tags
  koleksiyon: { slug: "koleksiyon", name: "Koleksiyon", dbCategory: "Erkek" }, // Handled by tags
};

export function getCategoryBySlug(mainCategory: string, slug: string): CategoryDef | undefined {
  const normMain = mainCategory.toLowerCase().replace(/ı/g, 'i');
  if (normMain === "kadin") return KADIN_CATEGORIES[slug];
  if (normMain === "erkek") return ERKEK_CATEGORIES[slug];
  return undefined;
}
