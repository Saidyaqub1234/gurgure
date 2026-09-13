import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    blue: '#2F356E',
                    green: '#5A9B45',
                    purple: '#43355A',
                    'light-blue': '#4453A6',
                    'light-green': '#7EBE63',
                },
                neutral: {
                    50: '#F5F7FA',
                    100: '#E5E7EB',
                    200: '#D1D5DB',
                    300: '#9CA3AF',
                    400: '#6B7280',
                    500: '#374151',
                    600: '#111827',
                },
            },
            borderRadius: {
                brand: '20px',
            },
            boxShadow: {
                brand: '0 14px 40px rgba(47,53,110,0.15)',
                card: '0 8px 24px rgba(0,0,0,0.08)',
            },
        },
    },

    plugins: [forms],
};
