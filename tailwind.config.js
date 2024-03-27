/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: { center: true },
        extend: {
            colors: {
                'curious-blue': {
                    50: '#f0f9ff',
                    100: '#e0f1fe',
                    200: '#b9e4fe',
                    300: '#7bd1fe',
                    400: '#36b9fa',
                    500: '#0b9ce5',
                    600: '#0080c9',
                    700: '#0166a3',
                    800: '#055687',
                    900: '#0b486f',
                    950: '#072d4a',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@headlessui/tailwindcss'),
    ],
};
