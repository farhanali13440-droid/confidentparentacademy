import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, User, Lock, ShieldCheck } from "lucide-react";

export function LeadOptinForm() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function detailsValid() {
    const fullName = name.trim();
    const emailNorm = email.trim().toLowerCase();
    const wa = whatsapp.trim();
    const spec = specialty.trim();
    if (fullName.length < 2) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) return false;
    if (wa.replace(/\D/g, "").length < 10) return false;
    if (!spec) return false;
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!detailsValid()) {
      setError("Please complete your name, email, WhatsApp number and child's age(s).");
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSubmitting(true);

    const leadFullName = name.trim();
    const leadEmail = email.trim().toLowerCase();
    const leadWhatsapp = whatsapp.trim();
    const leadSpecialty = specialty.trim();

    // Save the opt-in lead so the abandoned-checkout automation runs.
    try {
      const { upsertLead } = await import("@/lib/leads.functions");
      await upsertLead({
        data: {
          full_name: leadFullName,
          email: leadEmail,
          whatsapp: leadWhatsapp,
          specialty: leadSpecialty,
          lead_status: "Opted In - Checkout Not Completed",
        },
      });
    } catch (err) {
      console.error("Failed to save opt-in lead", err);
    }

    // Fire Lead ONLY on a successful opt-in submission. No value / currency.
    // Guarded so it fires at most once per session.
    try {
      const alreadyFired =
        typeof window !== "undefined" && sessionStorage.getItem("cpa_lead_fired") === "1";
      if (!alreadyFired) {
        if (typeof window !== "undefined") sessionStorage.setItem("cpa_lead_fired", "1");
        const { trackPixel, debugMetaEvent } = await import("@/lib/fbpixel");
        trackPixel("Lead", { content_name: "Workshop Registration" });
        debugMetaEvent("Lead fired - opt-in form submitted");
      }
    } catch (err) {
      console.error("Pixel Lead event failed", err);
    }

    navigate({
      to: "/order",
      search: {
        name: leadFullName,
        email: leadEmail,
        phone: leadWhatsapp,
        specialty: leadSpecialty,
      },
    });
  }

  return (
    <section id="lead-form" ref={sectionRef} className="py-14 md:py-20 bg-secondary scroll-mt-16">
      <div className="mx-auto max-w-xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-4xl font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reserve Your Seat for the Confident Parenting Workshop
          </h2>
          <p className="mt-3 text-muted-foreground">
            Enter your details below to continue to secure checkout.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <section className="bg-card rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <User className="size-4" /> Step 1 — Your Details
            </div>
            <div className="p-5 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name*"
                autoComplete="name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                autoComplete="email"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="tel"
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp Number* (e.g. 03XX XXXXXXX)"
                autoComplete="tel"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Your child's age(s)* (e.g. 3 and 6)"
                maxLength={120}
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />

              {error && <p className="text-sm font-semibold text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-cta w-full mt-2 px-6 py-4 text-base md:text-lg"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <span>{submitting ? "PLEASE WAIT..." : "CONTINUE TO CHECKOUT"}</span>
                  <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
                </span>
                <div className="text-xs font-medium normal-case tracking-normal opacity-95">
                  Reserve your seat and complete payment on the next page.
                </div>
              </button>

              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5" /> 100% Secure &amp; Safe
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" /> Your information is secure and will not be shared.
              </div>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}