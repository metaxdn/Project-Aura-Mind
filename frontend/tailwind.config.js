/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#182420',
          soft: '#4A5850',
        },
        paper: {
          DEFAULT: '#EEF2EE',
          deep: '#E2E8E1',
        },
        surface: '#FFFFFF',
        line: '#D6DED5',
        pine: {
          DEFAULT: '#21594A',
          deep: '#163D33',
          tint: '#E4EFE9',
        },
        amber: {
          DEFAULT: '#E3B341',
        },
        coral: {
          DEFAULT: '#D9534F',
        },
        sage: {
          DEFAULT: '#4C9A78',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '22px',
        'xl': '28px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(24,36,32,0.04), 0 12px 28px -8px rgba(24,36,32,0.10)',
        'lift': '0 2px 4px rgba(24,36,32,0.06), 0 20px 40px -12px rgba(22,61,51,0.20)',
        'glow': '0 0 25px rgba(33,89,74,0.15)',
      }
    },
  },
  plugins: [],
}
