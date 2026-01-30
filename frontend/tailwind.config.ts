import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#059669', // Emerald 600
                    dark: '#064e3b',    // Emerald 900
                    light: '#34d399',   // Emerald 400
                },
                gold: {
                    DEFAULT: '#d97706', // Amber 600
                    dark: '#b45309',    // Amber 700
                    light: '#fbbf24',   // Amber 400
                },
                slate: {
                    DEFAULT: '#334155', // Slate 700
                    dark: '#0f172a',    // Slate 900
                    light: '#f1f5f9',   // Slate 100
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
