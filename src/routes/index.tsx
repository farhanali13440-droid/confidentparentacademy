import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import { CtaButton } from "@/components/site/CtaButton";
import { MasterclassCountdown } from "@/components/site/MasterclassCountdown";
import {
  Star, ShieldCheck, CheckCircle2, Lock, BadgeCheck, Heart, Brain, Users,
  Calendar, Gift, ChevronDown, ArrowRight, Clock, Video, MessageCircle,
  FileText, Award, Sparkles, Baby, Home, HandHeart,
} from "lucide-react";
import heroFamily from "@/assets/cpa-hero-family.jpg";
import samraPortrait from "@/assets/cpa-samra.jpg";
import bonusPdfGuide from "@/assets/cpa-bonus-pdf-guide.png.asset.json";
import bonusToolkitMockup from "@/assets/cpa-bonus-toolkit-mockup.png.asset.json";
import bonusRecording from "@/assets/cpa-bonus-recording.png.asset.json";
import bonusWorksheets from "@/assets/cpa-bonus-worksheets.png.asset.json";
import bonusLiveQa from "@/assets/cpa-bonus-live-qa.png.asset.json";
import completeToolkit from "@/assets/cpa-complete-toolkit.png.asset.json";
import beforeAfter from "@/assets/cpa-before-after.png.asset.json";
import everythingYouGet from "@/assets/cpa-everything-you-get.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Confident Parent Academy | Stop the Daily Fights and Enjoy Your Child Again" },
      { name: "description", content: "A live parenting webinar with Miss Samra Riaz. Understand why your child cries, shouts and doesn't listen, and learn simple ways to calm your home. Only 499 PKR." },
      { property: "og:title", content: "Confident Parent Academy | Parenting Webinar with Miss Samra Riaz" },
      { property: "og:description", content: "Understand why your child behaves this way and learn simple ways to bring calm back to your home. Live on 11 July on Google Meet." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <TransformationSection />
      <CurriculumSection />
      <AboutSamra />
      <StorySection />
      <IncludesSection />
      <EverythingYouReceiveSection />
      <PricingSection />
      <BonusesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const facts = [
    { icon: Calendar, label: "11 July" },
    { icon: Video, label: "Google Meet" },
    { icon: Clock, label: "1.5 Hours" },
    { icon: MessageCircle, label: "Live Q&A" },
    { icon: Star, label: "Recording Included" },
    { icon: Gift, label: "Only 499 PKR" },
  ];
  return (
    <section className="hero-bg text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 md:pt-12 md:pb-16">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blush/40 bg-white/70 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <BadgeCheck className="size-4 text-accent shrink-0" />
            <span className="text-[11px] sm:text-sm font-semibold text-foreground/90 text-center leading-snug">
              A live parenting webinar for busy Pakistani parents
            </span>
          </div>
        </div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-6 md:gap-8 md:items-center">
          {/* 1. Headline + subheadline — always first so the promise leads on mobile */}
          <div className="text-center md:text-left md:col-start-1 md:row-start-1">
            <h1 className="text-[26px] leading-tight sm:text-4xl md:text-[42px] md:leading-[1.1] font-semibold whitespace-pre-line" style={{ fontFamily: "var(--font-display)" }}>
              {"Tired of the Crying,\nShouting and Daily\u00A0\nFights at Home? "}
              <span className="gradient-highlight-pink">Bring Back the Calm</span> With Your Child
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-lg text-foreground/75 leading-relaxed">
              In this live webinar you will finally understand why your child cries, shouts and
              doesn't listen, and get simple things you can do the same day to make your home
              calmer. No shouting. No guilt. No need to be a perfect parent.
            </p>
          </div>

          {/* 2. Hero image — sits after the headline on mobile, right column on desktop */}
          <div className="md:col-start-2 md:row-start-1 md:row-span-2 md:self-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-blush/30">
              <img
                src={heroFamily}
                alt="A happy Pakistani family — mother, father and child laughing together at home"
                className="w-full h-auto object-cover"
                width={1280}
                height={1280}
              />
            </div>
          </div>

          {/* 3. Info chips + CTA — below the image on mobile, under the headline on desktop */}
          <div className="text-center md:text-left md:col-start-1 md:row-start-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto md:mx-0">
              {facts.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl bg-white/70 ring-1 ring-border px-3 py-2">
                  <Icon className="size-4 text-accent shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-3 max-w-md mx-auto md:mx-0">
              <CtaButton subtitle="Live on 11 July · Recording included">Reserve My Seat</CtaButton>
              <a
                href="#curriculum"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="block w-full rounded-full border border-warm-brown/30 px-6 py-3 text-center text-sm font-semibold text-warm-brown hover:bg-blush/10 transition"
              >
                View Webinar Details
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 max-w-2xl mx-auto">
          <MasterclassCountdown variant="light" />
        </div>

        <div className="mt-6 max-w-md mx-auto" id="hero-optin">
          <InlineLeadForm />
        </div>
      </div>
    </section>
  );
}

/* ---------------- LEAD FORM (functionally unchanged) ---------------- */

function InlineLeadForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      id="lead-form"
      className="rounded-2xl bg-card text-card-foreground p-5 sm:p-6 shadow-2xl space-y-3 text-left scroll-mt-24"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        const fullName = name.trim();
        const emailNorm = email.trim().toLowerCase();
        const wa = whatsapp.trim();
        const spec = specialty.trim();

        if (fullName.length < 2) {
          setError("Please enter your full name.");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNorm)) {
          setError("Please enter a valid email address.");
          return;
        }
        const digits = wa.replace(/\D/g, "");
        if (digits.length < 10) {
          setError("Please enter a valid WhatsApp number (e.g. 03XX XXXXXXX).");
          return;
        }
        if (!spec) {
          setError("Please tell us your child's age(s).");
          return;
        }

        setSubmitting(true);
        try {
          const { upsertLead } = await import("@/lib/leads.functions");
          await upsertLead({
            data: {
              full_name: fullName,
              email: emailNorm,
              whatsapp: wa,
              specialty: spec,
              lead_status: "Opted In - Checkout Not Completed",
            },
          });
        } catch (err) {
          console.error("Failed to save lead", err);
        }

        try {
          const { trackPixel } = await import("@/lib/fbpixel");
          trackPixel("Lead", { content_name: "Webinar Registration", value: 499, currency: "PKR" });
        } catch (err) {
          console.error("Pixel Lead event failed", err);
        }

        const params = new URLSearchParams();
        params.set("full_name", fullName);
        params.set("email", emailNorm);
        params.set("whatsapp", wa);
        params.set("specialty", spec);
        navigate({ to: "/order", search: Object.fromEntries(params) });
      }}
    >
      <div className="text-center">
        <div className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>Reserve Your Seat</div>
        <p className="text-xs text-muted-foreground mt-1">Just 499 PKR. Limited seats for the live session.</p>
      </div>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name*"
        autoComplete="name"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email*"
        autoComplete="email"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        required
        type="tel"
        inputMode="tel"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        placeholder="WhatsApp Number* (e.g. 03XX XXXXXXX)"
        autoComplete="tel"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <input
        required
        type="text"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        placeholder="Your child's age(s)* (e.g. 3 and 6)"
        maxLength={120}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="btn-cta w-full px-4 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <span>{submitting ? "Saving..." : "Continue to Checkout"}</span>
          <ArrowRight className="btn-cta-arrow size-5" aria-hidden="true" />
        </span>
      </button>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <Lock className="size-3" /> Your details are saved securely. Payment is on the next step.
      </p>
    </form>
  );
}

/* ---------------- TRUST BAR ---------------- */

function TrustBar() {
  const items = [
    { icon: Brain, label: "Clinical Psychology" },
    { icon: Heart, label: "Calm, Gentle Approach" },
    { icon: Users, label: "For Mothers & Fathers" },
    { icon: HandHeart, label: "Family Friendly" },
  ];
  return (
    <section className="bg-secondary border-b">
      <div className="mx-auto max-w-5xl px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2 text-warm-brown">
            <Icon className="size-4 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROBLEM ---------------- */

function ProblemSection() {
  const problems = [
    "No matter how many times you explain, your child acts like they didn't even hear you.",
    "Every small thing turns into crying, shouting or a tantrum.",
    "The moment you take the mobile away, your child starts crying or gets angry.",
    "Bedtime becomes a nightly fight and nobody sleeps on time.",
    "You ask them to study, but it ends in tears or arguments.",
    "The house is a mess and you feel like you're repeating yourself all day.",
    "The kids fight with each other and you're stuck in the middle.",
    "Your child gets upset over things you can't even understand.",
    "You end the day feeling guilty for losing your temper again.",
    "It feels like the same battles happen over and over, every single day.",
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Sound familiar?" title="Does This Sound Like Your Home?" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {problems.map((p) => (
            <div key={p} className="flex items-start gap-3 rounded-2xl bg-card border border-border px-4 py-3.5 shadow-sm">
              <span className="grid place-items-center size-8 rounded-full shrink-0" style={{ backgroundColor: "var(--soft-pink)" }}>
                <Baby className="size-4 text-destructive" />
              </span>
              <span className="text-sm font-medium text-foreground leading-snug">{p}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          If even a few of these felt like your home, you are not a bad parent. Nobody has ever
          shown you <span className="font-semibold text-foreground">why</span> your child does these things, or what to do next.
        </p>
      </div>
    </section>
  );
}

/* ---------------- SOLUTION ---------------- */

function SolutionSection() {
  const points = [
    { icon: HandHeart, title: "Your child listens when they feel understood", desc: "Once your child feels safe and heard, they stop fighting you and start listening. Correction comes after connection." },
    { icon: Baby, title: "Know what's normal for their age", desc: "Learn what is normal at your child's age so you stop worrying and stop expecting too much too soon." },
    { icon: Brain, title: "See the real reason behind the behaviour", desc: "Every time your child acts out, they are trying to tell you something. Learn to read what they really need." },
    { icon: Home, title: "Small changes that stop daily arguments", desc: "A few simple changes in how you respond can turn shouting matches into calm conversations." },
    { icon: Sparkles, title: "Simple tools you can use the same day", desc: "Easy things you can start using at home today, no psychology background needed." },
  ];
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          eyebrow="The real shift"
          title="You Don't Need More Parenting Tips. You Need to Understand Your Child."
          subtitle="Once you understand why your child behaves the way they do, the daily fights start to fade and your home feels calmer."
        />
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl bg-card border border-border p-6 shadow-sm">
              <span className="grid place-items-center size-11 rounded-2xl bg-accent/50 text-warm-brown">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS ---------------- */

function BenefitsSection() {
  const benefits = [
    "Instead of shouting every day, you'll know exactly why your child is behaving that way and what to do next.",
    "You'll stay calm in the moments that used to make you lose your temper.",
    "The crying, arguing and daily fights will start to settle down.",
    "Your child will trust you more and open up to you.",
    "You'll be able to talk to your child in a way they actually listen to.",
    "You'll feel confident handling tantrums and tough moments in public and at home.",
    "Your child will feel happier, calmer and more secure at home.",
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="What changes for you" title="Here's What Your Days Will Feel Like After This Webinar" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 rounded-2xl bg-card border border-border p-5 shadow-sm">
              <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm md:text-base font-medium">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CURRICULUM ---------------- */

function TransformationSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Before vs after"
          title="Picture Your Home After Just A Few Small Changes"
          subtitle="A few small changes today can turn stressful, noisy days into calm, happy ones at home."
        />
        <div className="mt-10 md:mt-12 mx-auto max-w-5xl">
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-blush/30 bg-white">
            <img
              src={beforeAfter.url}
              alt="Before and after: from an overwhelmed, disconnected home to a calm, connected and confident family"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CURRICULUM ---------------- */

function CurriculumSection() {
  const modules = [
    "Why the parenting advice everyone gives you doesn't actually work.",
    "What is normal behaviour at your child's age, and what isn't.",
    "Why your child listens more when they feel close to you first.",
    "Simple changes in your parenting that can reduce daily arguments.",
    "Why your child behaves this way, and what they're really trying to tell you.",
    "How the right toys and play can calm your child and help them learn.",
    "Easy play activities that improve your child's behaviour and development.",
    "Ready-to-use tools that help you handle tough behaviour calmly and confidently.",
    "The common mistakes that quietly make behaviour worse, and how to avoid them.",
    "Quick, practical fixes you can try at home the same day.",
  ];
  return (
    <section id="curriculum" className="py-14 md:py-20 bg-secondary scroll-mt-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Inside the webinar" title="What You'll Learn (10 Simple, Real-Life Topics)" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {modules.map((m, i) => (
            <div key={m} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-5 shadow-sm">
              <span className="grid place-items-center size-10 rounded-full bg-accent text-warm-brown-deep font-semibold shrink-0" style={{ fontFamily: "var(--font-display)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base font-medium leading-snug">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT SAMRA ---------------- */

function AboutSamra() {
  const creds = [
    "Clinical Psychologist",
    "4 Years of Experience",
    "Post Graduate Diploma in Clinical Psychology",
    "Certified Early Childhood Educator",
    "Behaviour Therapist (ABAT Candidate)",
  ];
  const works = ["Parents", "Children", "University Students", "Life Counselling"];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-border">
            <img
              src={samraPortrait}
              alt="Miss Samra Riaz, Clinical Psychologist and Parent Counsellor"
              className="w-full h-auto object-cover"
              width={1024}
              height={1280}
              loading="lazy"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-foreground/70">Your Guide</p>
          <h2 className="mt-2 text-2xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Meet Miss Samra Riaz
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Samra is a clinical psychologist and parent counsellor who helps families build calmer,
            warmer homes. She speaks to you like a friend, not like a textbook. No hard words, no
            judgement, just simple advice that works in real Pakistani homes.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
            {creds.map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm font-medium">
                <Award className="size-4 text-warm-brown shrink-0 mt-0.5" />
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-foreground">She works with:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {works.map((w) => (
                <span key={w} className="rounded-full bg-accent/50 text-accent-foreground text-xs font-semibold px-3 py-1">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STORY ---------------- */

function StorySection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-10 shadow-sm">
          <span className="grid place-items-center size-12 rounded-2xl mx-auto" style={{ backgroundColor: "var(--soft-pink)" }}>
            <Heart className="size-6 text-destructive" />
          </span>
          <h2 className="mt-5 text-center text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Why I Do This Work
          </h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed text-center md:text-left">
            <p>
              My journey into parenting psychology began close to home. Growing up with three
              autistic cousins, I saw how much families struggle when they don't have the right
              understanding or support — and how much lighter everything becomes when they do.
            </p>
            <p>
              That experience gave me one mission: to help parents <span className="font-semibold text-foreground">before</span> small
              struggles grow into severe problems. Every child deserves to be understood, and every
              parent deserves to feel confident, calm, and connected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- INCLUDES ---------------- */

function IncludesSection() {
  const items = [
    { icon: Video, title: "Live Session", desc: "90 minutes live with Miss Samra on Google Meet." },
    { icon: Star, title: "Recording", desc: "Can't attend live? Watch the full recording anytime." },
    { icon: MessageCircle, title: "Live Q&A", desc: "Ask your real parenting questions and get answers." },
    { icon: FileText, title: "PDF Parenting Guide", desc: "A practical takeaway guide (coming soon)." },
    { icon: Award, title: "Certificate", desc: "Certificate of attendance (optional)." },
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Everything included" title="What The Webinar Includes" />
        <div className="mt-8 mx-auto max-w-4xl">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-blush/30 bg-white">
            <img
              src={everythingYouGet.url}
              alt="Everything you get with your webinar ticket — live parenting webinar, recording, guide, toolkit, live Q&A and WhatsApp support"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl bg-card border border-border p-6 shadow-sm">
              <span className="grid place-items-center size-11 rounded-2xl bg-accent/50 text-warm-brown">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */

function EverythingYouReceiveSection() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="The full package"
          title="Everything You'll Receive Inside This Webinar"
          subtitle="Your registration gives you much more than just a live session."
        />
        <div className="mt-10 md:mt-12 mx-auto max-w-5xl">
          <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-blush/30 bg-white">
            <img
              src={completeToolkit.url}
              alt="The complete Parenting Behaviour Toolkit — behaviour trackers, routine charts, reward charts, calm-down strategies, emotions wheel and encouragement cards"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */

function PricingSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-3xl bg-card border-2 border-accent/40 p-8 md:p-10 shadow-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary-foreground/70">
            Limited-time seat price
          </p>
          <div className="mt-4 flex items-end justify-center gap-3">
            <span className="text-5xl md:text-6xl font-semibold text-warm-brown-deep" style={{ fontFamily: "var(--font-display)" }}>
              499 PKR
            </span>
            <span className="text-xl text-muted-foreground line-through mb-1">2,000 PKR</span>
          </div>
          <div className="mt-3 inline-block rounded-full bg-accent/60 text-accent-foreground text-sm font-bold px-4 py-1.5">
            You save 1,501 PKR today
          </div>
          <p className="mt-5 text-muted-foreground">
            Enrol now while the introductory price lasts. The price rises to 2,000 PKR after this cohort.
          </p>
          <div className="mt-7 max-w-sm mx-auto">
            <CtaButton subtitle="Live on 11 July · Recording included">Reserve My Seat — 499 PKR</CtaButton>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" /> Secure checkout
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BONUSES ---------------- */

function FreeBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wide px-3 py-1 ring-1 ring-primary/20">
      <Gift className="size-3.5" /> Included FREE
    </span>
  );
}

function BonusCard({
  img,
  alt,
  label,
  title,
  desc,
  featured = false,
}: {
  img: string;
  alt: string;
  label: string;
  title: string;
  desc: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl border ${
        featured ? "border-blush/60 shadow-2xl ring-1 ring-blush/40" : "border-border shadow-md"
      }`}
      style={{ backgroundColor: "color-mix(in srgb, var(--soft-pink) 20%, white)" }}
    >
      <div className="bg-white">
        <img src={img} alt={alt} className="w-full h-auto object-contain" loading="lazy" />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-warm-brown">{label}</span>
          <FreeBadge />
        </div>
        <h3 className={`mt-2 font-semibold ${featured ? "text-xl md:text-2xl" : "text-lg"}`} style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function BonusesSection() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Included free"
          title="Premium Bonuses You Get With Your Ticket"
          subtitle="Practical, ready-to-use resources designed to make peaceful parenting easier — yours free with registration."
        />

        {/* Featured bonus — highest perceived value */}
        <div className="mt-10">
          <BonusCard
            featured
            img={bonusToolkitMockup.url}
            alt="Parenting Behaviour Toolkit — worksheets, trackers, charts and templates to understand and support your child"
            label="Exclusive Bonus"
            title="Parenting Behaviour Toolkit"
            desc="A complete set of practical tools — behaviour trackers, routine charts, reward charts and calm-down strategies — to understand, guide and support your child every day."
          />
        </div>

        {/* Printable worksheets — directly below the toolkit */}
        <div className="mt-6">
          <BonusCard
            img={bonusWorksheets.url}
            alt="Printable parenting worksheets — emotions check-in, daily routine planner, behaviour tracker and good-choices chart"
            label="Bonus — Printables"
            title="Printable Parenting Worksheets"
            desc="Ready-to-print tools for everyday parenting support: emotion check-ins, routine planners, calm-down cards and behaviour trackers your child will love."
          />
        </div>

        {/* Recording + Live Q&A side by side */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <BonusCard
            img={bonusRecording.url}
            alt="Webinar recording on a laptop — rewatch the full session anytime"
            label="Bonus — Lifetime Recording"
            title="Webinar Recording"
            desc="Missed the live session? No problem. Get lifetime access to the full recording and rewatch anytime, on any device."
          />
          <BonusCard
            img={bonusLiveQa.url}
            alt="Live Q&A session with Miss Samra Riaz on Google Meet"
            label="Bonus — Live Q&A"
            title="Live Q&A Session"
            desc="Ask your personal parenting questions directly to Miss Samra Riaz and get expert guidance in real time."
          />
        </div>

        {/* PDF guide */}
        <div className="mt-6 mx-auto max-w-3xl">
          <BonusCard
            img={bonusPdfGuide.url}
            alt="Peaceful Parenting Guide PDF — a complete guide with practical strategies and real-life examples"
            label="Bonus — PDF Guide"
            title="Peaceful Parenting Guide (PDF)"
            desc="A calm, practical reference packed with step-by-step strategies, expert tips and real-life examples you can return to again and again."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

function TestimonialsSection() {
  const reviews = [
    { name: "A. Fatima", role: "Mother of two", text: "For the first time I understood WHY my son was acting out. The shouting has almost stopped at home." },
    { name: "M. Bilal", role: "Father", text: "As a dad I wasn't sure this was for me. It completely changed how I connect with my daughter." },
    { name: "S. Ayesha", role: "Mother", text: "Calm, warm and practical. I used the tools the very same evening and saw a difference." },
  ];
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Parent stories" title="What Parents Are Saying" />
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-3xl bg-card border border-border p-6 shadow-sm">
              <div className="flex gap-0.5 text-secondary-foreground">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current text-[color:var(--secondary-foreground)]" />)}
              </div>
              <p className="mt-3 text-sm italic text-foreground leading-relaxed">"{r.text}"</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Testimonials shown are placeholders and will be replaced with real parent reviews.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQSection() {
  const faqs = [
    { q: "Who should attend this webinar?", a: "Any parent who wants a calmer home and a better understanding of their child's behaviour — whether your child is a toddler, school-aged, or older." },
    { q: "Can fathers attend?", a: "Absolutely. Fathers play a vital role, and this webinar is designed for both mothers and fathers." },
    { q: "Can both parents join?", a: "Yes — we encourage both parents to attend together on the same registration so you're aligned at home." },
    { q: "Will the recording be available?", a: "Yes. Every registrant gets access to the full recording, so you can watch or rewatch anytime." },
    { q: "How long is the webinar?", a: "It runs for 1 hour 30 minutes, including a live Q&A session." },
    { q: "What platform is it on?", a: "The live session is hosted on Google Meet. You'll receive the joining link on WhatsApp and email." },
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-card border border-border p-5 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between gap-3 font-semibold list-none">
                <span>{f.q}</span>
                <ChevronDown className="size-5 text-warm-brown shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */

function FinalCta() {
  return (
    <section className="hero-bg text-foreground py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          A Calmer Home Starts With One Evening
        </h2>
        <p className="mt-4 text-foreground/75 max-w-xl mx-auto">
          Join Miss Samra Riaz live on 11 July and learn how to raise a well-behaved child — without
          guilt, shouting, or being a perfect parent.
        </p>
        <div className="mt-6 max-w-sm mx-auto">
          <MasterclassCountdown variant="light" showDateLine={false} className="mb-5" />
          <CtaButton subtitle="Only 499 PKR · Recording included">Reserve My Seat</CtaButton>
        </div>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-foreground/70">
          <ShieldCheck className="size-4 text-accent" /> Secure checkout · Instant confirmation
        </div>
      </div>
    </section>
  );
}

/* ---------------- SHARED ---------------- */

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground/70">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl md:text-4xl font-semibold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
