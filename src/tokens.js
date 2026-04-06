/** Classic NVCC Nighthawks — forest green & gold (pre–light rebrand palette) */
export const COLORS = {
  darkGreen: '#0B4D2C',
  green: '#1A6B47',
  brightGreen: '#2D8659',
  gold: '#D4AF37',
  lightGold: '#E8C547',
  dark: '#0A1F14',
  darker: '#050F0A',

  /** Surfaces / text on dark sections */
  studioWhite: '#0B4D2C',
  softCharcoal: '#ffffff',
  nighthawkGreen: '#1A6B47',
  creatorGold: '#D4AF37',
  blueprintBlue: '#2D8659',
};

export const FONTS = {
  display: '"Orbitron", sans-serif',
  subhead: '"Orbitron", sans-serif',
  body: '"Space Mono", "Courier New", monospace',
};

export const UI = {
  borderLight: `${COLORS.green}40`,
  shadowCard: `0 8px 28px ${COLORS.darker}88`,
  textMuted: 'rgba(255, 255, 255, 0.8)',
  cardGlass: `linear-gradient(135deg, ${COLORS.dark}cc, ${COLORS.darkGreen}cc)`,
};

export const GRADIENTS = {
  sectionHeading: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
  heroTitle: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold}, ${COLORS.brightGreen})`,
  navWordmark: `linear-gradient(135deg, ${COLORS.lightGold}, ${COLORS.gold})`,
};
