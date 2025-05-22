import path from 'path';
import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Collect all HTML files: root + /src + /src/blogs
const htmlPages = [
  path.resolve(__dirname, 'index.html'),
  ...glob.sync(path.resolve(__dirname, 'src', '*.html')),
  ...glob.sync(path.resolve(__dirname, 'src/blogs', '*.html'))
];

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
