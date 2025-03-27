import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms,require('daisyui')],
    daisyui: {
    themes: 'dim', // Specify themes
    base: true, // Enable base styles
    utils: true, // Enable utility classes
    logs: true, // Enable logs
    rtl: false, // Disable right-to-left support
    prefix: "", // Add a prefix to DaisyUI classes
},
};
