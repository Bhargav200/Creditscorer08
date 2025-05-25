
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.7' }
				},
				'pulse-slower': {
					'0%, 100%': { opacity: '0.2' },
					'50%': { opacity: '0.5' }
				},
				'glow': {
					'0%, 100%': { 
						opacity: '0.9',
						textShadow: '0 0 8px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.7)' 
					},
					'50%': { 
						opacity: '1',
						textShadow: '0 0 12px hsl(var(--primary)), 0 0 30px hsl(var(--primary) / 0.9), 0 0 40px hsl(var(--primary) / 0.6)' 
					}
				},
				'glow-financial': {
					'0%, 100%': { 
						opacity: '0.9',
						filter: 'drop-shadow(0 0 8px rgb(34 197 94)) drop-shadow(0 0 20px rgb(34 197 94 / 0.7))'
					},
					'50%': { 
						opacity: '1',
						filter: 'drop-shadow(0 0 12px rgb(34 197 94)) drop-shadow(0 0 30px rgb(34 197 94 / 0.9)) drop-shadow(0 0 40px rgb(34 197 94 / 0.6))'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'25%': { transform: 'translateY(-8px) rotate(2deg)' },
					'50%': { transform: 'translateY(-15px) rotate(0deg)' },
					'75%': { transform: 'translateY(-8px) rotate(-2deg)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-20px) scale(1.05)' }
				},
				'money-fall': {
					'0%': { 
						transform: 'translateY(-100vh) rotate(0deg)',
						opacity: '0.8'
					},
					'50%': {
						opacity: '1',
						transform: 'rotate(180deg)'
					},
					'100%': { 
						transform: 'translateY(100vh) rotate(360deg)',
						opacity: '0.3'
					}
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-out-left': {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(-100%)', opacity: '0' }
				},
				'financial-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)'
					},
					'50%': { 
						transform: 'scale(1.05)',
						boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
				'pulse-slower': 'pulse-slower 8s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'glow-financial': 'glow-financial 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float-slow 10s ease-in-out infinite',
				'money-fall': 'money-fall 15s linear infinite',
				'rotate-slow': 'rotate-slow 15s linear infinite',
				'rotate-reverse': 'rotate-slow 20s linear infinite reverse',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'slide-out-left': 'slide-out-left 0.5s ease-out',
				'financial-pulse': 'financial-pulse 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
