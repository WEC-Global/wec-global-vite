import path from 'path';
import fs from 'fs';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Function to get all HTML files with proper naming
function getHtmlFiles() {
  const input = {
    main: path.resolve(__dirname, 'index.html')
  };
  
  // Get files from src directory
  const srcDir = path.resolve(__dirname, 'src');
  if (fs.existsSync(srcDir)) {
    const srcFiles = fs.readdirSync(srcDir)
      .filter(file => file.endsWith('.html'));
    
    srcFiles.forEach(file => {
      const name = file.replace('.html', '');
      input[name] = path.resolve(srcDir, file);
    });
  }
  
  // Get files from src/blogs directory
  const blogsDir = path.resolve(__dirname, 'src', 'blogs');
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
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  plugins: [
    // Removed handlebars plugin since it's not working
  ]
});
