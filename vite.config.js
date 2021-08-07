import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import mpa from 'vite-plugin-mpa';

module.exports = {
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, './src/index.html'),
				// about: resolve(__dirname, './src/about.html'),
				// contact: resolve(__dirname, './src/contact.html'),
				// friend: resolve(__dirname, './src/friend.html'),
				// initiatives: resolve(__dirname, './src/initiatives.html'),
				// media: resolve(__dirname, './src/media.html'),
				// membership: resolve(__dirname, './src/membership.html'),
				// team: resolve(__dirname, './src/team.html'),
				// nested: resolve(__dirname, '.src/blogs'),
			},
		},
	},
};

export default {
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'partials'),
		}),
		mpa({
			open: 'src/*.html',
			scanDir: 'src/blogs/*.html',
		}),
	],
};
