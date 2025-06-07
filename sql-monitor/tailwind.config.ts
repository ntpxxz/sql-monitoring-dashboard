import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       colors: {
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
        },
        teal: {
          600: '#0D9488',
          500: '#14B8A6',
          400: '#2DD4BF',
        },
        sky: {
            400: '#38BDF8'
        },
        amber: {
            400: '#FBBF24'
        }
      },
    },
  },
  plugins: [],
};
export default config;
