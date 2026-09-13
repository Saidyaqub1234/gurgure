/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#1e3a5f',
          'blue-light': '#2d5a8e',
          green: '#2d8a4e',
          'green-light': '#3db865',
          purple: '#3b2a5c',
          'purple-light': '#5c3d8a',
          dark: '#0f1a2e',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 40%, #2d8a4e 100%)',
        'gradient-brand-reverse': 'linear-gradient(135deg, #2d8a4e 0%, #2d5a8e 60%, #1e3a5f 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 50%, rgba(45, 90, 142, 0.15) 0%, transparent 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(30, 58, 95, 0.05) 0%, rgba(45, 138, 78, 0.05) 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      boxShadow: {
        'brand-sm': '0 2px 8px rgba(30, 58, 95, 0.08)',
        'brand': '0 8px 32px rgba(30, 58, 95, 0.12)',
        'brand-lg': '0 16px 48px rgba(30, 58, 95, 0.15)',
        'brand-glow': '0 0 20px rgba(45, 138, 78, 0.3)',
        'card-hover': '0 20px 60px rgba(30, 58, 95, 0.15)',
      },
    },
  },
  plugins: [],
};
