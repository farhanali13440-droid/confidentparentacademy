// Single source of truth for the current Confident Parent Academy cohort.
// Client- and server-safe (no server-only imports). The sales page countdown
// and the deadline reminder emails both read from here, so updating the date
// for a future cohort only requires changing COHORT_START_ISO below.

// 24th August 2026 (Sunday), 3:00 PM Pakistan Standard Time (UTC+5)
// => 2026-08-24T15:00:00+05:00 => 2026-08-24T10:00:00Z
export const COHORT_START_ISO = '2026-08-24T10:00:00Z'
export const COHORT_TIMEZONE = 'Asia/Karachi'

/** Milliseconds since epoch for the live session start. */
export function cohortStartMs(): number {
  return new Date(COHORT_START_ISO).getTime()
}

/** Deadline reminder send times (absolute), derived from the cohort start. */
export const DEADLINE_OFFSETS_MS: Record<5 | 6, number> = {
  5: 4 * 60 * 60 * 1000, // Email: 4 hours before start
  6: 1 * 60 * 60 * 1000, // Email: 1 hour before start
}

/** ISO send time for a given deadline sequence number. */
export function deadlineSendAtIso(seq: 5 | 6): string {
  return new Date(cohortStartMs() - DEADLINE_OFFSETS_MS[seq]).toISOString()
}

/** Human-readable cohort date in Pakistan time, e.g. "13 July 2026". */
export function cohortDateLabel(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: COHORT_TIMEZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(COHORT_START_ISO))
}

/** Human-readable cohort start time in Pakistan time, e.g. "3:00 PM PKT". */
export function cohortTimeLabel(): string {
  const t = new Intl.DateTimeFormat('en-US', {
    timeZone: COHORT_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(COHORT_START_ISO))
  return `${t} PKT`
}

/** True once the live session start time has passed. */
export function cohortHasStarted(now: number = Date.now()): boolean {
  return now >= cohortStartMs()
}