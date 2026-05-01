import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Fontes
      fontFamily: {
        sans:  ['var(--font-inter)', 'sans-serif'],
        title: ['var(--font-dm-sans)', 'sans-serif'],
      },

      // Paleta Hub da Fé
      colors: {
        primary: {
          DEFAULT: '#215E9F',
          hover:   '#174472',
          soft:    '#E3F0FF',
        },
        accent: {
          DEFAULT: '#F97316',
          hover:   '#EA580C',
        },
        hubdark: '#0F172A',

        // Tokens shadcn/radix (compatibilidade)
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      boxShadow: {
        card:   '0 10px 30px rgba(15, 23, 42, 0.08)',
        header: '0 4px 12px rgba(15, 23, 42, 0.04)',
        panel:  '0 20px 50px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
