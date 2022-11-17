// craco.config.js
module.exports = {
    style: {
        postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ],
        babel: {
          plugins: process.env.NODE_ENV === "production" ? [["transform-remove-console"]] : [],
          plugins: process.env.NODE_ENV === "development" ? [["transform-remove-console"]] : []
        }
      },
    },
  }
  