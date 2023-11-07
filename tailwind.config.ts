import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        smart: ["'Genos', 'sans-serif'"],
        fancy: ["'Playfair Display', serif"]
      },
    },
  },
  plugins: [],
} satisfies Config;
