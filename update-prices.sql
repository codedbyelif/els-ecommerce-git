-- Supabase Dashboard > SQL Editor'da çalıştır
-- Parfüm, Makyaj, Aksesuar, Çanta HARİÇ tüm fiyatlar güncelleniyor

-- Erkek Gömlek (3.200-3.500 → 8.500-11.800)
UPDATE products SET price = 8500  WHERE name = 'Buz Mavisi Salaş Gömlek';
UPDATE products SET price = 9200  WHERE name = 'Açık Gri Dokulu Gömlek';
UPDATE products SET price = 10500 WHERE name = 'İndigo Keten Gömlek';
UPDATE products SET price = 11800 WHERE name = 'Lavanta Keten Karışımlı Gömlek';

-- Erkek Pantolon (3.900-5.200 → 12.500-21.500)
UPDATE products SET price = 12500 WHERE name = 'Kum Beji Gabardin Pantolon';
UPDATE products SET price = 14200 WHERE name = 'Çizgili Füme Klasik Pantolon';
UPDATE products SET price = 15800 WHERE name = 'Kızıl-Kahve Pileli Pantolon';
UPDATE products SET price = 17500 WHERE name = 'Lacivert Geniş Paça Pantolon';
UPDATE products SET price = 18900 WHERE name = 'Koyu Lacivert Flared Pantolon';
UPDATE products SET price = 21500 WHERE name = 'Antrasit Retro Flared Pantolon';

-- Kadın Bluz & Gömlek (6.400-8.900 → 14.500-22.500)
UPDATE products SET price = 14500 WHERE name = 'Beyaz Keten Gömlek';
UPDATE products SET price = 16800 WHERE name = 'Beyaz Wrap Gömlek';
UPDATE products SET price = 19200 WHERE name = 'Mürdüm Asimetrik Bluz';
UPDATE products SET price = 22500 WHERE name = 'Kahverengi Twist Bluz';

-- Kadın Etek (5.800-18.500 → 13.500-38.500)
UPDATE products SET price = 13500 WHERE name = 'Beyaz Klasik Mini Etek';
UPDATE products SET price = 16500 WHERE name = 'Gri Pileli Mini Etek';
UPDATE products SET price = 18900 WHERE name = 'Siyah Tailored Mini Etek';
UPDATE products SET price = 21500 WHERE name = 'Antrasit Wrap Mini Etek';
UPDATE products SET price = 24500 WHERE name = 'Koyu Gri Deri Mini Etek';
UPDATE products SET price = 28900 WHERE name = 'Kahverengi Pileli Maxi Etek';
UPDATE products SET price = 32500 WHERE name = 'Siyah Asimetrik Volanlı Etek';
UPDATE products SET price = 38500 WHERE name = 'Lacivert Jakar Asimetrik Etek';

-- Kadın Pantolon (9.800-15.800 → 22.500-38.500)
UPDATE products SET price = 22500 WHERE name = 'Gri Pileli Wide Leg Pantolon';
UPDATE products SET price = 26800 WHERE name = 'Bej Keten Wrap Pantolon';
UPDATE products SET price = 29500 WHERE name = 'Siyah Etek Detaylı Pantolon';
UPDATE products SET price = 32500 WHERE name = 'Gümüş Saten Wrap Pantolon';
UPDATE products SET price = 35800 WHERE name = 'Antrasit Asimetrik Pantolon';
UPDATE products SET price = 38500 WHERE name = 'Bej Saten Wide Leg Pantolon';

-- Kadın Elbise (12.300-26.800 → 28.500-52.000)
UPDATE products SET price = 28500 WHERE name = 'Siyah V Yaka Midi Elbise';
UPDATE products SET price = 38900 WHERE name = 'Açık Yeşil Halter Elbise';
UPDATE products SET price = 38900 WHERE name = 'Kırmızı Halter Midi Elbise';
UPDATE products SET price = 45500 WHERE name = 'Pudra Korse Midi Elbise';
UPDATE products SET price = 45500 WHERE name = 'Zümrüt Yeşili Korse Elbise';
UPDATE products SET price = 52000 WHERE name = 'Beyaz Tül Korse Elbise';

-- Kadın Ceket (18.900-34.900 → 32.500-62.000)
UPDATE products SET price = 32500 WHERE name = 'Ekose Flannel Shacket';
UPDATE products SET price = 42500 WHERE name = 'Karamel Süet Crop Ceket' AND category = 'Kadın Ceket';
UPDATE products SET price = 46500 WHERE name = 'Koyu Kahve Crop Deri Ceket';
UPDATE products SET price = 49800 WHERE name = 'Haki Süet Oversized Ceket';
UPDATE products SET price = 54500 WHERE name = 'Kahverengi Tüvit Crop Ceket';
UPDATE products SET price = 62000 WHERE name = 'Kahverengi Korse Deri Ceket';

-- Erkek Ceket (29.900-68.900 → 42.500-88.500)
UPDATE products SET price = 42500 WHERE name = 'Bej Minimalist Gömlek Ceket';
UPDATE products SET price = 48500 WHERE name = 'Camel Kargo Cep Ceket';
UPDATE products SET price = 55000 WHERE name = 'Haki Yeşil Cep Detaylı Ceket';
UPDATE products SET price = 72000 WHERE name = 'Siyah Deri Bomber Ceket';
UPDATE products SET price = 79500 WHERE name = 'Koyu Gri Fermuarlı Deri Ceket';
UPDATE products SET price = 88500 WHERE name = 'Kahverengi Oversize Deri Ceket';

-- Erkek Takım Elbise (42.900-62.000 → 55.000-85.000)
UPDATE products SET price = 55000 WHERE name = 'Adaçayı Yeşili Keten Takım';
UPDATE products SET price = 58500 WHERE name = 'İndigo Günlük Takım';
UPDATE products SET price = 65000 WHERE name = 'Lacivert Kruvaze Takım';
UPDATE products SET price = 72000 WHERE name = 'Kırık Beyaz Monokrom Takım';
UPDATE products SET price = 78500 WHERE name = 'Kontrast Dikişli İndigo Takım';
UPDATE products SET price = 85000 WHERE name = 'Fildişi Kruvaze Takım';

-- Ayakkabı (8.900-42.500 → 18.500-62.000)
UPDATE products SET price = 18500 WHERE name = 'Weejuns Bordo Platform Loafer';
UPDATE products SET price = 24500 WHERE name = 'Kahverengi Parlak Deri Derby';
UPDATE products SET price = 38500 WHERE name = 'Medusa Fiyonklu Bebe Mavi Topuklu';
UPDATE products SET price = 48500 WHERE name = 'Iriza D''Orsay Pembe Süet Stiletto';
UPDATE products SET price = 52000 WHERE name = 'So Kate Patent Stiletto';
UPDATE products SET price = 62000 WHERE name = 'Opyum Logo Topuklu Sandalet';
