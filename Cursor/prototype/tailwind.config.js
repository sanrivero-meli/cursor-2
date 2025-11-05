/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Material 3 Primary Colors
        primary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
          DEFAULT: '#4caf50',
          dark: '#388e3c',
          container: '#c8e6c9',
        },
        // Material 3 Secondary Colors
        secondary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        // Material 3 Surface Colors (Dark Theme)
        surface: {
          DEFAULT: '#1c1b1f',
          variant: '#49454f',
          container: '#211f26',
          'container-high': '#2b2930',
          'container-highest': '#36343b',
        },
        // Material 3 On Colors (Text on surfaces)
        'on-surface': {
          DEFAULT: '#e6e1e5',
          variant: '#cac4d0',
        },
        'on-primary': {
          DEFAULT: '#000000',
        },
        'on-primary-container': {
          DEFAULT: '#002106',
        },
        // Material 3 Outline Colors
        outline: {
          DEFAULT: '#938f99',
          variant: '#49454f',
        },
        // Material 3 Error Colors
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontSize: {
        // Material 3 Typography Scale
        'display-large': ['3.5625rem', { lineHeight: '4rem', letterSpacing: '-0.015625rem' }],
        'display-medium': ['2.8125rem', { lineHeight: '3.25rem' }],
        'display-small': ['2.25rem', { lineHeight: '2.75rem' }],
        'headline-large': ['2rem', { lineHeight: '2.5rem' }],
        'headline-medium': ['1.75rem', { lineHeight: '2.25rem' }],
        'headline-small': ['1.5rem', { lineHeight: '2rem' }],
        'title-large': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        'title-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500', letterSpacing: '0.009375rem' }],
        'title-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '0.00625rem' }],
        'label-large': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '0.00625rem' }],
        'label-medium': ['0.75rem', { lineHeight: '1rem', fontWeight: '500', letterSpacing: '0.03125rem' }],
        'label-small': ['0.6875rem', { lineHeight: '1rem', fontWeight: '500', letterSpacing: '0.03125rem' }],
        'body-large': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.03125rem' }],
        'body-medium': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.015625rem' }],
        'body-small': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025rem' }],
      },
      boxShadow: {
        // Material 3 Elevation Shadows
        'elevation-0': 'none',
        'elevation-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'elevation-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'elevation-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}

