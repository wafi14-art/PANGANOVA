import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0A1E1A',
          900: '#0E2923',
          800: '#123B32', // Deep Forest Green primary
          700: '#184F43',
          600: '#1E6858',
        },
        emerald: {
          DEFAULT: '#1E8063', // Emerald Green
          dark: '#16654E',
          light: '#28A782',
          subtle: '#E8F5F1',
        },
        gold: {
          DEFAULT: '#E8B65A', // Harvest Gold
          dark: '#C89335',
          light: '#F4D28E',
          subtle: '#FCF7EC',
        },
        ivory: {
          DEFAULT: '#F4F3ED', // Warm Ivory
          warm: '#F8F7F2',
          dark: '#EBE9DF',
          border: '#E2DFD2',
        },
        charcoal: {
          DEFAULT: '#202B29', // Charcoal text
          dark: '#141C1A',
          muted: '#52635F',
          subtle: '#788B87',
        },
        surface: {
          dark: '#162822', // Dark editorial card surface
          darker: '#11221D',
          border: '#243D35',
        },
        trend: {
          up: '#1E8063', // Kenaikan harga
          down: '#DC2626', // Penurunan harga
          neutral: '#788B87',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        editorial: '0 1px 3px rgba(18, 59, 50, 0.05), 0 1px 2px rgba(18, 59, 50, 0.03)',
        card: '0 1px 4px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config;

