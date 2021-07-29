import path from 'path';
// import glob from 'glob';
import handlebars from 'vite-plugin-handlebars';

export default {
	root: path.resolve(__dirname, 'src'),
	build: {
		outDir: path.join(__dirname, 'dist'),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, '/index.html'),
				about: path.resolve(__dirname, '/about.html'),
				contact: path.resolve(__dirname, '/contact.html'),
				friend: path.resolve(__dirname, '/friend.html'),
				initiatives: path.resolve(__dirname, '/initiatives.html'),
				media: path.resolve(__dirname, '/media.html'),
				membership: path.resolve(__dirname, '/membership.html'),
				team: path.resolve(__dirname, '/team.html'),
				connections: path.resolve(__dirname, '/blogs/connections.html'),
				'changing-the-workplace-environment': path.resolve(
					__dirname,
					'/blogs/changing-the-workplace-environment.html'
				),
			},
		},
	},
	plugins: [
		handlebars({
			partialDirectory: path.resolve(__dirname, 'src', 'partials'),
		}),
	],
};
