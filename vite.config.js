import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

// const pageData = {
// 	'/index.html': {
// 		title: 'Main Page',
// 	},
// 	'/nested/subpage.html': {
// 		title: 'Sub Page',
// 	},
// };

export default {
	plugins: [
		handlebars({
			// context(pagePath) {
			// 	return pageData[pagePath];
			// },
			partialDirectory: resolve(__dirname, 'partials'),
		}),
	],
};
