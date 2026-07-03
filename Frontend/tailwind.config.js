/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chestText: '#717982',     //contenido
        chestHeading: '#e6edf3',  //tilulos
        chestBorder: '#20292e',  //color bordes
        chestAccent: '#10b981', // Color de el boton (Default)
        chestIpositive: '#142b2b', // inocos positivos
        chestCard: '#161c22',   // Color de carta
      },

      fontFamily: {
        // Aquí registramos tus dos fuentes elegidas
        sans: ['Inter', 'sans-serif'],        // Tu fuente principal
        mono: ['JetBrains Mono', 'monospace'] // Tu fuente secundaria
      },
    },
  },
  plugins: [],
}

