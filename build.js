const fs = require('fs-extra');
const path = require('path');

// Function to copy static assets only
async function copyStaticAssets() {
  // Copy all static assets (NOT HTML files - Vite handles those)
  const staticFiles = [
    'favicon-16x16.png',
    'favicon-32x32.png', 
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'wec-global.png',
    'site.webmanifest'
  ];

  // Check both root and src for static files
  const possiblePaths = ['', 'src/', 'public/'];

  for (const file of staticFiles) {
    let copied = false;
    for (const srcDir of possiblePaths) {
      const fullPath = path.join(srcDir, file);
      if (fs.existsSync(fullPath)) {
        await fs.copy(fullPath, path.join('dist', file));
        console.log(`Copied ${fullPath} to dist/${file}`);
        copied = true;
        break;
      }
    }
    if (!copied) {
      console.log(`Warning: ${file} not found in any source directory`);
    }
  }
}

// Run the copy function
copyStaticAssets().catch(console.error);