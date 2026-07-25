const fs = require('fs');
const path = require('path');

const seedFile = fs.readFileSync(
  path.join(__dirname, '../../backend/src/products/products.service.ts'),
  'utf-8'
);

// Extract the mockProducts array text
const arrayMatch = seedFile.match(/const mockProducts: Partial<Product>\[\] = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
  console.error("Could not find mockProducts array");
  process.exit(1);
}

// Convert object literal text to valid JSON or parse with Function
let arrayCode = arrayMatch[1];
// Strip TypeScript annotations if any, though it's standard JS object literals
let products;
try {
  products = eval(`(${arrayCode})`);
} catch (e) {
  console.error("Eval error:", e);
  process.exit(1);
}

console.log(`Parsed ${products.length} products successfully from backend seed data.`);

// Collect all products that have an imageUrl and multiple colors
const byImage = {};
const baseColorByImage = {};

for (const p of products) {
  if (!p.imageUrl || p.imageUrl.trim() === '') continue;
  if (!p.colors || !p.colors.includes(',')) continue;

  const colorList = p.colors.split(',').map(c => c.trim()).filter(Boolean);
  if (colorList.length <= 1) continue;

  if (!byImage[p.imageUrl]) {
    byImage[p.imageUrl] = new Set();
    baseColorByImage[p.imageUrl] = colorList[0];
  }
  for (const c of colorList) {
    byImage[p.imageUrl].add(c);
  }
}

const variantsNeeded = [];
for (const [imageUrl, colorsSet] of Object.entries(byImage)) {
  const baseColor = baseColorByImage[imageUrl];
  const allColors = [...colorsSet];
  const variantColors = allColors.filter(c => c !== baseColor);

  for (const vc of variantColors) {
    const baseName = path.basename(imageUrl, path.extname(imageUrl));
    const outputName = `${baseName}_${vc}.png`;
    variantsNeeded.push({
      sourceImage: imageUrl,
      baseColor,
      variantColor: vc,
      outputFileName: outputName
    });
  }
}

console.log(`Total unique product source images found: ${Object.keys(byImage).length}`);
console.log(`Total unique color variants required: ${variantsNeeded.length}`);

// Save to color_variants_manifest.json
const manifestPath = path.join(__dirname, 'color_variants_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(variantsNeeded, null, 2));
console.log(`Updated manifest written to ${manifestPath}`);
