// Meta (Facebook) Pixel helper for Confident Parent Academy.
export const FB_PIXEL_ID = "1851147519177135";

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Track a standard Meta Pixel event (browser-side only). */
export function trackPixel(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}
