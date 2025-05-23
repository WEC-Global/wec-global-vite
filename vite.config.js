import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

// Function to get all HTML files
function getHtmlFiles() {
  const input = {};
  
  // Get HTML files from root directory
  const rootFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'));
  
  rootFiles.forEach(file => {
    const name = file.replace('.html', '');
    input[name] = path.resolve(__dirname, file);
  });
  
  // Get files from blogs directory
  const blogsDir = path.resolve(__dirname, 'blogs');
  if (fs.existsSync(blogsDir)) {
    const blogFiles = fs.readdirSync(blogsDir)
      .filter(file => file.endsWith('.html'));
    
    blogFiles.forEach(file => {
      const name = `blogs/${file.replace('.html', '')}`;
      input[name] = path.resolve(blogsDir, file);
    });
  }
  
  return input;
}

const htmlPages = getHtmlFiles();

export default defineConfig({
  root: __dirname,
  base: '/', // Use root path for custom domain
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlPages
    }
  }
});