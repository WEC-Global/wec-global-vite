import path from 'path';
import fs from 'fs';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Function to get all HTML files with proper naming
function getHtmlFiles() {
  const input = {
    index: path.resolve(__dirname, 'index.html')
  };

  const rootFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html') && file !== 'index.html');

  rootFiles.forEach(file => {
    const name = file.replace('.html', '');
    input[name] = path.resolve(__dirname, file);
  });

  const blogsDir = path.resolve(__dirname, 'blogs');
if (fs.existsSync(blogsDir)) {
  const blogFiles = fs.readdirSync(blogsDir)
    .filter(file => file.endsWith('.html'));

  blogFiles.forEach(file => {
    const name = path.posix.join('blogs', file.replace('.html', '')); // ✅ normalize
    input[name] = path.resolve(blogsDir, file);
  });
}



  return input;
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
      input: htmlPages,
      output: {
  assetFileNames: 'assets/[name].[hash][extname]',
  chunkFileNames: 'assets/[name].[hash].js',
}

  },
  plugins: [
    handlebars({
      partialDirectory: [
        path.resolve(__dirname, 'src', 'partials')
      ],
      partialsExtension: '.html'
    }),
  ]
}});