const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Run with --env-file=.env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const publicDir = path.join(__dirname, "public");
const bucketName = "product-images";

async function uploadImages() {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to upload...`);

  for (const file of imageFiles) {
    const filePath = path.join(publicDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type
    let contentType = "image/jpeg";
    if (file.endsWith(".png")) contentType = "image/png";
    if (file.endsWith(".webp")) contentType = "image/webp";
    if (file.endsWith(".svg")) contentType = "image/svg+xml";

    console.log(`Uploading ${file}...`);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(file, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${file}:`, error.message);
    } else {
      console.log(`Successfully uploaded ${file}`);
    }
  }

  console.log("Upload process completed.");
}

uploadImages();
