// Extract all unique (imageUrl, baseColor, variantColor) pairs needed
// Run with: node scripts/extract_color_variants.js

const fs = require('fs');
const path = require('path');

// Read the seed file
const seedFile = fs.readFileSync(
  path.join(__dirname, '../../backend/src/products/products.service.ts'),
  'utf-8'
);

// Parse out all product objects with imageUrl and colors
const productRegex = /imageUrl:\s*'([^']+)',[\s\S]*?colors:\s*'([^']+)'/g;
let match;
const products = [];
while ((match = productRegex.exec(seedFile)) !== null) {
  const imageUrl = match[1];
  const colors = match[2].split(',');
  products.push({ imageUrl, colors, baseColor: colors[0] });
}

console.log(`Found ${products.length} products total.\n`);

// Group by unique imageUrl
const byImage = {};
for (const p of products) {
  if (!byImage[p.imageUrl]) {
    byImage[p.imageUrl] = new Set();
  }
  for (const c of p.colors) {
    byImage[p.imageUrl].add(c);
  }
}

// For each unique image, figure out which colors need variant images generated
// The FIRST color for each image is the "base" (what the photo already shows)
// We need to generate variants for all OTHER colors
const variantsNeeded = [];
const baseColorByImage = {};

for (const p of products) {
  if (!baseColorByImage[p.imageUrl]) {
    baseColorByImage[p.imageUrl] = p.baseColor;
  }
}

for (const [imageUrl, colorsSet] of Object.entries(byImage)) {
  const baseColor = baseColorByImage[imageUrl];
  const allColors = [...colorsSet];
  const variantColors = allColors.filter(c => c !== baseColor);
  
  for (const vc of variantColors) {
    const baseName = path.basename(imageUrl, path.extname(imageUrl));
    const outputName = `${baseName}_${vc}`;
    variantsNeeded.push({
      sourceImage: imageUrl,
      baseColor,
      variantColor: vc,
      outputFileName: `${outputName}.png`,
    });
  }
}

// Deduplicate (same sourceImage + variantColor = only need to generate once)
const seen = new Set();
const unique = [];
for (const v of variantsNeeded) {
  const key = `${v.sourceImage}|${v.variantColor}`;
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(v);
  }
}

console.log(`Unique images: ${Object.keys(byImage).length}`);
console.log(`Total variant images to generate: ${unique.length}\n`);

console.log('--- Variants needed ---');
for (const v of unique) {
  console.log(`  ${v.sourceImage} [base: ${v.baseColor}] → ${v.variantColor} → ${v.outputFileName}`);
}

// Write manifest to JSON for the generation script
fs.writeFileSync(
  path.join(__dirname, 'color_variants_manifest.json'),
  JSON.stringify(unique, null, 2)
);
console.log(`\nManifest written to scripts/color_variants_manifest.json`);
