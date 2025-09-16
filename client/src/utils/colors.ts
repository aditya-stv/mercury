/**
 * Utility functions for resolving CSS custom properties to actual color values
 * Needed because Recharts doesn't understand CSS custom properties in hsl() format
 */

/**
 * Get the actual color value from a CSS custom property
 * @param property - The CSS custom property name (e.g., '--bullish')
 * @returns The resolved color value (e.g., 'hsl(142, 76%, 36%)')
 */
export function getCSSCustomProperty(property: string): string {
  if (typeof window === 'undefined') {
    // Return fallback colors for SSR
    const fallbacks: Record<string, string> = {
      '--bullish': 'hsl(142, 76%, 36%)',
      '--bearish': 'hsl(0, 84%, 60%)',
      '--primary': 'hsl(230, 75%, 56%)',
      '--foreground': 'hsl(0, 0%, 98%)',
      '--muted-foreground': 'hsl(230, 5%, 64%)',
      '--border': 'hsl(230, 10%, 20%)',
      '--card': 'hsl(230, 15%, 12%)',
    };
    return fallbacks[property] || 'hsl(0, 0%, 50%)';
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
  
  return value || 'hsl(0, 0%, 50%)'; // Fallback to gray if not found
}

/**
 * Theme colors object with resolved values
 */
export const themeColors = {
  get bullish() {
    return getCSSCustomProperty('--bullish');
  },
  get bearish() {
    return getCSSCustomProperty('--bearish');
  },
  get primary() {
    return getCSSCustomProperty('--primary');
  },
  get foreground() {
    return getCSSCustomProperty('--foreground');
  },
  get mutedForeground() {
    return getCSSCustomProperty('--muted-foreground');
  },
  get border() {
    return getCSSCustomProperty('--border');
  },
  get card() {
    return getCSSCustomProperty('--card');
  },
};