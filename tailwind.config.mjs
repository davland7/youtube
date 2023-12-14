/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      screens: {
        'split-screen': '1224px',
      }
    },
	},
	plugins: [
		require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
	],
}
