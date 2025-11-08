import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(222 47% 11%)',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'hsl(222 47% 11%)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': 'hsl(0 0% 100%)',
  			'primary-hover': 'hsl(217 91% 55%)',
  			'primary-light': 'hsl(217 91% 95%)',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': 'hsl(220 9% 46%)',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': 'hsl(220 9% 46%)',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': 'hsl(0 0% 100%)',
  			success: 'hsl(142 76% 36%)',
  			'success-foreground': 'hsl(0 0% 100%)',
  			'success-light': 'hsl(142 76% 95%)',
  			warning: 'hsl(45 93% 47%)',
  			'warning-foreground': 'hsl(0 0% 100%)',
  			'warning-light': 'hsl(45 93% 95%)',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': 'hsl(0 0% 100%)',
  			'destructive-light': 'hsl(0 84% 95%)',
  			info: 'hsl(199 89% 48%)',
  			'info-foreground': 'hsl(0 0% 100%)',
  			'info-light': 'hsl(199 89% 95%)',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'sidebar-background': 'hsl(222 47% 11%)',
  			'sidebar-foreground': 'hsl(210 40% 98%)',
  			'sidebar-primary': 'hsl(217 91% 60%)',
  			'sidebar-primary-foreground': 'hsl(0 0% 100%)',
  			'sidebar-accent': 'hsl(217 33% 17%)',
  			'sidebar-accent-foreground': 'hsl(210 40% 98%)',
  			'sidebar-border': 'hsl(217 33% 17%)',
  			'sidebar-ring': 'hsl(217 91% 60%)',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			DEFAULT: '0.375rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ['class', 'class'],
  plugins: [tailwindcssAnimate]
};

export default config;
