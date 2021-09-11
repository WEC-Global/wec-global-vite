import path from 'path';
import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';

// Add the root folder and the blogs folder to rollupOptions.input
rootFolders = glob.sync(path.resolve(__dirname, 'src', '*.html'));
inputFolders = rootFolders.concat(
	glob.sync(path.resolve(__dirname, 'src/blogs', '*.html'))
);

export default {
	root: path.resolve(__dirname, 'src'),
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
};
