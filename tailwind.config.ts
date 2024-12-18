/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";
import { fontFamily } from "tailwindcss/defaultTheme";

module.exports = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'poppins': ["poppins", "sans-serif"],
        'poppins-regular': ["poppins-regular", "sans-serif"],
        'poppins-mid': ["poppins-mid", "sans-serif"],
        "nunito-regular": ["nunito-sans-regular", "sans-serif"],
        "nunito-300": ["nunito-sans-300", "sans-serif"],
      },
      screens: {
        '3xs': "413px",
        xxs: "530px",
        mmd: "1077px",
        xlg: "1281px",
      },
      boxShadow: {
        shinny:
          "0 0 5px rgba(49, 86, 242, 0.1), 0 0 10px rgba(49, 86, 242, 0.2),0 0 15px rgba(49, 86, 242, 0.3)",
      },
      colors: {
        APP_BTN_BLUE: "#1D40A3",
        APP_ASH: "#F7F8FC",
        APP_RGBA_BG: "rgba(0, 0, 0, 0.1)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          from: { opacity: "0", transform: "translateX(-100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDown: "slideDown 1s ease-in-out",
        slideLeft: "slideLeft 0.3s ease-in-out",
        slideRight: "slideRight 0.3s ease-in-out",
        shine: "shine 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
