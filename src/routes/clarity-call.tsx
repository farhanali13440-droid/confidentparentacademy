import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import {
  CheckCircle2,
  Heart,
  Search,
  AlertCircle,
  Sparkles,
  Compass,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Replace this with the real booking calendar URL when available.
const BOOKING_URL = "https://calendly.com/confidentparentacademy/clarity-call";

type ClarityCallSearch = { lead?: string };

export const Route = createFileRoute("/clarity-call")({
  validateSearch: (search: Record<string, unknown>): ClarityCallSearch => ({
    lead: typeof search.lead === "string" ? search.lead : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Optional 30-Minute Parenting Clarity Call — Confident Parent Academy" },
      {
        name: "description",
        content:
          "Your workshop registration is confirmed. Optionally book a free 30-minute Parenting Clarity Call to get personalized guidance for your child's specific situation.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ClarityCallPage,
});

function ClarityCallPage() {
  const navigate = useNavigate();
  const { lead } = Route.useSearch();

  const skipToAccess = () => {
    if (lead && typeof window !== "undefined") {
      window.location.href = `/thank-you?lead=${encodeURIComponent(lead)}`;
      return;
    }
    navigate({ to: "/thank-you", replace: true });
  };

  const openBooking = () => {
    if (typeof window !== "undefined") {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  const discussPoints = [
    {
      icon: Heart,
      title: "Your Current Parenting Struggles",
      body: "Understand the biggest challenges you are facing with your child right now.",
    },
    {
      icon: Search,
      title: "The Root Cause Behind Problematic Behavior",
      body: "Identify why certain behaviors may be happening instead of only reacting to them.",
    },
    {
      icon: AlertCircle,
      title: "Common Parenting Mistakes",
      body: "Understand patterns that may unintentionally make everyday situations more difficult.",
    },
    {
      icon: Sparkles,
      title: "Practical Improvement Strategies",
      body: "Learn how you can respond differently and create positive change at home.",
    },
    {
      icon: Compass,
      title: "Your Next Steps",
      body: "Walk away with a clearer path forward based on your family's unique situation.",
    },
  ];

  const whoFor = [
    "You feel confused about handling your child's behavior",
    "Your current parenting approach is not creating improvement",
    "You want to understand the reason behind your child's actions",
    "You want practical guidance instead of random advice",
    "You want a clearer path forward",
  ];

  const flow = [
    "Understanding Challenges",
    "Finding Root Causes",
    "Changing Parenting Approach",
    "Creating Improvement Plan",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <main className="bg-secondary flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8 md:py-12 space-y-6">
          {/* Section 1 — Success confirmation banner */}
          <section className="bg-card rounded-2xl border shadow-sm p-5 md:p-6 flex items-start gap-3">
            <div className="shrink-0 size-10 rounded-full bg-emerald-100 grid place-items-center">
              <CheckCircle2 className="size-6 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <h2
                className="text-lg md:text-xl font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your Confident Parent Academy Registration Is Confirmed
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your workshop access details will be shared with you shortly. If you want
                personalized guidance for your specific parenting situation, you can also
                book a free 30-minute Parenting Clarity Call below.
              </p>
            </div>
          </section>

          {/* Section 2 — Main hero */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 md:p-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Optional · Free · 30 Minutes
            </p>
            <h1
              className="mt-2 text-2xl md:text-4xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Need Help With Your Specific Parenting Challenge?
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              The Confident Parent Academy will teach you powerful parenting frameworks.
              But if you want personalized clarity about your child's behavior, the
              challenges you are facing and the best next steps for your family, you
              can book a free 30-minute Parenting Clarity Call.
            </p>
          </section>

          {/* Section 3 — Problem awareness */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
            <h2
              className="text-xl md:text-2xl font-semibold leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Child Is Different. Every Parenting Challenge Has A Root Cause.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Many parents try different approaches but still struggle because they are
              only addressing the behavior, not understanding the reason behind it.
            </p>
            <p className="mt-2 text-muted-foreground">
              During this call, we help you understand what may be causing the
              challenging behavior and what practical steps can create improvement.
            </p>
          </section>

          {/* Section 4 — What we'll discuss */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
            <h2
              className="text-xl md:text-2xl font-semibold leading-snug text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              In This 30-Minute Parenting Clarity Call, We Will Discuss:
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {discussPoints.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border bg-background p-4 flex gap-3"
                >
                  <div className="shrink-0 size-10 rounded-full bg-primary/10 grid place-items-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base leading-snug">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Flow visual */}
            <div className="mt-6 rounded-xl bg-primary/5 border border-primary/10 p-4 md:p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground text-center">
                How the call flows
              </p>
              <div className="mt-3 flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-2 sm:gap-3">
                {flow.map((step, i) => (
                  <div key={step} className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="rounded-full bg-card border px-4 py-2 text-sm font-medium text-center">
                      {step}
                    </div>
                    {i < flow.length - 1 && (
                      <ArrowRight className="size-4 text-muted-foreground hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5 — Who this call is for */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 md:p-8">
            <h2
              className="text-xl md:text-2xl font-semibold leading-snug"
              style={{ fontFamily: "var(--font-display)" }}
            >
              This Call May Help You If:
            </h2>
            <ul className="mt-4 space-y-3">
              {whoFor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6 — Main CTA */}
          <section className="bg-primary text-primary-foreground rounded-2xl shadow-md p-6 md:p-10 text-center">
            <div className="mx-auto size-12 rounded-full bg-primary-foreground/15 grid place-items-center">
              <Calendar className="size-6" />
            </div>
            <h2
              className="mt-3 text-2xl md:text-3xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book Your Free 30-Minute Parenting Clarity Call
            </h2>
            <p className="mt-3 opacity-90">
              Choose a convenient time and discuss your parenting challenges with our team.
            </p>

            <button
              type="button"
              onClick={openBooking}
              className="btn-cta mt-6 w-full md:w-auto md:inline-flex px-6 py-4 text-base md:text-lg"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span>Yes, I Want My Parenting Clarity Call</span>
                <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
              </span>
            </button>

            {/* Section 7 — Optional skip */}
            <div className="mt-5">
              <button
                type="button"
                onClick={skipToAccess}
                className="underline underline-offset-4 text-sm opacity-90 hover:opacity-100"
              >
                No Thanks, Continue To My Workshop Access
              </button>
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground">
            Prefer to go straight to your workshop access?{" "}
            <a
              href={lead ? `/thank-you?lead=${encodeURIComponent(lead)}` : "/thank-you"}
              className="underline"
            >
              Continue to workshop access
            </a>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}