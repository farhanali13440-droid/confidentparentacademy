import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import { CheckCircle2, Calendar, Users, MessageCircle, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import { getThankYouEntitlements } from "@/lib/thankyou.functions";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Payment Screenshot Received" },
      { name: "description", content: "Your payment screenshot has been received. Join the WhatsApp community for webinar details, the Google Meet link, and reminders." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const waCommunity = "https://chat.whatsapp.com/D5RErdi4ZnhJGNOOEK37c6";
  const waSupport = `https://wa.me/923135944817?text=${encodeURIComponent(
    "Assalam-o-Alaikum, I need help with my Confident Parent Academy webinar order.",
  )}`;

  const [otoSubmitted, setOtoSubmitted] = useState(false);
  const [promptVaultUnlocked, setPromptVaultUnlocked] = useState(false);

  useEffect(() => {
    try {
      setOtoSubmitted(Boolean(localStorage.getItem("oto_last_submitted")));
    } catch {}

    let leadId: string | null = null;
    try {
      const url = new URL(window.location.href);
      leadId = url.searchParams.get("lead") || localStorage.getItem("cgm_last_lead");
    } catch {}
    if (!leadId) return;

    getThankYouEntitlements({ data: { leadId } })
      .then((res) => {
        if (res?.promptVault) setPromptVaultUnlocked(true);
      })
      .catch(() => {
        /* silently ignore — no bonus shown */
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <main className="bg-secondary flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
          {/* Success */}
          <section className="bg-card rounded-2xl border shadow-sm p-8 text-center">
            <div className="mx-auto size-16 rounded-full bg-emerald-100 grid place-items-center">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>
            <h1 className="mt-4 text-2xl md:text-3xl font-black">
              ✅ Payment Screenshot Received
            </h1>
            <p className="mt-3 text-muted-foreground">
              Thank you for submitting your payment screenshot. Our team will verify your
              payment and process your access shortly.
            </p>
          </section>

          {otoSubmitted && (
            <section className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="size-6 text-yellow-700 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800">
                  <div className="font-bold mb-1">🎯 1-on-1 Session Payment Submitted</div>
                  <p>
                    Your payment for the private 1-on-1 parenting session with Miss Samra has been
                    received and will be confirmed after verification. Our team will reach out on
                    WhatsApp to schedule your private session.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Prompt Vault bonus — only when purchased */}
          {promptVaultUnlocked && (
            <section className="bg-card rounded-2xl border-2 border-emerald-200 shadow-sm p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="size-10 rounded-full bg-emerald-100 grid place-items-center">
                  <Gift className="size-5 text-emerald-600" />
                </div>
                <h2 className="text-lg md:text-xl font-extrabold">🎁 Your Bonus Is Ready</h2>
              </div>
              <p className="mt-3 font-semibold text-slate-900">
                You have unlocked the Webinar Recording + PDF Parenting Bundle.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Rewatch the full webinar anytime and use the PDF parenting guide and resources to
                keep building a calmer, more connected home.
              </p>
              <a
                href="https://docs.google.com/document/d/1hoBs3fP65ta11gwvugQ_MrRMBUBVxPDiJT9AZizdgYE/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-flex items-center gap-2 w-full md:w-auto mt-5 px-6 py-4 text-base md:text-lg justify-center"
              >
                <span>Access My Recording + PDF Bundle</span>
                <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
              </a>
            </section>
          )}

          {/* Webinar details */}
          <section className="bg-card rounded-2xl border shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 grid place-items-center">
                <Calendar className="size-5 text-primary" />
              </div>
              <h2 className="text-lg font-extrabold uppercase tracking-wide">📅 Webinar Details</h2>
            </div>
            <div className="mt-4 rounded-xl bg-primary text-primary-foreground p-6 text-center">
              <div className="text-sm uppercase tracking-widest opacity-90">Live on Google Meet</div>
              <div className="mt-1 text-2xl md:text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>Saturday, 11th July 2026</div>
              <div className="mt-1 text-lg font-bold">3:00 PM – 4:30 PM (Pakistan Time)</div>
            </div>
            <div className="mt-4 rounded-lg bg-secondary p-4 text-sm text-slate-800">
              <p className="font-bold mb-1">How to join</p>
              <p>
                You'll receive the Google Meet joining link on WhatsApp and email before the session.
                Add the date to your calendar and join a few minutes early.
              </p>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Confident+Parent+Academy+Webinar&dates=20260711T100000Z/20260711T113000Z&details=Live+parenting+webinar+with+Miss+Samra+Riaz+on+Google+Meet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 rounded-full border-2 border-primary px-4 py-2 font-bold text-primary hover:bg-primary/5"
              >
                <Calendar className="size-4" /> Add to Calendar
              </a>
            </div>
          </section>

          {/* WhatsApp community */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="size-10 rounded-full bg-emerald-100 grid place-items-center">
                <Users className="size-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-extrabold uppercase tracking-wide">👥 Join WhatsApp Community</h2>
            </div>
            <a
              href={waCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta inline-flex items-center gap-2 w-full md:w-auto mt-5 px-6 py-4 text-base md:text-lg justify-center"
            >
              <span>Join WhatsApp Community</span>
              <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              In this community, you will receive the Google Meet link, reminders, important
              announcements, and all training updates.
            </p>
          </section>

          {/* Support */}
          <section className="bg-card rounded-2xl border shadow-sm p-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="size-10 rounded-full bg-emerald-100 grid place-items-center">
                <MessageCircle className="size-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-extrabold uppercase tracking-wide">💬 Need Help?</h2>
            </div>
            <a
              href={waSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto mt-5 px-6 py-3 rounded-md border-2 border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 justify-center"
            >
              Contact Support on WhatsApp
            </a>
          </section>

          {/* Notice */}
          <section className="rounded-2xl border-l-4 border-yellow-500 bg-yellow-50 p-5 flex gap-3">
            <ShieldCheck className="size-6 text-yellow-700 shrink-0 mt-0.5" />
            <div className="text-sm text-slate-800">
              <div className="font-bold mb-1">🔒 Access Processing Notice</div>
              <p>
                Our team will verify your payment screenshot and process your access shortly.
                Please keep an eye on your WhatsApp and email for updates.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
