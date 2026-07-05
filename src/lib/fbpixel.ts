// Meta (Facebook) Pixel helper for Confident Parent Academy.
export const FB_PIXEL_ID = "1648842249512123";

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

/** Temporary dev-only debug logger for Meta Pixel events (no sensitive data). */
export function debugMetaEvent(message: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!import.meta.env.DEV) return;
  if (data) console.log(`[META EVENT] ${message}`, data);
  else console.log(`[META EVENT] ${message}`);
}
