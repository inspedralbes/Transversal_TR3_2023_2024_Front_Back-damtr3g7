/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				moveAndRotate: {
					'0%': {
						transform: 'translateX(-20px) rotate(-5deg)'
					  },
					
					  '50%': {
						transform: 'translateX(20px) rotate(5deg)'
					  },
					
					  '100%': {
						transform: 'translateX(-20px) rotate(-5deg)'
					  }
				}
			  }
		},
	},
	plugins: [],
}
