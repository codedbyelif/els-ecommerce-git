const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Make sure to run with --env-file=.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const allProducts = [
  // KADIN
  { name: "Pudra Korse Midi Elbise", category: "Kadın Elbise", price: 24500, image_url: "/kadin-product-1.jpg", tag: "Yeni" },
  { name: "Zümrüt Yeşili Korse Elbise", category: "Kadın Elbise", price: 24500, image_url: "/kadin-product-2.jpg", tag: null },
  { name: "Siyah V Yaka Midi Elbise", category: "Kadın Elbise", price: 12300, image_url: "/kadin-product-3.webp", tag: "Çok Satan" },
  { name: "Açık Yeşil Halter Elbise", category: "Kadın Elbise", price: 21900, image_url: "/kadin-product-4.jpg", tag: null },
  { name: "Kırmızı Halter Midi Elbise", category: "Kadın Elbise", price: 21900, image_url: "/kadin-product-5.jpg", tag: "Öne Çıkan" },
  { name: "Beyaz Tül Korse Elbise", category: "Kadın Elbise", price: 26800, image_url: "/kadin-product-6.jpg", tag: null },
  { name: "Kahverengi Twist Bluz", category: "Kadın Bluz & Gömlek", price: 8900, image_url: "/kadin-bluz-1.jpg", tag: "Yeni" },
  { name: "Mürdüm Asimetrik Bluz", category: "Kadın Bluz & Gömlek", price: 7600, image_url: "/kadin-bluz-2.jpg", tag: "Çok Satan" },
  { name: "Beyaz Keten Gömlek", category: "Kadın Bluz & Gömlek", price: 6400, image_url: "/kadin-bluz-3.jpg", tag: null },
  { name: "Beyaz Wrap Gömlek", category: "Kadın Bluz & Gömlek", price: 7200, image_url: "/kadin-bluz-4.jpg", tag: "Öne Çıkan" },
  { name: "Bej Keten Wrap Pantolon", category: "Kadın Pantolon", price: 11900, image_url: "/kadin-pantolon-1.jpg", tag: "Yeni" },
  { name: "Antrasit Asimetrik Pantolon", category: "Kadın Pantolon", price: 14500, image_url: "/kadin-pantolon-2.jpg", tag: "Öne Çıkan" },
  { name: "Gümüş Saten Wrap Pantolon", category: "Kadın Pantolon", price: 13200, image_url: "/kadin-pantolon-3.jpg", tag: null },
  { name: "Bej Saten Wide Leg Pantolon", category: "Kadın Pantolon", price: 15800, image_url: "/kadin-pantolon-4.jpg", tag: null },
  { name: "Siyah Etek Detaylı Pantolon", category: "Kadın Pantolon", price: 12700, image_url: "/kadin-pantolon-5.jpg", tag: "Çok Satan" },
  { name: "Gri Pileli Wide Leg Pantolon", category: "Kadın Pantolon", price: 9800, image_url: "/kadin-pantolon-6.jpg", tag: null },
  { name: "Kahverengi Pileli Maxi Etek", category: "Kadın Etek", price: 14900, image_url: "/kadin-etek-1.jpg", tag: "Yeni" },
  { name: "Lacivert Jakar Asimetrik Etek", category: "Kadın Etek", price: 18500, image_url: "/kadin-etek-2.jpg", tag: null },
  { name: "Siyah Asimetrik Volanlı Etek", category: "Kadın Etek", price: 16200, image_url: "/kadin-etek-3.jpg", tag: "Öne Çıkan" },
  { name: "Antrasit Wrap Mini Etek", category: "Kadın Etek", price: 7800, image_url: "/kadin-etek-4.jpg", tag: null },
  { name: "Koyu Gri Deri Mini Etek", category: "Kadın Etek", price: 9200, image_url: "/kadin-etek-5.jpg", tag: "Çok Satan" },
  { name: "Gri Pileli Mini Etek", category: "Kadın Etek", price: 6900, image_url: "/kadin-etek-6.jpg", tag: null },
  { name: "Beyaz Klasik Mini Etek", category: "Kadın Etek", price: 5800, image_url: "/kadin-etek-7.jpg", tag: null },
  { name: "Siyah Tailored Mini Etek", category: "Kadın Etek", price: 7400, image_url: "/kadin-etek-8.jpg", tag: "Yeni" },
  { name: "Kahverengi Korse Deri Ceket", category: "Kadın Ceket", price: 34900, image_url: "/kadin-ceket-1.jpg", tag: "Yeni" },
  { name: "Koyu Kahve Crop Deri Ceket", category: "Kadın Ceket", price: 29500, image_url: "/kadin-ceket-2.jpg", tag: "Öne Çıkan" },
  { name: "Karamel Süet Crop Ceket", category: "Kadın Ceket", price: 27800, image_url: "/kadin-ceket-3.jpg", tag: null },
  { name: "Kahverengi Tüvit Crop Ceket", category: "Kadın Ceket", price: 32500, image_url: "/kadin-ceket-4.jpg", tag: "Çok Satan" },
  { name: "Ekose Flannel Shacket", category: "Kadın Ceket", price: 18900, image_url: "/kadin-ceket-5.jpg", tag: null },
  { name: "Haki Süet Oversized Ceket", category: "Kadın Ceket", price: 31200, image_url: "/kadin-ceket-6.jpg", tag: "Yeni" },

  // ERKEK
  { name: "Adaçayı Yeşili Keten Takım", category: "Erkek Takım Elbise", price: 42900, image_url: "/erkek-takim-1.jpg", tag: "Yeni" },
  { name: "Kırık Beyaz Monokrom Takım", category: "Erkek Takım Elbise", price: 52000, image_url: "/erkek-takim-2.jpg", tag: "Öne Çıkan" },
  { name: "Lacivert Kruvaze Takım", category: "Erkek Takım Elbise", price: 49500, image_url: "/erkek-takim-3.jpg", tag: "Klasik" },
  { name: "İndigo Günlük Takım", category: "Erkek Takım Elbise", price: 45000, image_url: "/erkek-takim-4.jpg", tag: null },
  { name: "Kontrast Dikişli İndigo Takım", category: "Erkek Takım Elbise", price: 55000, image_url: "/erkek-takim-5.jpg", tag: "Avangart" },
  { name: "Fildişi Kruvaze Takım", category: "Erkek Takım Elbise", price: 62000, image_url: "/erkek-takim-6.jpg", tag: "Yeni" },
  { name: "İndigo Keten Gömlek", category: "Erkek Gömlek", price: 3400, image_url: "/erkek-gomlek-1.jpg", tag: "Yeni" },
  { name: "Buz Mavisi Salaş Gömlek", category: "Erkek Gömlek", price: 3200, image_url: "/erkek-gomlek-2.jpg", tag: "Öne Çıkan" },
  { name: "Lavanta Keten Karışımlı Gömlek", category: "Erkek Gömlek", price: 3500, image_url: "/erkek-gomlek-3.jpg", tag: "Yazlık" },
  { name: "Açık Gri Dokulu Gömlek", category: "Erkek Gömlek", price: 3300, image_url: "/erkek-gomlek-4.jpg", tag: "Klasik" },
  { name: "Kızıl-Kahve Pileli Pantolon", category: "Erkek Pantolon", price: 4500, image_url: "/erkek-pantolon-1.jpg", tag: "Klasik" },
  { name: "Lacivert Geniş Paça Pantolon", category: "Erkek Pantolon", price: 4800, image_url: "/erkek-pantolon-2.jpg", tag: "Avangart" },
  { name: "Çizgili Füme Klasik Pantolon", category: "Erkek Pantolon", price: 4300, image_url: "/erkek-pantolon-3.jpg", tag: "Yeni" },
  { name: "Koyu Lacivert Flared Pantolon", category: "Erkek Pantolon", price: 4900, image_url: "/erkek-pantolon-4.jpg", tag: "Akşam Stili" },
  { name: "Kum Beji Gabardin Pantolon", category: "Erkek Pantolon", price: 3900, image_url: "/erkek-pantolon-5.jpg", tag: "Günlük Şıklık" },
  { name: "Antrasit Retro Flared Pantolon", category: "Erkek Pantolon", price: 5200, image_url: "/erkek-pantolon-6.jpg", tag: "Öne Çıkan" },
  { name: "Kahverengi Oversize Deri Ceket", category: "Erkek Ceket", price: 68900, image_url: "/erkek-ceket-1.jpg", tag: "Yeni" },
  { name: "Siyah Deri Bomber Ceket", category: "Erkek Ceket", price: 54500, image_url: "/erkek-ceket-2.jpg", tag: "Çok Satan" },
  { name: "Koyu Gri Fermuarlı Deri Ceket", category: "Erkek Ceket", price: 62000, image_url: "/erkek-ceket-3.jpg", tag: null },
  { name: "Haki Yeşil Cep Detaylı Ceket", category: "Erkek Ceket", price: 38900, image_url: "/erkek-ceket-4.jpg", tag: "Öne Çıkan" },
  { name: "Camel Kargo Cep Ceket", category: "Erkek Ceket", price: 34500, image_url: "/erkek-ceket-5.jpg", tag: null },
  { name: "Bej Minimalist Gömlek Ceket", category: "Erkek Ceket", price: 29900, image_url: "/erkek-ceket-6.jpg", tag: "Yeni" },

  // PARFÜM
  { name: "Chance Eau Tendre", brand: "Chanel", category: "Parfüm", price: 8950, image_url: "/parfum-1.jpg", tag: "Çok Satan" },
  { name: "Coco Mademoiselle L'Eau Privée", brand: "Chanel", category: "Parfüm", price: 9800, image_url: "/parfum-2.jpg", tag: "Öne Çıkan" },
  { name: "Crystal Noir", brand: "Versace", category: "Parfüm", price: 4200, image_url: "/parfum-3.jpg", tag: null },
  { name: "My Way", brand: "Giorgio Armani", category: "Parfüm", price: 6500, image_url: "/parfum-4.jpg", tag: "Yeni" },
  { name: "Bleu de Chanel", brand: "Chanel", category: "Parfüm", price: 9200, image_url: "/parfum-5.jpg", tag: "Çok Satan" },
  { name: "Sauvage Parfum", brand: "Dior", category: "Parfüm", price: 7800, image_url: "/parfum-6.jpg", tag: "Klasik" },
  { name: "Eros Eau de Parfum", brand: "Versace", category: "Parfüm", price: 4800, image_url: "/parfum-7.jpg", tag: "Yeni" },

  // AYAKKABI
  { name: "Opyum Logo Topuklu Sandalet", brand: "Saint Laurent", category: "Ayakkabı", price: 42500, image_url: "/ayakkabi-1.jpg", tag: "Öne Çıkan" },
  { name: "So Kate Patent Stiletto", brand: "Christian Louboutin", category: "Ayakkabı", price: 38900, image_url: "/ayakkabi-3.jpg", tag: "Klasik" },
  { name: "Iriza D'Orsay Pembe Süet Stiletto", brand: "Christian Louboutin", category: "Ayakkabı", price: 36500, image_url: "/ayakkabi-5.jpg", tag: "Yeni" },
  { name: "Medusa Fiyonklu Bebe Mavi Topuklu", brand: "Versace", category: "Ayakkabı", price: 28900, image_url: "/ayakkabi-6.jpg", tag: null },
  { name: "Weejuns Bordo Platform Loafer", brand: "G.H. Bass", category: "Ayakkabı", price: 8900, image_url: "/ayakkabi-7.jpg", tag: "Çok Satan" },
  { name: "Kahverengi Parlak Deri Derby", brand: "EL'S", category: "Ayakkabı", price: 12500, image_url: "/ayakkabi-8.jpg", tag: "Yeni" },

  // ÇANTA
  { name: "Classic Flap Beyaz Kapitone Çanta", brand: "Chanel", category: "Çanta", price: 185000, image_url: "/canta-1.jpg", tag: "İkonik" },
  { name: "Envelope Medium Zincirli Çanta", brand: "Saint Laurent", category: "Çanta", price: 82000, image_url: "/canta-2.jpg", tag: "Çok Satan" },
  { name: "Medium Deri Omuz Çantası", brand: "Prada", category: "Çanta", price: 68000, image_url: "/canta-3.jpg", tag: "Yeni" },
  { name: "Birkin 30 Craie Epsom", brand: "Hermès", category: "Çanta", price: 520000, image_url: "/canta-4.jpg", tag: "Öne Çıkan" },
  { name: "Birkin 30 Rose Sakura Swift", brand: "Hermès", category: "Çanta", price: 545000, image_url: "/canta-5.jpg", tag: "Nadir" },
  { name: "Rock Swing Pembe Clutch", brand: "Zadig & Voltaire", category: "Çanta", price: 14500, image_url: "/canta-6.jpg", tag: null },
  { name: "Rose Kristal Minaudière", brand: "Judith Leiber", category: "Çanta", price: 95000, image_url: "/canta-7.jpg", tag: "Haute Couture" },

  // AKSESUAR
  { name: "Dancing Swan Mavi Kristal Kolye", brand: "Swarovski", category: "Aksesuar", price: 4200, image_url: "/aksesuar-1.jpg", tag: "Çok Satan" },
  { name: "Crash Pırlanta Saat", brand: "Cartier", category: "Aksesuar", price: 285000, image_url: "/aksesuar-2.jpg", tag: "Öne Çıkan" },
  { name: "Panthère Pırlanta Saat", brand: "Cartier", category: "Aksesuar", price: 1250000, image_url: "/aksesuar-3.jpg", tag: "Haute Joaillerie" },
  { name: "Medusa Coin Altın Saat", brand: "Versace", category: "Aksesuar", price: 62000, image_url: "/aksesuar-4.jpg", tag: "Yeni" },
  { name: "Equestrian İpek Eşarp", brand: "Ralph Lauren", category: "Aksesuar", price: 8900, image_url: "/aksesuar-5.jpg", tag: null },
  { name: "RL Logo İnce Deri Kemer", brand: "Ralph Lauren", category: "Aksesuar", price: 5400, image_url: "/aksesuar-6.jpg", tag: "Klasik" },
  { name: "Cat-Eye Slim Güneş Gözlüğü", brand: "Marc Jacobs", category: "Aksesuar", price: 6800, image_url: "/aksesuar-7.jpg", tag: null },
  { name: "Triomphe Kare Güneş Gözlüğü", brand: "Celine", category: "Aksesuar", price: 12500, image_url: "/aksesuar-8.jpg", tag: "Yeni" },

  // MAKYAJ
  { name: "Make Me Blush Likit Allık", brand: "Yves Saint Laurent", category: "Makyaj", price: 2850, image_url: "/makyaj-1.jpg", tag: "Yeni" },
  { name: "Forever Skin Correct Kapatıcı Stick", brand: "Dior", category: "Makyaj", price: 3200, image_url: "/makyaj-2.jpg", tag: "Çok Satan" },
  { name: "Luminous Silk Perfect Glow Kapatıcı", brand: "Giorgio Armani", category: "Makyaj", price: 2600, image_url: "/makyaj-3.jpg", tag: "Öne Çıkan" },
  { name: "Rouge Pur Couture Leopard Edition Ruj", brand: "Yves Saint Laurent", category: "Makyaj", price: 2400, image_url: "/makyaj-4.jpg", tag: "Limitli" },
  { name: "Rouge Pur Couture Saten Ruj", brand: "Yves Saint Laurent", category: "Makyaj", price: 2200, image_url: "/makyaj-5.jpg", tag: "Klasik" },
  { name: "Le Cushion Encre de Peau Fondöten", brand: "Yves Saint Laurent", category: "Makyaj", price: 3800, image_url: "/makyaj-6.jpg", tag: "Çok Satan" },
  { name: "Dessin du Regard Waterproof Göz Kalemi", brand: "Yves Saint Laurent", category: "Makyaj", price: 1650, image_url: "/makyaj-7.jpg", tag: null },
  { name: "3D Hydra Lipgloss Simli Dudak Parlatıcı", brand: "Kiko Milano", category: "Makyaj", price: 690, image_url: "/makyaj-8.jpg", tag: "Yeni" },
];

async function migrate() {
  console.log(`Starting migration of ${allProducts.length} products...`);
  
  const { data, error } = await supabase
    .from("products")
    .insert(allProducts)
    .select();

  if (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }

  console.log("Migration successful!", data?.length, "products inserted.");
}

migrate();
