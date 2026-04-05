import { supabase } from "@/lib/supabase";
import ProductListing from "@/components/ProductListing";
import ProductDetailView from "@/components/ProductDetailView";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ErkekSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase().trim();

  // 1. Kategori mi diye kontrol et (Merkezi kütüphaneden)
  const categoryDef = getCategoryBySlug("erkek", normalizedSlug);
  
  if (categoryDef) {
    return (
      <ProductListing 
        mainCategory="Erkek" 
        subCategory={categoryDef.name} 
        subCategorySlug={normalizedSlug}
      />
    );
  }

  // 2. Ürün ID'si olarak kontrol et (UUID desteği için direkt sorguluyoruz)
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", normalizedSlug)
    .single();

  if (product && !error) {
    return <ProductDetailView product={product} mainCategory="Erkek" />;
  }

  // 3. Hiçbiri değilse 404
  notFound();
}
