"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, Package, Layers, LogOut,
  Plus, Edit2, Trash2, X, ChevronDown, Upload,
  TrendingUp, AlertTriangle, CheckCircle, Search,
  MessageSquare, Star, Send,
} from "lucide-react";

const ALL_CATEGORIES = [
  "Kadın Elbise", "Kadın Bluz & Gömlek", "Kadın Ceket", "Kadın Etek", "Kadın Pantolon",
  "Erkek Takım Elbise", "Erkek Gömlek", "Erkek Pantolon", "Erkek Ceket",
  "Ayakkabı", "Çanta", "Aksesuar", "Parfüm", "Makyaj",
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  images: string[];
  description: string;
  sizes: string[];
  created_at: string;
}

interface SizeStock {
  id: string;
  product_id: string;
  size: string;
  stock: number;
}

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

const emptyForm = {
  name: "", category: ALL_CATEGORIES[0], price: "", stock: "",
  description: "", sizes: [] as string[], image_url: "", images: [] as string[],
};

type Page = "dashboard" | "products" | "stock" | "reviews";

export default function AdminDashboard() {
  const router = useRouter();
  const [page, setPage] = useState<Page>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tümü");
  const [imageInput, setImageInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stock
  const [sizeStocks, setSizeStocks] = useState<SizeStock[]>([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [selectedStockProduct, setSelectedStockProduct] = useState<Product | null>(null);

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [replyingId, setReplyingId] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") !== "1") router.replace("/admin");
  }, [router]);

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    if (page === "reviews") fetchReviews();
    if (page === "stock") fetchAllSizeStocks();
  }, [page]);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data ?? []);
    setLoading(false);
  }

  async function fetchAllSizeStocks() {
    setStockLoading(true);
    const { data } = await supabase.from("product_size_stock").select("*");
    setSizeStocks(data ?? []);
    setStockLoading(false);
  }

  async function fetchReviews() {
    setReviewsLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    setReviews(data ?? []);
    setReviewsLoading(false);
  }

  function logout() {
    localStorage.removeItem("admin_auth");
    router.push("/admin");
  }

  function openAdd() {
    setForm(emptyForm);
    setImageInput("");
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setForm({
      name: p.name, category: p.category, price: String(p.price),
      stock: String(p.stock ?? 0), description: p.description ?? "",
      sizes: p.sizes ?? [], image_url: p.image_url ?? "", images: p.images ?? [],
    });
    setImageInput("");
    setEditId(p.id);
    setShowForm(true);
  }

  function closeForm() { setShowForm(false); setEditId(null); }

  function toggleSize(size: string) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter((s) => s !== size) : [...f.sizes, size],
    }));
  }

  function addImageUrl() {
    const url = imageInput.trim();
    if (!url) return;
    setForm((f) => ({ ...f, image_url: f.image_url || url, images: [...f.images, url] }));
    setImageInput("");
  }

  function removeImage(idx: number) {
    setForm((f) => {
      const imgs = f.images.filter((_, i) => i !== idx);
      return { ...f, images: imgs, image_url: imgs[0] ?? "" };
    });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileName = `${Date.now()}.${file.name.split(".").pop()}`;
    const { data, error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error || !data) return;
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    const url = urlData.publicUrl;
    setForm((f) => ({ ...f, image_url: f.image_url || url, images: [...f.images, url] }));
  }

  async function saveProduct() {
    if (!form.name || !form.price) return;
    setSaving(true);
    const payload = {
      name: form.name, category: form.category,
      price: parseFloat(form.price), stock: parseInt(form.stock) || 0,
      description: form.description, sizes: form.sizes,
      image_url: form.image_url, images: form.images,
    };
    if (editId) {
      await supabase.from("products").update(payload).eq("id", editId);
    } else {
      const { data: newProduct } = await supabase.from("products").insert(payload).select().single();
      // Seçilen bedenler için boş stok satırları oluştur
      if (newProduct && form.sizes.length > 0) {
        await supabase.from("product_size_stock").insert(
          form.sizes.map((size) => ({ product_id: newProduct.id, size, stock: 0 }))
        );
      }
    }
    setSaving(false);
    closeForm();
    fetchProducts();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  // Beden bazlı stok güncelle
  async function updateSizeStock(productId: string, size: string, stock: number) {
    if (stock < 0) return;
    const existing = sizeStocks.find((s) => s.product_id === productId && s.size === size);
    if (existing) {
      await supabase.from("product_size_stock").update({ stock }).eq("id", existing.id);
      setSizeStocks((prev) => prev.map((s) => s.id === existing.id ? { ...s, stock } : s));
    } else {
      const { data } = await supabase
        .from("product_size_stock")
        .insert({ product_id: productId, size, stock })
        .select()
        .single();
      if (data) setSizeStocks((prev) => [...prev, data]);
    }
  }

  function getSizeStock(productId: string, size: string) {
    return sizeStocks.find((s) => s.product_id === productId && s.size === size)?.stock ?? 0;
  }

  // Yoruma cevap ver
  async function submitReply(reviewId: string) {
    const reply = replyTexts[reviewId]?.trim();
    if (!reply) return;
    setReplyingId(reviewId);
    await supabase.from("reviews").update({
      admin_reply: reply,
      replied_at: new Date().toISOString(),
    }).eq("id", reviewId);
    setReviews((prev) => prev.map((r) => r.id === reviewId
      ? { ...r, admin_reply: reply, replied_at: new Date().toISOString() }
      : r
    ));
    setReplyTexts((prev) => ({ ...prev, [reviewId]: "" }));
    setReplyingId(null);
  }

  async function deleteReply(reviewId: string) {
    await supabase.from("reviews").update({ admin_reply: null, replied_at: null }).eq("id", reviewId);
    setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, admin_reply: null, replied_at: null } : r));
  }

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "Tümü" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const totalStock = sizeStocks.reduce((s, ss) => s + ss.stock, 0);
  const outOfStock = products.filter((p) =>
    (p.sizes ?? []).length > 0
      ? (p.sizes ?? []).every((size) => getSizeStock(p.id, size) === 0)
      : (p.stock ?? 0) === 0
  ).length;
  const lowStock = products.filter((p) =>
    (p.sizes ?? []).some((size) => {
      const s = getSizeStock(p.id, size);
      return s > 0 && s < 5;
    })
  ).length;

  const fmt = (n: number) =>
    new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(n);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} strokeWidth={1.5} /> },
    { id: "products", label: "Ürünler", icon: <Package size={16} strokeWidth={1.5} /> },
    { id: "stock", label: "Stok Yönetimi", icon: <Layers size={16} strokeWidth={1.5} /> },
    { id: "reviews", label: "Yorumlar", icon: <MessageSquare size={16} strokeWidth={1.5} /> },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-56 bg-neutral-900 flex flex-col flex-shrink-0">
        <div className="px-6 py-6 border-b border-neutral-800">
          <p className="text-white text-[13px] tracking-[0.25em] font-light">EL&apos;S</p>
          <p className="text-neutral-500 text-[9px] tracking-[0.3em] uppercase mt-0.5">Admin Panel</p>
          <a href="/" className="inline-flex items-center gap-1.5 mt-3 text-neutral-500 hover:text-neutral-300 transition-colors text-[9px] tracking-[0.2em] uppercase">
            ← Siteye Dön
          </a>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setShowForm(false); setSelectedStockProduct(null); }}
              className={`w-full flex items-center gap-3 px-6 py-3 text-[11px] tracking-[0.15em] uppercase transition-colors ${
                page === item.id ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-neutral-800">
          <button onClick={logout} className="flex items-center gap-3 text-neutral-500 hover:text-white transition-colors text-[11px] tracking-[0.15em] uppercase">
            <LogOut size={15} strokeWidth={1.5} />
            Çıkış
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* ── DASHBOARD ── */}
        {page === "dashboard" && (
          <div className="p-8">
            <h1 className="text-[22px] font-light text-neutral-800 mb-1">Hoş geldin</h1>
            <p className="text-[12px] text-neutral-400 mb-8">EL&apos;S mağaza yönetim paneli</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Toplam Ürün", value: products.length, icon: <Package size={18} strokeWidth={1.5} />, color: "text-neutral-700" },
                { label: "Toplam Stok", value: totalStock, icon: <TrendingUp size={18} strokeWidth={1.5} />, color: "text-emerald-600" },
                { label: "Stokta Yok", value: outOfStock, icon: <AlertTriangle size={18} strokeWidth={1.5} />, color: "text-red-400" },
                { label: "Düşük Stok", value: lowStock, icon: <AlertTriangle size={18} strokeWidth={1.5} />, color: "text-amber-500" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-neutral-100 p-5">
                  <div className={`mb-3 ${s.color}`}>{s.icon}</div>
                  <p className="text-[26px] font-light text-neutral-800">{s.value}</p>
                  <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border border-neutral-100 p-6">
              <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-4">Son Eklenen Ürünler</p>
              <div className="flex flex-col divide-y divide-neutral-50">
                {products.slice(0, 6).map((p) => (
                  <div key={p.id} className="flex items-center gap-4 py-3">
                    {p.image_url
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={p.image_url} alt="" className="w-8 h-10 object-cover object-top bg-neutral-50 flex-shrink-0" />
                      : <div className="w-8 h-10 bg-neutral-100 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-neutral-700 truncate">{p.name}</p>
                      <p className="text-[10px] text-neutral-400">{p.category}</p>
                    </div>
                    <p className="text-[12px] text-neutral-600 font-light">{fmt(p.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCTS LIST ── */}
        {page === "products" && !showForm && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-[20px] font-light text-neutral-800">Ürünler</h1>
                <p className="text-[11px] text-neutral-400 mt-0.5">{products.length} ürün</p>
              </div>
              <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-black transition-colors">
                <Plus size={14} strokeWidth={2} />
                Ürün Ekle
              </button>
            </div>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-3 text-neutral-300" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ürün ara..."
                  className="w-full border border-neutral-100 pl-9 pr-4 py-2.5 text-[12px] font-light focus:outline-none focus:border-neutral-300 bg-white" />
              </div>
              <div className="relative">
                <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                  className="border border-neutral-100 px-4 py-2.5 text-[12px] font-light focus:outline-none appearance-none pr-8 bg-white">
                  <option value="Tümü">Tüm Kategoriler</option>
                  {ALL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-3.5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
            {loading ? (
              <div className="flex flex-col gap-2">{[1,2,3,4].map((i) => <div key={i} className="h-14 bg-neutral-100 animate-pulse" />)}</div>
            ) : (
              <div className="bg-white border border-neutral-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-neutral-50">
                    <tr>
                      {["Görsel", "Ürün Adı", "Kategori", "Fiyat", "Bedenler", ""].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filtered.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors group">
                        <td className="px-4 py-3">
                          {p.image_url
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={p.image_url} alt="" className="w-9 h-11 object-cover object-top" />
                            : <div className="w-9 h-11 bg-neutral-100" />}
                        </td>
                        <td className="px-4 py-3"><p className="text-[12px] font-medium text-neutral-800">{p.name}</p></td>
                        <td className="px-4 py-3"><span className="text-[11px] text-neutral-400">{p.category}</span></td>
                        <td className="px-4 py-3"><span className="text-[12px] text-neutral-700">{fmt(p.price)}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 flex-wrap">
                            {(p.sizes ?? []).map((s) => (
                              <span key={s} className="text-[9px] border border-neutral-200 px-1.5 py-0.5 text-neutral-500">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-neutral-100 rounded transition-colors">
                              <Edit2 size={13} strokeWidth={1.5} className="text-neutral-500" />
                            </button>
                            <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-red-50 rounded transition-colors">
                              <Trash2 size={13} strokeWidth={1.5} className="text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && <p className="text-center py-12 text-[12px] text-neutral-300">Ürün bulunamadı.</p>}
              </div>
            )}
          </div>
        )}

        {/* ── PRODUCT FORM ── */}
        {page === "products" && showForm && (
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[20px] font-light text-neutral-800">{editId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h1>
              <div className="flex items-center gap-3">
                <button onClick={closeForm} className="px-5 py-2.5 border border-neutral-200 text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:border-neutral-400 transition-colors">İptal</button>
                <button onClick={saveProduct} disabled={saving || !form.name || !form.price}
                  className="px-6 py-2.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              <div className="flex flex-col gap-6">
                <div className="bg-white border border-neutral-100 p-6">
                  <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-5">Temel Bilgiler</p>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase block mb-2">Ürün Adı *</label>
                      <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ürün adı"
                        className="w-full border-b border-neutral-200 py-2 text-[14px] font-light focus:outline-none focus:border-neutral-800 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase block mb-2">Kategori</label>
                      <div className="relative">
                        <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                          className="w-full border-b border-neutral-200 py-2 text-[13px] font-light focus:outline-none focus:border-neutral-800 appearance-none bg-transparent pr-6">
                          {ALL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={13} className="absolute right-0 top-3 text-neutral-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase block mb-2">Fiyat (₺) *</label>
                        <input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="0"
                          className="w-full border-b border-neutral-200 py-2 text-[14px] font-light focus:outline-none focus:border-neutral-800 transition-colors" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.15em] text-neutral-500 uppercase block mb-2">Genel Stok</label>
                        <input type="number" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} placeholder="0"
                          className="w-full border-b border-neutral-200 py-2 text-[14px] font-light focus:outline-none focus:border-neutral-800 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-neutral-100 p-6">
                  <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-5">Açıklama</p>
                  <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Ürün açıklaması..." rows={5}
                    className="w-full text-[13px] font-light focus:outline-none resize-none placeholder:text-neutral-300 text-neutral-700 leading-relaxed" />
                </div>
                <div className="bg-white border border-neutral-100 p-6">
                  <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-5">Bedenler</p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((size) => (
                      <button key={size} onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-[11px] font-medium border transition-colors ${
                          form.sizes.includes(size) ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 text-neutral-500 hover:border-neutral-500"
                        }`}>
                        {size}
                      </button>
                    ))}
                  </div>
                  {form.sizes.length > 0 && (
                    <p className="text-[10px] text-neutral-400 mt-3">Beden bazlı stok için Stok Yönetimi sayfasını kullanın.</p>
                  )}
                </div>
              </div>
              <div className="bg-white border border-neutral-100 p-6 h-fit">
                <p className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-5">Görseller</p>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative aspect-[3/4] bg-neutral-50 overflow-hidden group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="w-full h-full object-cover object-top" />
                        {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-neutral-900/70 text-white text-[8px] text-center py-0.5 tracking-wider">ANA</span>}
                        <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white/90 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={11} /></button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mb-3">
                  <input value={imageInput} onChange={(e) => setImageInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addImageUrl()}
                    placeholder="URL yapıştır..." className="flex-1 border border-neutral-100 px-3 py-2 text-[11px] font-light focus:outline-none focus:border-neutral-300 transition-colors" />
                  <button onClick={addImageUrl} className="px-3 py-2 bg-neutral-100 text-[11px] text-neutral-600 hover:bg-neutral-200 transition-colors">Ekle</button>
                </div>
                <button onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-neutral-200 py-5 flex flex-col items-center gap-2 hover:border-neutral-400 transition-colors text-neutral-400 hover:text-neutral-600">
                  <Upload size={18} strokeWidth={1.5} />
                  <span className="text-[10px] tracking-wide">Dosya Yükle</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </div>
            </div>
          </div>
        )}

        {/* ── STOCK PAGE ── */}
        {page === "stock" && (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-[20px] font-light text-neutral-800">Stok Yönetimi</h1>
              <p className="text-[11px] text-neutral-400 mt-0.5">Beden bazlı stok takibi</p>
            </div>

            {/* Özet kartlar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-neutral-100 p-4 flex items-center gap-3">
                <CheckCircle size={18} strokeWidth={1.5} className="text-emerald-500" />
                <div>
                  <p className="text-[18px] font-light text-neutral-800">{products.filter(p => (p.sizes ?? []).some(s => getSizeStock(p.id, s) >= 5)).length}</p>
                  <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Yeterli Stok</p>
                </div>
              </div>
              <div className="bg-white border border-neutral-100 p-4 flex items-center gap-3">
                <AlertTriangle size={18} strokeWidth={1.5} className="text-amber-500" />
                <div>
                  <p className="text-[18px] font-light text-neutral-800">{lowStock}</p>
                  <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Düşük Stok</p>
                </div>
              </div>
              <div className="bg-white border border-neutral-100 p-4 flex items-center gap-3">
                <AlertTriangle size={18} strokeWidth={1.5} className="text-red-400" />
                <div>
                  <p className="text-[18px] font-light text-neutral-800">{outOfStock}</p>
                  <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Tükendi</p>
                </div>
              </div>
            </div>

            {/* Ürün seçimi ya da stok tablosu */}
            {!selectedStockProduct ? (
              <>
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-3 text-neutral-300" />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ürün ara..."
                      className="w-full border border-neutral-100 pl-9 pr-4 py-2.5 text-[12px] font-light focus:outline-none focus:border-neutral-300 bg-white" />
                  </div>
                  <div className="relative">
                    <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                      className="border border-neutral-100 px-4 py-2.5 text-[12px] font-light focus:outline-none appearance-none pr-8 bg-white">
                      <option value="Tümü">Tüm Kategoriler</option>
                      {ALL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-3.5 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
                <div className="bg-white border border-neutral-100 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        {["Ürün", "Kategori", "Bedenler", "Durum", ""].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-[9px] tracking-[0.25em] text-neutral-400 uppercase font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {filtered.map((p) => {
                        const hasSizes = (p.sizes ?? []).length > 0;
                        const allOut = hasSizes && (p.sizes ?? []).every((s) => getSizeStock(p.id, s) === 0);
                        const hasLow = hasSizes && (p.sizes ?? []).some((s) => { const st = getSizeStock(p.id, s); return st > 0 && st < 5; });
                        return (
                          <tr key={p.id} className="hover:bg-neutral-50/30 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                {p.image_url
                                  // eslint-disable-next-line @next/next/no-img-element
                                  ? <img src={p.image_url} alt="" className="w-8 h-10 object-cover object-top flex-shrink-0" />
                                  : <div className="w-8 h-10 bg-neutral-100 flex-shrink-0" />}
                                <p className="text-[12px] font-medium text-neutral-700">{p.name}</p>
                              </div>
                            </td>
                            <td className="px-5 py-4"><span className="text-[11px] text-neutral-400">{p.category}</span></td>
                            <td className="px-5 py-4">
                              <div className="flex gap-1 flex-wrap">
                                {(p.sizes ?? []).map((s) => {
                                  const st = getSizeStock(p.id, s);
                                  return (
                                    <span key={s} className={`text-[9px] px-1.5 py-0.5 border font-medium ${
                                      st === 0 ? "border-red-200 text-red-400 bg-red-50" :
                                      st < 5 ? "border-amber-200 text-amber-500 bg-amber-50" :
                                      "border-neutral-200 text-neutral-500"
                                    }`}>{s}: {st}</span>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-[10px] font-medium px-2 py-0.5 ${
                                allOut ? "bg-red-50 text-red-400" :
                                hasLow ? "bg-amber-50 text-amber-500" :
                                "bg-emerald-50 text-emerald-600"
                              }`}>
                                {allOut ? "Tükendi" : hasLow ? "Düşük" : "Yeterli"}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                              <button onClick={() => setSelectedStockProduct(p)}
                                className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-800 transition-colors border border-neutral-200 px-3 py-1.5 hover:border-neutral-500">
                                Düzenle
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              /* Beden bazlı stok düzenleme */
              <div className="bg-white border border-neutral-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedStockProduct(null)} className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors">
                      ← Geri
                    </button>
                    <div>
                      <p className="text-[14px] font-medium text-neutral-800">{selectedStockProduct.name}</p>
                      <p className="text-[11px] text-neutral-400">{selectedStockProduct.category}</p>
                    </div>
                  </div>
                </div>

                {(selectedStockProduct.sizes ?? []).length === 0 ? (
                  <p className="text-[12px] text-neutral-400">Bu ürüne beden eklenmemiş. Ürünü düzenleyerek beden ekleyin.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(selectedStockProduct.sizes ?? []).map((size) => {
                      const stock = getSizeStock(selectedStockProduct.id, size);
                      return (
                        <div key={size} className={`border p-4 ${
                          stock === 0 ? "border-red-100 bg-red-50/30" :
                          stock < 5 ? "border-amber-100 bg-amber-50/30" :
                          "border-neutral-100"
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[13px] font-medium text-neutral-700">{size}</span>
                            <span className={`text-[9px] font-medium px-1.5 py-0.5 ${
                              stock === 0 ? "bg-red-100 text-red-500" :
                              stock < 5 ? "bg-amber-100 text-amber-600" :
                              "bg-emerald-100 text-emerald-600"
                            }`}>
                              {stock === 0 ? "Tükendi" : stock < 5 ? "Düşük" : "Yeterli"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateSizeStock(selectedStockProduct.id, size, stock - 1)}
                              className="w-7 h-7 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-500 text-sm"
                            >−</button>
                            <span className="flex-1 text-center text-[14px] font-medium text-neutral-800">{stock}</span>
                            <button
                              onClick={() => updateSizeStock(selectedStockProduct.id, size, stock + 1)}
                              className="w-7 h-7 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-500 text-sm"
                            >+</button>
                          </div>
                          <input
                            type="number"
                            defaultValue={stock}
                            key={stock}
                            onBlur={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val !== stock) updateSizeStock(selectedStockProduct.id, size, val);
                            }}
                            className="w-full mt-2 border border-neutral-100 px-2 py-1 text-[11px] text-center focus:outline-none focus:border-neutral-400 transition-colors"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── REVIEWS PAGE ── */}
        {page === "reviews" && (
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-[20px] font-light text-neutral-800">Yorumlar</h1>
              <p className="text-[11px] text-neutral-400 mt-0.5">{reviews.length} yorum</p>
            </div>

            {reviewsLoading ? (
              <div className="flex flex-col gap-3">{[1,2,3].map((i) => <div key={i} className="h-24 bg-neutral-100 animate-pulse" />)}</div>
            ) : reviews.length === 0 ? (
              <p className="text-[13px] text-neutral-300">Henüz yorum yok.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews.map((review) => {
                  const product = products.find((p) => p.id === review.product_id);
                  return (
                    <div key={review.id} className="bg-white border border-neutral-100 p-6">
                      {/* Üst: ürün + meta */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          {product?.image_url
                            // eslint-disable-next-line @next/next/no-img-element
                            ? <img src={product.image_url} alt="" className="w-8 h-10 object-cover object-top flex-shrink-0" />
                            : <div className="w-8 h-10 bg-neutral-100 flex-shrink-0" />}
                          <div>
                            <p className="text-[11px] text-neutral-400">{product?.name ?? "Bilinmeyen Ürün"}</p>
                            <p className="text-[12px] font-medium text-neutral-800">{review.name ?? "Anonim"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} size={12} strokeWidth={1.2}
                                className={s <= review.rating ? "fill-neutral-700 text-neutral-700" : "text-neutral-200"} />
                            ))}
                          </div>
                          <span className="text-[10px] text-neutral-400">{formatDate(review.created_at)}</span>
                        </div>
                      </div>

                      {/* Yorum */}
                      <p className="text-[13px] text-neutral-600 font-light leading-relaxed mb-4 pl-11">{review.comment}</p>

                      {/* Mevcut cevap */}
                      {review.admin_reply && (
                        <div className="ml-11 bg-neutral-50 border-l-2 border-neutral-300 pl-4 py-3 pr-3 mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Admin Cevabı</p>
                            <button onClick={() => deleteReply(review.id)} className="text-[9px] text-red-400 hover:text-red-600 transition-colors">Sil</button>
                          </div>
                          <p className="text-[12px] text-neutral-600 font-light">{review.admin_reply}</p>
                        </div>
                      )}

                      {/* Cevap formu */}
                      {!review.admin_reply && (
                        <div className="ml-11 flex gap-2">
                          <input
                            value={replyTexts[review.id] ?? ""}
                            onChange={(e) => setReplyTexts((prev) => ({ ...prev, [review.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && submitReply(review.id)}
                            placeholder="Cevap yaz..."
                            className="flex-1 border border-neutral-100 px-3 py-2 text-[12px] font-light focus:outline-none focus:border-neutral-400 transition-colors"
                          />
                          <button
                            onClick={() => submitReply(review.id)}
                            disabled={replyingId === review.id || !replyTexts[review.id]?.trim()}
                            className="px-4 py-2 bg-neutral-900 text-white text-[10px] tracking-[0.15em] uppercase hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                          >
                            <Send size={12} strokeWidth={1.5} />
                            Gönder
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
