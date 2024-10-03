/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "fondo":"#181733",
        "player1":"#34A247",
        "player2":"#203240"
      }
    },
  },
  plugins: [],
}

