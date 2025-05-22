import path from 'path';
import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

// Add the root folder and the blogs folder to rollupOptions.input
rootFolders = [path.resolve(__dirname, 'index.html')].concat(
	glob.sync(path.resolve(__dirname, 'src', '*.html'))
);
inputFolders = rootFolders.concat(
	glob.sync(path.resolve(__dirname, 'src/blogs', '*.html'))
);

export default defineConfig({
	root: path.resolve(__dirname),
	base: '/',
	// assetsInclude: 'pdf',
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
