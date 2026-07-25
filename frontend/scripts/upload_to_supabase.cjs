/**
 * Upload all product assets & generated color variants to Supabase Storage Bucket
 * 
 * Usage:
 *   node scripts/upload_to_supabase.cjs [SUPABASE_ANON_KEY_OR_SERVICE_KEY]
 * 
 * Or set environment variable:
 *   $env:SUPABASE_KEY="your-supabase-key"
 *   node scripts/upload_to_supabase.cjs
 */

const fs = require('fs');
const path = require('path');


// Load environment variables from backend/.env if available
const backendEnvPath = path.join(__dirname, '../../backend/.env');
if (fs.existsSync(backendEnvPath)) {
  const envContent = fs.readFileSync(backendEnvPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Derive Supabase project URL from DB host if available
const dbHost = process.env.DATABASE_HOST || 'aws-0-eu-west-1.pooler.supabase.com';
const projectRefMatch = dbHost.match(/^aws-0-[a-z0-9-]+.pooler.supabase.com$/) 
  || process.env.DATABASE_USERNAME?.match(/^postgres\.([a-z0-9]+)$/);

const projectRef = process.env.SUPABASE_PROJECT_REF 
  || (process.env.DATABASE_USERNAME ? process.env.DATABASE_USERNAME.replace('postgres.', '') : 'hwflovsgqxozefihexxj');

const supabaseUrl = process.env.SUPABASE_URL || `https://${projectRef}.supabase.co`;
const supabaseKey = process.argv[2] || process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

console.log(`=== SUPABASE STORAGE UPLOADER ===`);
console.log(`Project URL: ${supabaseUrl}`);

if (!supabaseKey) {
  console.log(`\n⚠️  SUPABASE_KEY is missing!`);
  console.log(`To upload images directly to Supabase Storage, run:`);
  console.log(`  node scripts/upload_to_supabase.cjs <YOUR_SUPABASE_SERVICE_KEY_OR_ANON_KEY>\n`);
  console.log(`Or set SUPABASE_KEY in backend/.env file.`);
  process.exit(0);
}

const bucketName = process.env.SUPABASE_BUCKET || 'product-images';
const assetsDir = path.join(__dirname, '../public/assets');

async function uploadImages() {
  const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'));
  console.log(`Found ${files.length} image assets to upload to bucket '${bucketName}'...\n`);

  let successCount = 0;
  let failCount = 0;
  const urlMap = {};

  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    const fileData = fs.readFileSync(filePath);

    let contentType = 'image/png';
    if (file.endsWith('.jpg') || file.endsWith('.jpeg')) contentType = 'image/jpeg';
    if (file.endsWith('.webp')) contentType = 'image/webp';

    const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${file}`;

    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
          'Content-Type': contentType,
          'x-upsert': 'true'
        },
        body: fileData
      });

      if (response.ok) {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${file}`;
        urlMap[file] = publicUrl;
        successCount++;
        console.log(` [${successCount}/${files.length}] Uploaded: ${file} -> ${publicUrl}`);
      } else {
        const errText = await response.text();
        failCount++;
        console.error(` ❌ [${failCount}] Failed to upload ${file}: ${response.status} - ${errText}`);
      }
    } catch (err) {
      failCount++;
      console.error(` ❌ [${failCount}] Network error uploading ${file}: ${err.message}`);
    }
  }

  console.log(`\n=== UPLOAD SUMMARY ===`);
  console.log(`Successfully Uploaded: ${successCount}`);
  console.log(`Failed: ${failCount}`);

  // Write mapping JSON
  const mapPath = path.join(__dirname, 'supabase_image_urls.json');
  fs.writeFileSync(mapPath, JSON.stringify(urlMap, null, 2));
  console.log(`Public CDN URLs saved to: ${mapPath}`);
}

uploadImages();
