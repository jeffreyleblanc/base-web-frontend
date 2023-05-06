
// const mui_colors = require('./config-helpers/mui-colors');
import mui_colors from './config-helpers/mui-colors'

export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: mui_colors,
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class'
        }),
    ],
}
