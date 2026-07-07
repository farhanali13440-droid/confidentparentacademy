import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  CreditCard,
  ImageIcon,
  Lock,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react";
import bumpToolkit from "@/assets/cpa-bump-toolkit.jpg";
import bumpRecording from "@/assets/cpa-bump-recording.jpg";
import { supabase } from "@/integrations/supabase/client";
import { createScreenshotSignedUrl } from "@/lib/payment-screenshot.functions";

const BUMPS = [
  {
    id: "strategy",
    title: "Parenting Behaviour Toolkit",
    price: 199,
    image: bumpToolkit,
    badge: "Most Popular (8/10 Parents Add This)",
    caption: null as string | null,
    bullets: [
      "Behaviour Tracker",
      "Daily Routine Planner",
      "Reward Chart",
      "Printable Worksheets",
      "Parenting Cheat Sheet",
    ],
  },
  {
    id: "prompts",
    title: "Workshop Recording + PDF Bundle",
    price: 299,
    image: bumpRecording,
    badge: "Recommended (7/10 Parents Add This)",
    caption:
      "Can't Attend Live or Want to Rewatch Later? — Optional Add-On (not included in your 499 PKR ticket)",
    bullets: [
      "Full Workshop Recording (lifetime access)",
      "Complete PDF Parenting Guide",
      "Bonus parenting resources",
      "Rewatch and revisit anytime",
      "Perfect if you can't attend live",
    ],
  },
] as const;

const PAYMENT_ACCOUNTS = {
  hbl: {
    label: "Habib Bank Limited (HBL)",
    name: "Farhan Ali Rash",
    account: "11107902348103",
    accountLabel: "Account Number",
  },
  sadapay: {
    label: "SadaPay",
    name: "Iman Tariq",
    account: "03305599608",
    accountLabel: "Account / Mobile Number",
  },
} as const;
type PayMethod = keyof typeof PAYMENT_ACCOUNTS;

const MAIN_PRODUCT = { title: "Confident Parent Academy Workshop", price: 499 };

export function OnePageCheckout() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Parent details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [specialty, setSpecialty] = useState("");

  // Order state
  const [bumps, setBumps] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState<PayMethod>("sadapay");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const items = useMemo(() => {
    const list: { id: string; title: string; price: number; qty: number }[] = [
      { id: "main", title: MAIN_PRODUCT.title, price: MAIN_PRODUCT.price, qty: 1 },
    ];
    for (const b of BUMPS) {
      if (bumps[b.id]) list.push({ id: b.id, title: b.title, price: b.price, qty: 1 });
    }
    return list;
  }, [bumps]);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  // --- Meta Pixel: InitiateCheckout once per session, when checkout enters view ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;
    const fire = () => {
      try {
        if (sessionStorage.getItem("cpa_initiate_checkout_fired") === "1") return;
        sessionStorage.setItem("cpa_initiate_checkout_fired", "1");
        import("@/lib/fbpixel").then(({ trackPixel, debugMetaEvent }) => {
          trackPixel("InitiateCheckout", {
            content_name: "Confident Parent Academy Workshop",
            currency: "PKR",
          });
          debugMetaEvent("InitiateCheckout fired - checkout reached");
        });
      } catch {
        /* ignore */
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fire();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  // --- Meta Pixel: Lead once per session, when details are valid ---
  // Also saves the opt-in lead so the abandoned-checkout automation still runs.
  async function maybeFireLead() {
    if (typeof window === "undefined") return;
    if (!detailsValid()) return;
    try {
      if (sessionStorage.getItem("cpa_lead_fired") === "1") return;
      sessionStorage.setItem("cpa_lead_fired", "1");
    } catch {
      /* ignore */
    }
    try {
      const { upsertLead } = await import("@/lib/leads.functions");
      await upsertLead({
        data: {
          full_name: name.trim(),
          email: email.trim().toLowerCase(),
          whatsapp: whatsapp.trim(),
          specialty: specialty.trim(),
          lead_status: "Opted In - Checkout Not Completed",
        },
      });
    } catch (err) {
      console.error("Failed to save opt-in lead", err);
    }
    try {
      const { trackPixel, debugMetaEvent } = await import("@/lib/fbpixel");
      trackPixel("Lead", { content_name: "Workshop Registration" });
      debugMetaEvent("Lead fired - parent details completed");
    } catch (err) {
      console.error("Pixel Lead event failed", err);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setUploadError(null);
    if (!file) {
      setScreenshot(null);
      setScreenshotPreview(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file (JPG, PNG).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Image must be smaller than 8MB.");
      return;
    }
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
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
    if (!screenshot) {
      setUploadError("Please upload your payment screenshot before submitting.");
      return;
    }
    setSubmitting(true);

    const leadFullName = name.trim();
    const leadEmail = email.trim().toLowerCase();
    const leadWhatsapp = whatsapp.trim();
    const leadSpecialty = specialty.trim() || undefined;

    const selectedBumps = BUMPS.filter((b) => bumps[b.id]).map((b) => ({
      id: b.id,
      title: b.title,
      price: b.price,
    }));

    let screenshotPath: string | null = null;
    try {
      const ext = screenshot.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeEmail = leadEmail.replace(/[^a-z0-9]/gi, "_").slice(0, 40);
      const path = `${Date.now()}-${safeEmail}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("payment-screenshots")
        .upload(path, screenshot, { contentType: screenshot.type, upsert: false });
      if (upErr) throw upErr;
      try {
        const { url } = await createScreenshotSignedUrl({ data: { path } });
        screenshotPath = url;
      } catch (e) {
        console.error("Signed URL creation failed", e);
        screenshotPath = path;
      }
    } catch (err) {
      console.error("Screenshot upload failed", err);
      setUploadError("Failed to upload screenshot. Please try again.");
      setSubmitting(false);
      return;
    }

    let savedLeadId: string | null = null;
    let savedOrder: { strategy_session_order_bump_selected: unknown } | null = null;
    try {
      const { upsertLead } = await import("@/lib/leads.functions");
      const saved = await upsertLead({
        data: {
          full_name: leadFullName,
          email: leadEmail,
          whatsapp: leadWhatsapp,
          specialty: leadSpecialty,
          selected_order_bumps: selectedBumps,
          total_amount: total,
          payment_method: PAYMENT_ACCOUNTS[paymentMethod].label,
          lead_status: "Pending Payment",
          payment_screenshot_url: screenshotPath,
        },
      });
      savedLeadId = saved.id;
      savedOrder = saved;
    } catch (err) {
      console.error("Failed to save lead", err);
    }

    await new Promise((r) => setTimeout(r, 350));

    if (!savedLeadId || !savedOrder) {
      console.warn("[FINAL CHECKOUT] missing saved order — stopping", { savedLeadId });
      setUploadError(
        "Payment proof uploaded, but we couldn't save your order details. Please submit again.",
      );
      setSubmitting(false);
      return;
    }

    try {
      if (typeof window !== "undefined") localStorage.setItem("cgm_last_lead", savedLeadId);
    } catch {}

    // Fire the primary SubmitApplication conversion ONLY after a fully
    // successful submission: details valid, screenshot uploaded, and order
    // saved (savedLeadId + savedOrder present). Value uses the actual final
    // total. Guarded so a saved order fires SubmitApplication only once.
    try {
      const submitGuardKey = `cpa_submitapplication_fired_${savedLeadId}`;
      const alreadyFired =
        typeof window !== "undefined" && localStorage.getItem(submitGuardKey) === "1";
      if (!alreadyFired) {
        const { trackPixel, debugMetaEvent } = await import("@/lib/fbpixel");
        trackPixel("SubmitApplication", {
          content_name: "Confident Parent Academy Workshop",
          value: total,
          currency: "PKR",
        });
        if (typeof window !== "undefined") localStorage.setItem(submitGuardKey, "1");
        debugMetaEvent("SubmitApplication fired - successful paid order", {
          leadId: savedLeadId,
          total,
          paymentMethod: PAYMENT_ACCOUNTS[paymentMethod].label,
          screenshotUploaded: true,
        });
      }
    } catch (err) {
      console.error("Pixel SubmitApplication event failed", err);
    }

    navigate({ to: "/onboarding", search: { lead: savedLeadId }, replace: true });
  }

  const acct = PAYMENT_ACCOUNTS[paymentMethod];

  return (
    <section id="lead-form" ref={sectionRef} className="py-14 md:py-20 bg-secondary scroll-mt-16">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl md:text-4xl font-semibold leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reserve Your Seat for the Confident Parenting Workshop
          </h2>
          <p className="mt-3 text-muted-foreground">
            Complete your details below, send payment, upload your screenshot, and get access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Step 1 — Parent Details */}
          <section className="bg-card rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-5 py-3 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <User className="size-4" /> Step 1 — Your Details
            </div>
            <div className="p-5 space-y-3">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={maybeFireLead}
                placeholder="Full Name*"
                autoComplete="name"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={maybeFireLead}
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
                onBlur={maybeFireLead}
                placeholder="WhatsApp Number* (e.g. 03XX XXXXXXX)"
                autoComplete="tel"
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                required
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                onBlur={maybeFireLead}
                placeholder="Your child's age(s)* (e.g. 3 and 6)"
                maxLength={120}
                className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </section>

          {/* Step 2 — Order Bumps */}
          {BUMPS.map((b) => {
            const checked = !!bumps[b.id];
            return (
              <label
                key={b.id}
                className={`block rounded-xl border-2 border-dashed cursor-pointer p-4 transition ${
                  checked
                    ? "border-[color:var(--blush-deep)] bg-[color:var(--secondary)]"
                    : "border-yellow-500 bg-yellow-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setBumps((s) => ({ ...s, [b.id]: e.target.checked }))}
                    className="mt-1 size-5 accent-[color:var(--warm-brown)] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    {b.caption && (
                      <div className="mb-2 text-xs md:text-sm font-bold text-[color:var(--warm-brown-deep)]">
                        {b.caption}
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <ArrowRight className="size-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="font-extrabold text-[color:var(--warm-brown-deep)] uppercase text-sm md:text-base">
                        ✅ YES! Add {b.title} for just PKR {b.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-3">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-auto rounded-lg object-cover border border-[color:var(--border)]"
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--warm-brown)] text-white text-xs font-bold px-3 py-1 shadow-sm">
                        <span className="size-2 rounded-full bg-white/90" aria-hidden />
                        {b.badge}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-slate-800 leading-relaxed">
                      <p className="font-bold underline mb-2">SPECIAL ONE-TIME OFFER:</p>
                      <ul className="space-y-1">
                        {b.bullets.map((line) => (
                          <li key={line}>✅ {line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </label>
            );
          })}

          {/* Step 3 — Payment Method */}
          <section className="bg-card rounded-xl shadow-lg border-2 border-primary/40 ring-2 ring-primary/10 overflow-hidden">
            <div className="bg-primary text-primary-foreground px-5 py-3 font-bold text-center uppercase tracking-wider text-sm">
              Step 3 — Payment Method
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label
                  htmlFor="paymethod"
                  className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide"
                >
                  <CreditCard className="size-4" /> Select Your Payment Method
                </label>
                <div className="relative mt-2">
                  <select
                    id="paymethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PayMethod)}
                    className="appearance-none w-full rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 px-4 py-4 pr-12 text-base font-bold text-foreground shadow-md outline-none focus:ring-4 focus:ring-primary/30 hover:shadow-lg transition cursor-pointer"
                  >
                    <option value="sadapay">⭐ SadaPay</option>
                    <option value="hbl">🏦 Habib Bank Limited (HBL)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
                </div>
              </div>

              <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  {acct.label} Payment Details
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Account Title</span>
                    <span className="font-bold text-right">{acct.name}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground shrink-0">{acct.accountLabel}</span>
                    <span className="font-bold tracking-wider text-right break-all">{acct.account}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4 text-sm text-slate-800">
                <p className="font-bold mb-1">📌 Important Instructions</p>
                <p>
                  Please send your payment to the selected account above, then upload the payment
                  screenshot in the field below and click submit. Your access will be processed after
                  payment verification.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 + 5 — Screenshot + Summary + Submit */}
          <section className="bg-card rounded-xl shadow-sm border p-5">
            <div className="text-sm font-bold uppercase tracking-wider mb-3">Order Summary</div>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between gap-3">
                  <span className="truncate">{i.title}</span>
                  <span className="font-semibold">Rs. {i.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between text-lg font-black">
                <span>Total</span>
                <span className="text-destructive">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl border-2 border-dashed border-primary/60 bg-primary/5 p-4">
              <label className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-primary">
                <ImageIcon className="size-4" /> Step 4 — Upload Payment Screenshot{" "}
                <span className="text-destructive">*</span>
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                Attach a clear screenshot of your payment confirmation (JPG or PNG, max 8MB).
              </p>

              <label
                htmlFor="cpa-screenshot"
                className="mt-3 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/40 bg-background hover:bg-primary/5 transition cursor-pointer px-4 py-6 text-center"
              >
                {screenshotPreview ? (
                  <>
                    <img
                      src={screenshotPreview}
                      alt="Payment screenshot preview"
                      className="max-h-40 rounded-md border"
                    />
                    <span className="text-xs text-muted-foreground truncate max-w-full">
                      {screenshot?.name} — tap to change
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="size-7 text-primary" />
                    <span className="text-sm font-bold text-primary">Tap to upload screenshot</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 8MB</span>
                  </>
                )}
                <input
                  id="cpa-screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              {uploadError && (
                <p className="mt-2 text-xs font-semibold text-destructive">{uploadError}</p>
              )}
            </div>

            {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn-cta w-full mt-5 px-6 py-4 text-base md:text-lg"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <span>{submitting ? "SUBMITTING..." : "SUBMIT & GET ACCESS"}</span>
                <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
              </span>
              <div className="text-xs font-medium normal-case tracking-normal opacity-95">
                Submit your details and screenshot to receive your workshop access.
              </div>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> 100% Secure &amp; Safe Payments
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" /> Your information is secure and will not be shared.
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}