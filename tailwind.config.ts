import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated Navy-based Charcoal Dark Mode Palette
        navy: {
          950: '#080d1a', // Deepest midnight canvas
          900: '#0f172a', // Rich navy charcoal surface
          850: '#141f36', // Elevated navy card surface
          800: '#1e293b', // Navy slate card container
          750: '#25344d', // Elevated interactive surface
          700: '#334155', // Subtle refined border
          600: '#475569', // Subtle divider border
          500: '#64748b', // Muted label text
          400: '#94a3b8', // High-readability secondary text
          300: '#cbd5e1', // High-readability description text
          200: '#e2e8f0', // Crisp primary text
          100: '#f1f5f9', // Bright text
          50: '#f8fafc',  // Pure bright heading text
        },
      },
      boxShadow: {
        'dark-card': '0 4px 20px -2px rgba(2, 6, 23, 0.6), 0 0 0 1px rgba(51, 65, 85, 0.5)',
        'dark-card-hover': '0 12px 28px -4px rgba(2, 6, 23, 0.8), 0 0 0 1px rgba(245, 158, 11, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
