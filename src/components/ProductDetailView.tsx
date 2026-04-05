"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ChevronDown, X, Star } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  product_id: string;
  name: string | null;
  rating: number;
  comment: string;
  created_at: string;
  admin_reply: string | null;
  replied_at: string | null;
}

interface SizeStock {
  size: string;
  stock: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProductDetailView({ product, mainCategory }: { product: any, mainCategory: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addItem } = useCart();
  const isFav = isFavorite(product.id.toString());

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Beden bazlı stok
  const [sizeStocks, setSizeStocks] = useState<SizeStock[]>([]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // Beden stokları
      const { data: stockData } = await supabase
        .from("product_size_stock")
        .select("size, stock")
        .eq("product_id", product.id);
      setSizeStocks(stockData ?? []);

      // Yorumlar
      setReviewsLoading(true);
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", product.id)
        .order("created_at", { ascending: false });
      setReviews(data ?? []);
      setReviewsLoading(false);
    }
    fetchData();
  }, [product.id]);

  function getSizeStock(size: string) {
    return sizeStocks.find((s) => s.size === size)?.stock ?? null;
  }

  const selectedSizeStock = selectedSize ? getSizeStock(selectedSize) : null;
  const isOutOfStock = selectedSize !== null && selectedSizeStock === 0;

  async function submitReview() {
    if (!reviewForm.name.trim() || !reviewForm.rating || !reviewForm.comment.trim()) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        product_id: product.id,
        name: reviewForm.name.trim(),
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      })
      .select()
      .single();

    if (!error && data) {
      setReviews((prev) => [data, ...prev]);
      setReviewForm({ name: "", rating: 0, comment: "" });
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
    setSubmitting(false);
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const images: string[] = product.images?.length ? product.images : [product.image_url];
  const sizes: string[] = product.sizes ?? ["S", "M", "L", "XL"];
  const details: string[] = product.details ?? [
    "Sürdürülebilir materyallerle üretilmiştir.",
    "Kuru temizleme önerilir.",
    "Model 178 cm boyundadır ve S beden giymektedir."
  ];

  return (
    <main className="pt-[120px] md:pt-[140px] pb-20 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 lg:px-16 mb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] text-neutral-400 uppercase">
            <Link href="/" className="hover:text-black transition-colors">Ana Sayfa</Link>
            {" "}&rsaquo;{" "}
            <Link href={`/${mainCategory.toLowerCase()}`} className="hover:text-black transition-colors">{mainCategory}</Link>
            {" "}&rsaquo;{" "}
            <span className="text-neutral-600">{product.name}</span>
          </p>
        </div>
      </div>

      {/* Product Layout */}
      <div className="px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Images */}
            <div className="flex gap-4">
              {images.length > 1 && (
                <div className="hidden md:flex flex-col gap-3 w-[70px] flex-shrink-0">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative aspect-[3/4] overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === i ? "border-black" : "border-transparent hover:border-neutral-300"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
              <div className="relative flex-1 aspect-[3/4] overflow-hidden bg-neutral-50">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-3">
                {product.category}
              </p>

              <h1 className="text-[24px] md:text-[30px] font-light font-playfair tracking-[0.03em] text-neutral-900 mb-4">
                {product.name}
              </h1>

              <p className="text-[18px] font-medium text-neutral-900 mb-8">
                {formatPrice(product.price)}
              </p>

              {product.description && (
                <p className="text-[13px] text-neutral-500 font-light leading-relaxed mb-8">
                  {product.description}
                </p>
              )}

              {/* Size selector */}
              {sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase">Beden</span>
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-[10px] tracking-[0.15em] text-neutral-400 underline underline-offset-2 hover:text-black transition-colors"
                    >
                      Beden Rehberi
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => {
                      const stock = getSizeStock(size);
                      const outOfStock = stock !== null && stock === 0;
                      return (
                        <button
                          key={size}
                          onClick={() => !outOfStock && setSelectedSize(size)}
                          disabled={outOfStock}
                          className={`relative w-12 h-12 text-[12px] tracking-wide font-medium border transition-all duration-200 ${
                            outOfStock
                              ? "border-neutral-100 text-neutral-300 cursor-not-allowed overflow-hidden"
                              : selectedSize === size
                              ? "border-black bg-black text-white"
                              : "border-neutral-200 text-neutral-700 hover:border-black"
                          }`}
                        >
                          {outOfStock && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="absolute w-[130%] h-px bg-neutral-200 rotate-45" />
                            </span>
                          )}
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  {isOutOfStock && (
                    <p className="text-[11px] text-red-400 mt-3 tracking-wide">Bu beden şu an stokta yok.</p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-3 block">Adet</span>
                <div className="flex items-center border border-neutral-200 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="w-12 text-center text-[13px] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Add to cart + Fav */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={() => !isOutOfStock && addItem({ id: product.id.toString(), name: product.name, price: product.price, image_url: images[0], category: product.category, size: selectedSize })}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3.5 text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
                    isOutOfStock
                      ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  {isOutOfStock ? "Stokta Yok" : "Sepete Ekle"}
                </button>
                <button
                  onClick={() => toggleFavorite(product.id.toString())}
                  className="w-[52px] h-[52px] border border-neutral-200 flex items-center justify-center hover:border-black transition-colors duration-300 group"
                >
                  <Heart
                    size={18}
                    strokeWidth={1.5}
                    className={`transition-colors duration-300 ${isFav ? "fill-red-500 text-red-500" : "text-neutral-400 group-hover:text-black"}`}
                  />
                </button>
              </div>

              {/* Details accordion */}
              {details.length > 0 && (
                <div className="border-t border-neutral-100">
                  <button
                    onClick={() => setDetailsOpen(!detailsOpen)}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-[11px] tracking-[0.2em] text-neutral-700 uppercase font-medium">
                      Ürün Detayları
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`text-neutral-400 transition-transform duration-300 ${detailsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${detailsOpen ? "max-h-[400px] pb-5" : "max-h-0"}`}>
                    <ul className="flex flex-col gap-2">
                      {details.map((detail, i) => (
                        <li key={i} className="text-[12px] text-neutral-500 font-light">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-neutral-100" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-6 md:px-10 lg:px-16 mt-24 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-6 mb-12 border-t border-neutral-900 pt-6">
            <h2 className="text-[11px] tracking-[0.3em] uppercase font-medium text-neutral-900 whitespace-nowrap">
              Yorumlar
            </h2>
            {reviews.length > 0 && (
              <>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} strokeWidth={1.2}
                      className={s <= Math.round(avgRating) ? "fill-neutral-800 text-neutral-800" : "text-neutral-300"}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-neutral-400 font-light">
                  {avgRating.toFixed(1)} · {reviews.length} yorum
                </span>
              </>
            )}
          </div>

          {/* Form — tam genişlik üstte */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-16 border-b border-neutral-100">
            <div>
              <label className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase block mb-2">Ad Soyad</label>
              <input
                type="text"
                value={reviewForm.name}
                onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Adınızı girin"
                className="w-full border-b border-neutral-200 py-2 text-[13px] font-light placeholder:text-neutral-300 focus:outline-none focus:border-neutral-800 transition-colors bg-transparent"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase block mb-2">Puan</label>
              <div className="flex gap-1.5 py-1">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewForm((f) => ({ ...f, rating: s }))}
                  >
                    <Star
                      size={20}
                      strokeWidth={1.2}
                      className={`transition-colors duration-100 ${
                        s <= (hoverRating || reviewForm.rating)
                          ? "fill-neutral-900 text-neutral-900"
                          : "text-neutral-200 hover:text-neutral-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={submitReview}
                disabled={submitting || !reviewForm.name.trim() || !reviewForm.rating || !reviewForm.comment.trim()}
                className="w-full py-3 bg-neutral-900 text-white text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-black transition-colors duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
              >
                {reviewSubmitted ? "Gönderildi" : submitting ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>

            <div className="md:col-span-3">
              <label className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase block mb-2">Yorumunuz</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                placeholder="Ürün hakkındaki düşüncelerinizi paylaşın..."
                rows={3}
                className="w-full border-b border-neutral-200 py-2 text-[13px] font-light placeholder:text-neutral-300 focus:outline-none focus:border-neutral-800 transition-colors resize-none bg-transparent"
              />
            </div>
          </div>

          {/* Review list */}
          {reviewsLoading && (
            <div className="flex flex-col gap-4">
              {[1,2,3].map((i) => (
                <div key={i} className="h-16 bg-neutral-50 animate-pulse" />
              ))}
            </div>
          )}

          {!reviewsLoading && reviews.length === 0 && (
            <p className="text-[13px] text-neutral-300 font-light">Henüz yorum yok. İlk yorumu sen bırak.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6">
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={11} strokeWidth={1.2}
                      className={s <= review.rating ? "fill-neutral-800 text-neutral-800" : "text-neutral-200"}
                    />
                  ))}
                </div>
                <p className="text-[13px] text-neutral-600 font-light leading-relaxed mb-3">&ldquo;{review.comment}&rdquo;</p>
                {review.admin_reply && (
                  <div className="border-l-2 border-neutral-200 pl-3 mb-3">
                    <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase mb-1">Mağaza Yanıtı</p>
                    <p className="text-[12px] text-neutral-500 font-light">{review.admin_reply}</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-800">{review.name ?? "Anonim"}</span>
                  <span className="text-[10px] text-neutral-300">{formatDate(review.created_at)}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <>
          <div
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
                <h3 className="text-[13px] tracking-[0.25em] font-medium uppercase">Beden Rehberi</h3>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="p-1 hover:rotate-90 transition-transform duration-300"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <div className="px-6 py-6">
                <table className="w-full text-[12px] mb-8">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Beden</th>
                      <th className="text-center py-3 text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Göğüs</th>
                      <th className="text-center py-3 text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Bel</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-600 font-light">
                    {[
                      ["XS", "80-84 cm", "60-64 cm"],
                      ["S",  "84-88 cm", "64-68 cm"],
                      ["M",  "88-92 cm", "68-72 cm"],
                      ["L",  "92-96 cm", "72-76 cm"],
                    ].map(([s, g, b]) => (
                      <tr key={s} className="border-b border-neutral-50">
                        <td className="py-3 font-medium">{s}</td>
                        <td className="py-3 text-center">{g}</td>
                        <td className="py-3 text-center">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
