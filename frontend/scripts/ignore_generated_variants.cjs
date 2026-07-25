const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'color_variants_manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error("Manifest not found.");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const generatedFiles = manifest.map(item => item.outputFileName);

const gitignorePath = path.join(__dirname, '../.gitignore');
let gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

const markerStart = '# === BEGIN GENERATED COLOR VARIANTS (SUPABASE STORAGE) ===';
const markerEnd = '# === END GENERATED COLOR VARIANTS ===';

const newLines = [
  markerStart,
  ...generatedFiles.map(f => `public/assets/${f}`),
  markerEnd
].join('\n');

if (gitignoreContent.includes(markerStart)) {
  const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`);
  gitignoreContent = gitignoreContent.replace(regex, newLines);
} else {
  gitignoreContent += `\n\n${newLines}\n`;
}

fs.writeFileSync(gitignorePath, gitignoreContent);
console.log(`Updated ${gitignorePath} with ${generatedFiles.length} generated variant ignore entries.`);
