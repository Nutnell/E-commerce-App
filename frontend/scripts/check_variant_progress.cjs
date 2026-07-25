const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'color_variants_manifest.json');
const assetsDir = path.join(__dirname, '../public/assets');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let doneCount = 0;
let pendingCount = 0;

const pendingList = [];

for (const item of manifest) {
  const filePath = path.join(assetsDir, item.outputFileName);
  if (fs.existsSync(filePath)) {
    doneCount++;
  } else {
    pendingCount++;
    pendingList.push(item);
  }
}

console.log(`=== COLOR VARIANT GENERATION STATUS ===`);
console.log(`Total Variants Required: ${manifest.length}`);
console.log(`Completed & Verified:    ${doneCount}`);
console.log(`Pending / Remaining:     ${pendingCount}\n`);

console.log(`--- Next 15 Pending Variants in Queue ---`);
for (const p of pendingList.slice(0, 15)) {
  console.log(`- [ ] ${p.sourceImage} (${p.baseColor} -> ${p.variantColor}) => ${p.outputFileName}`);
}

fs.writeFileSync(
  path.join(__dirname, 'pending_variants.json'),
  JSON.stringify(pendingList, null, 2)
);
