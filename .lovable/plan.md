# Rebrand: Clinic Growth Masterclass → Confident Parent Academy

We keep every backend feature (checkout, payment-screenshot upload, lead saving, thank-you flow, countdown, Meta Pixel, purchase events, DB tables, email + WhatsApp automations, routing, validation). We only change presentation: branding, colors, type, images, copy, offer, pricing, order bumps, testimonials, SEO.

## What stays untouched (backend)
- `src/lib/*.functions.ts`, `*.server.ts` (leads, oto, payment-screenshot, onboarding, thank-you, abandoned-checkout, registration-email)
- Supabase clients, middleware, DB tables, column names, lead IDs, bump IDs (`prompts`, etc.)
- `fbpixel.ts` event calls and Pixel ID; all tracking wiring
- Email queue/send routes; the *content* of email templates is rewritten, the sending infra is not

Note: DB columns like `specialty`, table names like `clinic_growth_leads`, and bump `id`s keep their internal names to avoid breaking logic. Only user-facing **labels** change (e.g. the "Medical Speciality" field becomes an optional parenting-context field or is repurposed).

## Design system (`src/styles.css`)
New calm/premium palette via tokens:
- Primary `#414b3b` (deep sage-olive), Secondary `#936e4c` (warm tan), Accent `#c4d7b2` (soft green), Soft accent `#c69b8a` (dusty rose), Background `#ffcdce` used softly (page bg stays airy off-white/cream; pink as accent wash, not full background).
- Typography: warm premium pair (e.g. Fraunces / Cormorant display + Nunito Sans body) loaded via `<link>` in `__root.tsx`.
- Rounded cards, soft shadows, rounded full-width buttons, generous whitespace. Replace the aggressive orange/navy hero gradient and uppercase CTAs with a soft, warm treatment.

## Brand assets (generated — none were uploaded)
- Logo (wordmark + soft mark) for topbar + favicon
- Hero image: warm South-Asian / Pakistani family (mother, father, child), pastel tones
- Curriculum / benefit / bonus card imagery and gentle icons (lucide)
- Product/offer mockup and social OG image
If you have the real logo or family photos, share them and I'll swap the generated ones.

## Page-by-page copy + content

**Home (`index.tsx`)**
- Topbar/announcement: Confident Parent Academy, 499 PKR, 11 July, Google Meet
- Hero: new headline/subheadline, CTAs "Reserve My Seat" / "View Webinar Details", badges (499 PKR · 11 July · Google Meet · 1.5 Hours · Live Q&A · Recording Included)
- New sections: Problem ("Do Any Of These Sound Familiar?"), Solution (why behaviour happens), Benefits cards, Curriculum (10 modules), About Samra, Story (three autistic cousins), Webinar Includes, Pricing (499 now / 2000 later + savings), Bonuses (3), FAQ (attendance/fathers/both parents/recording/duration/platform), Testimonials (CMS-friendly placeholders)
- Lead form kept as-is functionally; labels reworded for parents

**Order/checkout (`order.tsx`)**
- Title, brand, pricing → 499 PKR; payment details → HBL, Title "Samra", Acct 16977901123599
- Order bump 1 → Parenting Behaviour Toolkit (199 PKR); Order bump 2 → Webinar Recording + PDF Bundle (299 PKR). Bump internal IDs unchanged.
- Screenshot upload untouched

**OTO (`oto.tsx`)** — rebranded copy consistent with parenting offer, logic/gate unchanged

**Thank-you (`thank-you.tsx`)** — thank parents, Google Meet join instructions, WhatsApp button, Add to Calendar, reminder, bonus download placeholder

**Onboarding (`onboarding.tsx`)** — reword questions to parenting context; keep submit logic/fields

**Footer / Topbar** — brand, contact, socials, copyright

**Email templates** (`registration-confirmation`, `abandoned-checkout`) — rewrite copy to parenting brand; keep template registry keys and sending logic

## SEO (`__root.tsx` + route heads)
New title/description/OG/Twitter, favicon, updated JSON-LD if present. Replace old clinic OG image with new brand OG image.

## Mobile & performance
Preserve mobile-first layout, animations, loading states; verify full-width buttons, readable type, no overflow after restyle.

## Verification
Build must pass; spot-check home, order, thank-you on mobile viewport; confirm checkout/lead/tracking calls still fire (no signature changes to functions).

## Technical detail
- Internal identifiers (table/column names, bump ids, template registry keys, function names, Pixel ID) are preserved; only strings rendered to users and email bodies change.
- Fonts loaded via `<link>` in root head (never `@import` remote in styles.css).
- `og:image` only on leaf route heads, not `__root`.
