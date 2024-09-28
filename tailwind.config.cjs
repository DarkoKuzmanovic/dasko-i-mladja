const { join } = require('path');
const { skeleton } = require('@skeletonlabs/tw-plugin');
import { myCustomTheme } from './my-custom-theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'dark',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				custom: [
					myCustomTheme
				]
			}
		})
	]
}