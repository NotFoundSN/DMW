/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			purple: {
				DEFAULT: "#7C3AED",
				op: "rgba(124, 58, 237, 0.8)",
				dark: "#6B21A8",
				darkOp: "rgba(107, 33, 168, 0.85)",
				light: "#A78BFA",
				lightOp: "rgba(167, 139, 250, 0.6)",
				blue: "#0EA5E9",
				blueOp: "rgba(14, 165, 233, 0.829)",
			},
			blue: {
				DEFAULT: "#0EA5E9",
				dark: "#0284C7",
				light: "#38BDF8",
			},
			white: {
				DEFAULT: "#f8f8ff",
			},
			red: {
				DEFAULT: "#ff0000",
			},
			black: "#000000",
		},
		extend: {
			dropShadow: {
				sombra: "2rem 2rem 1rem #4444dd",
				text: "0.1rem 0.1rem 0.1rem #000000",
				button: "0.2rem 0.2rem 0.3rem #000000",
			},
		},
	},
	plugins: [],
};
