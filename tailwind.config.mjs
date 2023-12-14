/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      screens: {
        'desktop': '1025px',
      }
    },
	},
	plugins: [
		require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
	],
}
