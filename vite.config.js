import path from 'path';
import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Gather all HTML input files
const rootFolders = [path.resolve(__dirname, 'index.html')].concat(
	glob.sync(path.resolve(__dirname, 'src', '*.html'))
);
const inputFolders = rootFolders.concat(
	glob.sync(path.resolve(__dirname, 'src/blogs', '*.html'))
);

export default defineConfig({
	root: path.resolve(__dirname),
	base: '/', // Using a custom domain, so base should be root
	build: {
		outDir: path.join(__dirname, 'dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: inputFolders,
		},
	},
	plugins: [
		handlebars({
			partialDirectory: path.resolve(__dirname, 'src', 'partials'),
		}),
	],
});
