/**
 * Amala Okafor — Design Tokens
 * 
 * Wine-forward palette, cream/charcoal for light/dark modes.
 * Playfair Display (headings), Source Sans 3 (body), JetBrains Mono (code).
 */

export const colors = {
  // ── Wine Palette ──
  wine: {
    50:  '#FDF2F4',
    100: '#F9E2E6',
    200: '#F3C5CD',
    300: '#EAA0AD',
    400: '#DC7186',
    500: '#C4506A',
    600: '#A83D55',
    700: '#8C3244',
    800: '#722F37',   // Primary wine
    900: '#5A1F2A',
    950: '#3D1119',
  },

  // ── Cream (Light Mode) ──
  cream: {
    50:  '#FFFDFB',
    100: '#FDF6EC',
    200: '#FAECDA',
    300: '#F5DEC3',
    400: '#EDCFAB',
    500: '#E0BC91',
  },

  // ── Charcoal (Dark Mode) ──
  charcoal: {
    50:  '#E8E6EB',
    100: '#C5C1CC',
    200: '#9E98A9',
    300: '#6E6680',
    400: '#4A4160',
    500: '#2E2545',
    600: '#251E3A',
    700: '#1D1730',
    800: '#1A1A2E',   // Primary dark bg
    900: '#121220',
    950: '#0A0A15',
  },

  // ── Ink (Text) ──
  ink: {
    primary:   '#2D2024',
    secondary: '#5C4A52',
    tertiary:  '#8A7680',
    faint:     '#B8A8AE',
    ghost:     '#D9CDD2',
  },

  // ── Ink Dark Mode ──
  inkDark: {
    primary:   '#F0E8EB',
    secondary: '#C8BCC1',
    tertiary:  '#9A8F94',
    faint:     '#6B6166',
    ghost:     '#3D353A',
  },

  // ── Accents ──
  sage:    '#7A9E7E',
  plum:    '#8B5E83',
  gold:    '#C49A6C',
  sky:     '#7BA3C4',
  coral:   '#D4846A',
} as const;

export const typography = {
  fontFamily: {
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    sans:  "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono:  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  fontSize: {
    xs:   '0.75rem',    // 12px
    sm:   '0.875rem',   // 14px
    base: '1rem',       // 16px
    lg:   '1.125rem',   // 18px
    xl:   '1.25rem',    // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  fontWeight: {
    normal:   '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
  lineHeight: {
    tight:   '1.25',
    snug:    '1.375',
    normal:  '1.5',
    relaxed: '1.625',
    loose:   '1.75',
  },
  letterSpacing: {
    tight:   '-0.025em',
    normal:  '0',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const;

export const spacing = {
  px: '1px',
  0.5: '0.125rem',
  1:   '0.25rem',
  1.5: '0.375rem',
  2:   '0.5rem',
  3:   '0.75rem',
  4:   '1rem',
  5:   '1.25rem',
  6:   '1.5rem',
  8:   '2rem',
  10:  '2.5rem',
  12:  '3rem',
  16:  '4rem',
  20:  '5rem',
  24:  '6rem',
} as const;

export const radius = {
  none: '0',
  sm:   '0.25rem',
  md:   '0.5rem',
  lg:   '0.75rem',
  xl:   '1rem',
  full: '9999px',
} as const;

export const shadows = {
  sm:   '0 1px 2px rgba(45, 32, 36, 0.05)',
  md:   '0 2px 8px rgba(45, 32, 36, 0.08)',
  lg:   '0 4px 16px rgba(45, 32, 36, 0.10)',
  xl:   '0 8px 32px rgba(45, 32, 36, 0.12)',
  wine: '0 4px 14px rgba(114, 47, 55, 0.20)',
} as const;

export const transitions = {
  fast:   '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow:   '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const breakpoints = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
} as const;
