/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: { },
	plugins: [
		require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
	],
}
