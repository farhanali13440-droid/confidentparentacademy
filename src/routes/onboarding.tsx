import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import { submitOnboarding } from "@/lib/onboarding.functions";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

type Search = { lead?: string };

export const Route = createFileRoute("/onboarding")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    lead: typeof s.lead === "string" ? s.lead : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Step 2 of 2 — Personalise Your Workshop" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: OnboardingPage,
});

const GOALS = [
  "Understand why my child behaves the way they do",
  "Reduce shouting and daily struggles",
  "Handle tantrums and meltdowns calmly",
  "Manage screen time and routines",
  "Improve communication with my child",
  "Build a stronger, more trusting relationship",
  "Feel less guilty and more confident as a parent",
];

const TRIED = [
  "Reading parenting books or blogs",
  "Watching parenting videos or reels",
  "Rewards and punishments",
  "Being stricter or setting more rules",
  "Being more lenient",
  "Asking family or friends for advice",
  "Nothing structured yet",
  "Other",
];

const DECISION = [
  "My child's behaviour feels overwhelming right now",
  "I want to understand the psychology behind behaviour",
  "I want practical tools instead of random tips",
  "The topic felt relevant to my family",
  "The price made it easy to try",
  "I want to learn before problems get worse",
  "Other",
];

const HELP = [
  "Handling tantrums and meltdowns",
  "Managing screen time and routines",
  "Improving sleep and daily habits",
  "Communication and connection",
  "Sibling conflict",
  "A complete calm-parenting system",
  "I want to apply it myself first",
];

const DFY_OPTIONS = [
  "Yes, I would like details about 1-on-1 parent counselling",
  "Maybe later, but I am interested",
  "No, I want to apply the workshop myself first",
];

function CheckboxGroup({
  name,
  options,
  values,
  onChange,
}: {
  name: string;
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label
            key={opt}
            className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
              checked
                ? "border-primary bg-primary/5"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              className="mt-1 size-4 accent-primary shrink-0"
              checked={checked}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...values, opt]
                    : values.filter((v) => v !== opt),
                )
              }
            />
            <span className="text-sm text-slate-800 leading-snug">{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function OnboardingPage() {
  const navigate = useNavigate();
  const { lead } = Route.useSearch();

  const [leadId, setLeadId] = useState<string | null>(null);
  useEffect(() => {
    let id = lead ?? null;
          if (!id && typeof window !== "undefined") {
      try {
        id = localStorage.getItem("cgm_last_lead");
      } catch {}
    }
    setLeadId(id);
  }, [lead]);

  const [primaryGoals, setPrimaryGoals] = useState<string[]>([]);
  const [tried, setTried] = useState<string[]>([]);
  const [frustration, setFrustration] = useState("");
  const [decision, setDecision] = useState<string[]>([]);
  const [skepticism, setSkepticism] = useState("");
  const [helpAreas, setHelpAreas] = useState<string[]>([]);
  const [dfy, setDfy] = useState("");
  const [other, setOther] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => skepticism.trim().length > 0 && dfy.length > 0 && !submitting,
    [skepticism, dfy, submitting],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!leadId) {
      setError(
        "We could not find your order. Please return to checkout or contact support on WhatsApp.",
      );
      return;
    }
    if (!skepticism.trim()) {
      setError("Please share what you are still unsure about.");
      return;
    }
    if (!dfy) {
      setError("Please choose an option for done-for-you services.");
      return;
    }
    setSubmitting(true);
    try {
      await submitOnboarding({
        data: {
          leadId,
          primary_goals: primaryGoals,
          tried_before: tried,
          biggest_frustration: frustration.trim(),
          decision_reasons: decision,
          skepticism: skepticism.trim(),
          implementation_help: helpAreas,
          done_for_you_interest: dfy,
          other_help: other.trim() || undefined,
        },
      });
      navigate({ to: "/thank-you", replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Could not submit. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="bg-secondary flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Step 2 of 2</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="size-3.5" /> Payment received
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full w-full bg-primary" />
            </div>
            <p className="mt-2 text-sm text-slate-700">
              Help us personalise your learning experience.
            </p>
          </div>

          <div className="bg-card rounded-2xl border shadow-sm p-5 md:p-8">
            <h1 className="text-xl md:text-2xl font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Before the Workshop, Help Us Personalise Your Experience
            </h1>
            <p className="mt-3 text-sm md:text-base text-muted-foreground">
              Your answers help Miss Samra focus on the most relevant strategies
              and examples for your family.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-7">
              <Field
                num={1}
                label="What is your biggest goal from this parenting workshop right now?"
              >
                <CheckboxGroup
                  name="goals"
                  options={GOALS}
                  values={primaryGoals}
                  onChange={setPrimaryGoals}
                />
              </Field>

              <Field
                num={2}
                label="What have you already tried to improve your child's behaviour?"
              >
                <CheckboxGroup
                  name="tried"
                  options={TRIED}
                  values={tried}
                  onChange={setTried}
                />
              </Field>

              <Field
                num={3}
                label="What has frustrated you the most about parenting lately?"
              >
                <textarea
                  value={frustration}
                  onChange={(e) => setFrustration(e.target.value)}
                  rows={3}
                  maxLength={2000}
                  placeholder="Share in a few sentences…"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </Field>

              <Field
                num={4}
                label="What made you decide to join this workshop today?"
              >
                <CheckboxGroup
                  name="decision"
                  options={DECISION}
                  values={decision}
                  onChange={setDecision}
                />
              </Field>

              <Field
                num={5}
                required
                label="Even after joining, what are you still skeptical or unsure about?"
              >
                <textarea
                  value={skepticism}
                  onChange={(e) => setSkepticism(e.target.value)}
                  rows={3}
                  maxLength={2000}
                  required
                  placeholder="Be honest — this helps Miss Samra address it during the workshop."
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </Field>

              <Field
                num={6}
                label="Which area would you most want help with after the workshop?"
              >
                <CheckboxGroup
                  name="help"
                  options={HELP}
                  values={helpAreas}
                  onChange={setHelpAreas}
                />
              </Field>

              <Field
                num={7}
                required
                label="Would you be interested in personalised 1-on-1 parent counselling with Miss Samra — based on your child's age, behaviour, and your family situation?"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  This can include: a personalised behaviour plan, guidance for
                  specific challenges (tantrums, sleep, screens, siblings),
                  developmental support, and ongoing parent coaching tailored to
                  your family.
                </p>
                <div className="grid gap-2">
                  {DFY_OPTIONS.map((opt) => {
                    const checked = dfy === opt;
                    return (
                      <label
                        key={opt}
                        className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
                          checked
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dfy"
                          className="mt-1 size-4 accent-primary shrink-0"
                          checked={checked}
                          onChange={() => setDfy(opt)}
                          required
                        />
                        <span className="text-sm text-slate-800 leading-snug">
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field
                num={8}
                label="What other guide, tool, or support would help you as a parent?"
                optional
              >
                <textarea
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  rows={2}
                  maxLength={2000}
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </Field>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-cta w-full justify-center inline-flex items-center gap-2 px-6 py-4 text-base md:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <span>Submit &amp; Confirm My Seat</span>
                    <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Your details are private and only used to personalise your
                experience.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  num,
  label,
  children,
  required,
  optional,
}: {
  num: number;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-start gap-2">
        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
          {num}
        </span>
        <label className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
          {label}
          {required && <span className="ml-1 text-red-600">*</span>}
          {optional && (
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              (optional)
            </span>
          )}
        </label>
      </div>
      {children}
    </div>
  );
}
