module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      boxShadow: {
        "test": "0 20px 25px -5px rgba(245, 40, 145, 0.2), 0 10px 10px -5px rgba(245, 40, 145, 0.2)",
        "link-active": "0 20px 20px 0px rgba(39, 189, 245, 0.2), 0 10px 10px -5px rgba(39, 189, 245, 0.2)"
      },
      // animation: {
      //   "spin2": {

      //   }
      // }
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      opacity: ['hover'],
      margin: ['first'],
      transform: ['hover'],
      translate: ['hover'],
    },
  },
  plugins: [],
}
