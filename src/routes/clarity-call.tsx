import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import {
  CheckCircle2,
  Heart,
  Search,
  Sparkles,
  Compass,
  Calendar,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import expertHero from "@/assets/clarity-expert-hero.png.asset.json";
import behaviorTree from "@/assets/clarity-behavior-tree.png.asset.json";
import fourStep from "@/assets/clarity-4-step.png.asset.json";
import expertConsult from "@/assets/clarity-expert-consult.png.asset.json";

const BOOKING_URL = "https://calendly.com/samrariaz600/30-min-parenting-clarity-call";

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
          "Your workshop registration is confirmed. Optionally book a free 30-minute Parenting Clarity Call to get personalized guidance for your child's unique situation.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ClarityCallPage,
});

function ClarityCallPage() {
  const navigate = useNavigate();
  const { lead } = Route.useSearch();

  const skipHref = lead ? `/thank-you?lead=${encodeURIComponent(lead)}` : "/thank-you";

  const skipToAccess = () => {
    if (lead && typeof window !== "undefined") {
      window.location.href = skipHref;
      return;
    }
    navigate({ to: "/thank-you", replace: true });
  };

  const openBooking = () => {
    if (typeof window !== "undefined") {
      window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  const whoFor = [
    { icon: MessageCircle, text: "You feel confused about handling your child's behavior" },
    { icon: Search, text: "Your current approach is not creating improvement" },
    { icon: Heart, text: "You want to understand the reason behind your child's actions" },
    { icon: Sparkles, text: "You want practical guidance instead of random advice" },
    { icon: Compass, text: "You want a clearer path forward" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <main className="flex-1 blush-bg">
        <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 space-y-8 md:space-y-12">
          {/* SECTION 1 — Confirmation banner */}
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
                personalized guidance for your parenting situation, you can also book a
                free 30-minute Parenting Clarity Call below.
              </p>
            </div>
          </section>

          {/* SECTION 2 — Hero (two-column) */}
          <section className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--warm-brown)]">
                Optional · Free · 30 Minutes
              </p>
              <h1
                className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Need Help With Your Specific Parenting Challenge?
              </h1>
              <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
                The Confident Parent Academy workshop gives you powerful parenting
                frameworks. But every child and family situation is different.
              </p>
              <p className="mt-3 text-muted-foreground md:text-lg leading-relaxed">
                If you want personalized clarity about your child's behavior, your
                challenges and the next steps for your family, you can book a free
                30-minute Parenting Clarity Call.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={openBooking}
                  className="btn-cta w-full md:w-auto md:inline-flex px-6 py-4 text-base md:text-lg"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <span>Yes, I Want My Parenting Clarity Call</span>
                    <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
                  </span>
                </button>
                <div>
                  <button
                    type="button"
                    onClick={skipToAccess}
                    className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground"
                  >
                    No Thanks, Continue To Workshop Access
                  </button>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="rounded-[22px] overflow-hidden shadow-xl ring-1 ring-[var(--border)] bg-card">
                <img
                  src={expertHero.url}
                  alt="Personalized Parenting Clarity Session with a warm parenting expert"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </section>

          {/* SECTION 3 — Root cause */}
          <section className="bg-card rounded-[22px] border shadow-sm p-6 md:p-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-2xl md:text-3xl font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Every Child Is Different. Every Parenting Challenge Has A Root Cause.
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
                Many parents focus only on what they see on the surface. During this
                clarity call, we help you understand what may be behind the behavior
                and what practical steps can create improvement.
              </p>
            </div>

            <div className="mt-8 rounded-2xl overflow-hidden">
              <img
                src={behaviorTree.url}
                alt="Behavior is communication — understanding the roots behind your child's behavior"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </section>

          {/* SECTION 4 — What happens on the call */}
          <section className="text-center">
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-display)" }}
            >
              In This 30-Minute Parenting Clarity Call, We Will Discuss:
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg max-w-2xl mx-auto">
              A focused conversation to understand your challenges, identify possible
              causes and create clearer next steps.
            </p>

            <div className="mt-6 rounded-[22px] overflow-hidden shadow-md ring-1 ring-[var(--border)] bg-card">
              <img
                src={fourStep.url}
                alt="The 4-step Parenting Clarity Call journey"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </section>

          {/* SECTION 5 — Who this call is for */}
          <section>
            <h2
              className="text-2xl md:text-3xl font-semibold leading-snug text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              This Call May Help You If:
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whoFor.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="rounded-2xl border bg-[var(--muted)] shadow-sm p-5 flex gap-3 items-start"
                >
                  <div className="shrink-0 size-10 rounded-full bg-[var(--blush)]/25 grid place-items-center">
                    <Icon className="size-5 text-[var(--warm-brown-deep)]" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6 — Expert trust */}
          <section className="bg-card rounded-[22px] border shadow-sm p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div className="rounded-2xl overflow-hidden ring-1 ring-[var(--border)]">
                <img
                  src={expertConsult.url}
                  alt="A parent in a warm consultation with a parenting expert"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div>
                <h2
                  className="text-2xl md:text-3xl font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your Personalized Parenting Clarity Session
                </h2>
                <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
                  This is a supportive conversation where we understand your situation,
                  explore possible causes behind challenges and discuss practical ways
                  forward.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Warm and supportive conversation",
                    "Personalized parenting guidance",
                    "Practical next steps",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 7 — Final CTA */}
          <section className="bg-card rounded-[22px] border shadow-md p-6 md:p-10 text-center">
            <div className="mx-auto size-12 rounded-full bg-[var(--blush)]/25 grid place-items-center">
              <Calendar className="size-6 text-[var(--warm-brown-deep)]" />
            </div>
            <h2
              className="mt-3 text-2xl md:text-3xl font-semibold leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Book Your Free 30-Minute Parenting Clarity Call
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg max-w-xl mx-auto">
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

            <div className="mt-5">
              <button
                type="button"
                onClick={skipToAccess}
                className="underline underline-offset-4 text-sm text-muted-foreground hover:text-foreground"
              >
                No Thanks, Continue To Workshop Access
              </button>
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground">
            Prefer to go straight to your workshop access?{" "}
            <a href={skipHref} className="underline">
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