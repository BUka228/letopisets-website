// tailwind.config.ts
import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate" // <--- Импорт вместо require
import tailwindcssTypography from "@tailwindcss/typography" 

const config = {
  darkMode: "class", // Используем класс 'dark' для темной темы
  content: [
    './pages/**/*.{ts,tsx}', // На всякий случай, если есть старые страницы
    './components/**/*.{ts,tsx}', // Папка компонентов shadcn/ui
    './app/**/*.{ts,tsx}', // Папка App Router
    './src/**/*.{ts,tsx}', // Включаем всю папку src
	],
  prefix: "", // Убираем префикс tw- (если не нужен)
  theme: {
    container: {
      center: true,
      padding: "1rem", // Уменьшаем паддинг по умолчанию
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
       // Здесь можно расширять стандартную тему Tailwind,
       // но основные цвета и радиусы у вас задаются через CSS переменные
      colors: {
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
       backgroundImage: { // Пример добавления своего значения (если нужно)
         'gradient-dark': 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
       }
    },
  },
  plugins: [
    tailwindcssAnimate,      
    tailwindcssTypography     
  ],
} satisfies Config

export default config