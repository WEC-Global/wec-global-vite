import path from 'path';
import fs from 'fs';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Function to get all HTML files
function getHtmlFiles() {
  const htmlFiles = [path.resolve(__dirname, 'index.html')];
  
  // Get files from src directory
  const srcDir = path.resolve(__dirname, 'src');
  if (fs.existsSync(srcDir)) {
    const srcFiles = fs.readdirSync(srcDir)
      .filter(file => file.endsWith('.html'))
      .map(file => path.resolve(srcDir, file));
    htmlFiles.push(...srcFiles);
  }
  
  // Get files from src/blogs directory
  const blogsDir = path.resolve(__dirname, 'src', 'blogs');
  if (fs.existsSync(blogsDir)) {
    const blogFiles = fs.readdirSync(blogsDir)
      .filter(file => file.endsWith('.html'))
      .map(file => path.resolve(blogsDir, file));
    htmlFiles.push(...blogFiles);
  }
  
  return htmlFiles;
}

const htmlPages = getHtmlFiles();

export default defineConfig({
  root: path.resolve(__dirname),
  base: '/', // Root-relative for custom domain
  publicDir: 'public', // Set to public directory
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: htmlPages
    }
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src', 'partials'),
    }),
  ]
});