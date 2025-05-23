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
  base: '/wec-global-vite/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: htmlPages
    }
  },
  plugins: [
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        // Replace absolute paths with base-relative paths
        return html
          // Update href attributes
          .replace(/href="\/(?!wec-global-vite\/)/g, 'href="/wec-global-vite/')
          // Update src attributes
          .replace(/src="\/(?!wec-global-vite\/)/g, 'src="/wec-global-vite/')
          // Update action attributes (for forms)
          .replace(/action="\/(?!wec-global-vite\/)/g, 'action="/wec-global-vite/');
      }
    }
  ]
});