/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                'primary-dark': 'var(--primary-600)',
                'primary-light': 'var(--primary-400)',
                surface: {
                    0: 'var(--surface-0)',
                    50: 'var(--surface-50)',
                    100: 'var(--surface-100)',
                    200: 'var(--surface-200)',
                    300: 'var(--surface-300)',
                    400: 'var(--surface-400)',
                    500: 'var(--surface-500)',
                    600: 'var(--surface-600)',
                    700: 'var(--surface-700)',
                    800: 'var(--surface-800)',
                    900: 'var(--surface-900)',
                }
            },
            fontFamily: {
                sans: ['var(--font-family)', 'sans-serif'],
            }
        },
    },
    plugins: [],
    // Importante: no purgar clases de PrimeNG
    safelist: [
        {
            pattern: /^p-/,
        }
    ]
}
