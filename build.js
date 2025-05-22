const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Function to copy files
async function copyFiles() {
  // Copy all HTML files from src to dist
  const srcHtmlFiles = [
    'src/team.html',
    'src/membership.html',
    'src/media.html',
    'src/initiatives.html',
    'src/friend.html',
    'src/contact.html',
    'src/about.html',
    ...glob.sync('src/blogs/*.html')
  ];

  for (const file of srcHtmlFiles) {
    if (fs.existsSync(file)) {
      const destPath = path.join('dist', path.basename(file));
      await fs.copy(file, destPath);
      console.log(`Copied ${file} to ${destPath}`);
    }
  }

  // Copy all static assets
  const staticFiles = [
    'src/favicon-16x16.png',
    'src/favicon-32x32.png',
    'src/android-chrome-192x192.png',
    'src/android-chrome-512x512.png',
    'src/apple-touch-icon.png',
    'src/wec-global.png',
    'src/site.webmanifest'
  ];

  for (const file of staticFiles) {
    if (fs.existsSync(file)) {
      await fs.copy(file, path.join('dist', path.basename(file)));
      console.log(`Copied ${file} to dist/`);
    }
  }
}

// Run the copy function
copyFiles().catch(console.error); 