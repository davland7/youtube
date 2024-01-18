/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
    extend: {
      colors: {
        primary: '#e95d2a',
        secondary: '#f4f4f6',
      },
    },
  },
	plugins: [
		require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
	],
}
