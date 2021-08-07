import path from 'path';
import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';
import copy from 'rollup-plugin-copy';

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
			// input: {
			// 	main: path.resolve(__dirname, '/index.html'),
			// 	about: path.resolve(__dirname, '/about.html'),
			// 	contact: path.resolve(__dirname, '/contact.html'),
			// 	friend: path.resolve(__dirname, '/friend.html'),
			// 	initiatives: path.resolve(__dirname, '/initiatives.html'),
			// 	media: path.resolve(__dirname, '/media.html'),
			// 	membership: path.resolve(__dirname, '/membership.html'),
			// 	team: path.resolve(__dirname, '/team.html'),
			// 	connections: path.resolve(__dirname, '/blogs/connections.html'),
			// 	'changing-the-workplace-environment': path.resolve(
			// 		__dirname,
			// 		'/blogs/changing-the-workplace-environment.html'
			// 	),
			// },
		},
	},
	plugins: [
		handlebars({
			partialDirectory: path.resolve(__dirname, 'src', 'partials'),
		}),
		copy({
			targets: [
				{ src: './src/assets/docs', dest: './dist/assets/docs' },
				{ src: './src/assets/img/*', dest: './dist/assets/img' },
			],
			flatten: false,
			hook: 'writeBundle',
		}),
	],
};
