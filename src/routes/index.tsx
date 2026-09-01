import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/site/Topbar";
import { Footer } from "@/components/site/Footer";
import { CtaButton } from "@/components/site/CtaButton";
import { LeadOptinForm } from "@/components/site/LeadOptinForm";
import { MasterclassCountdown } from "@/components/site/MasterclassCountdown";
import {
  Star, ShieldCheck, CheckCircle2, Lock, BadgeCheck, Heart, Brain, Users,
  Calendar, Gift, ChevronDown, Clock, Video, MessageCircle,
  FileText, Award, Sparkles, Baby, Home, HandHeart,
} from "lucide-react";
import heroFamily from "@/assets/cpa-hero-family.jpg";
import samraPortrait from "@/assets/cpa-samra.jpg";
import bonusCommunity from "@/assets/cpa-bonus-community.png.asset.json";
import bonusGeniusBlueprint from "@/assets/cpa-bonus-genius-blueprint.png.asset.json";
import bonusGratitudePlanner from "@/assets/cpa-bonus-gratitude-planner.png.asset.json";
import beforeAfter from "@/assets/cpa-before-after.png.asset.json";
import testimonialMotherhood from "@/assets/testimonial-motherhood.jpeg.asset.json";
import testimonialParenting from "@/assets/testimonial-parenting.jpeg.asset.json";
import exhaustedMotherCryingChild from "@/assets/exhausted-mother-crying-child.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Confident Parent Academy | Stop the Daily Fights and Enjoy Your Child Again" },
      { name: "description", content: "A live parenting workshop with Miss Samra Riaz. Understand why your child cries, shouts and doesn't listen, and learn simple ways to calm your home. Only 499 PKR." },
      { property: "og:title", content: "Confident Parent Academy | Parenting Workshop with Miss Samra Riaz" },
      { property: "og:description", content: "Understand why your child behaves this way and learn simple ways to bring calm back to your home. Live on 14 September on Google Meet." },
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
      <LeadOptinForm />
      <TrustBar />
      <ProblemSection />
      <SectionCta />
      <SolutionSection />
      <SectionCta />
      <BenefitsSection />
      <TransformationSection />
      <SectionCta />
      <CurriculumSection />
      <SectionCta />
      <AboutSamra />
      <SectionCta />
      <StorySection />
      <IncludesSection />
      <SectionCta />
      <GuaranteeSection />
      <SectionCta />
      <PricingSection />
      <BonusesSection />
      <SectionCta />
      <TestimonialsSection />
      <SectionCta />
      <FAQSection />
      <SectionCta />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const facts = [
    { icon: Calendar, label: "14 Sep" },
    { icon: Video, label: "Google Meet" },
    { icon: Clock, label: "1.5 Hours" },
    { icon: MessageCircle, label: "Live Q&A" },
    { icon: Gift, label: "3 Free Bonuses" },
    { icon: Star, label: "Only 499 PKR" },
  ];
  return (
    <section className="hero-bg text-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 md:pt-12 md:pb-16">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blush/40 bg-white/70 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <BadgeCheck className="size-4 text-accent shrink-0" />
            <span className="text-[11px] sm:text-sm font-semibold text-foreground/90 text-center leading-snug">
              A live parenting workshop for busy Pakistani parents
            </span>
          </div>
        </div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-6 md:gap-8 md:items-center">
          <div className="text-center md:text-left md:col-start-1 md:row-start-1">
            <h1 className="text-[26px] leading-tight sm:text-4xl md:text-[42px] md:leading-[1.1] font-semibold whitespace-pre-line" style={{ fontFamily: "var(--font-display)" }}>
              {"How to Create a\n"}
              <span className="gradient-highlight-pink">Peaceful Home</span>
              {" &\u00A0\nRaise a Well-Behaved Child Without "}
              <span className="gradient-highlight-pink">Daily Power Struggles</span>
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-lg text-foreground/75 leading-relaxed">
              In this live workshop you will finally understand why your child cries, shouts and
              doesn't listen, and get simple things you can do the same day to make your home
              calmer. No shouting. No guilt. No need to be a perfect parent.
            </p>
          </div>

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
              <CtaButton subtitle="Live on 14 Sep · Includes 3 free bonuses">Reserve My Seat</CtaButton>
              <a
                href="#curriculum"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="block w-full rounded-full border border-warm-brown/30 px-6 py-3 text-center text-sm font-semibold text-warm-brown hover:bg-blush/10 transition"
              >
                View Workshop Details
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 max-w-2xl mx-auto">
          <MasterclassCountdown variant="light" />
        </div>

        <div className="mt-6 max-w-md mx-auto" id="hero-optin">
          <AttendeeTestimonials />
        </div>
      </div>
    </section>
  );
}

/* ---------------- LEAD FORM (functionally unchanged) ---------------- */

function AttendeeTestimonials() {
  const shots = [
    { src: testimonialMotherhood.url, alt: "Parent review: your guidance replaced fear with confidence and understanding" },
    { src: testimonialParenting.url, alt: "Parent review: your practical pointers helped with everyday parenting challenges" },
  ];
  return (
    <div className="mb-6">
      <h3 className="text-center text-base sm:text-lg font-bold text-warm-brown" style={{ fontFamily: "var(--font-display)" }}>
        Parents Loved This Workshop
      </h3>
      <p className="text-center text-xs text-muted-foreground mt-1 mb-3">
        Here's what previous attendees had to say
      </p>
      <div className="grid grid-cols-1 gap-3">
        {shots.map((s) => (
          <div key={s.src} className="rounded-2xl overflow-hidden shadow-lg ring-1 ring-blush/30 bg-white">
            <img src={s.src} alt={s.alt} loading="lazy" className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
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
        <div className="mt-8 md:mt-10 flex justify-center animate-fade-in">
          <img
            src={exhaustedMotherCryingChild.url}
            alt="An exhausted mother sitting on a sofa while her young child cries during a tantrum in a messy living room."
            loading="lazy"
            className="w-full max-w-[1000px] h-auto rounded-2xl shadow-xl"
          />
        </div>
        <div className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
        <SectionHeading eyebrow="What changes for you" title="Here's What Your Days Will Feel Like After This Workshop" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <CheckCircle2 className="size-5 mt-0.5 text-accent shrink-0" />
              <span className="text-sm sm:text-base leading-relaxed">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRANSFORMATION ---------------- */

function TransformationSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="The transformation" title="From Daily Power Struggles to a More Peaceful Home" />
        <div className="mt-9 grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-3xl bg-card border border-border p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-6 text-accent" />
              <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>What you will understand</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {[
                "Why your child behaves differently at different ages and stages.",
                "What sits underneath tantrums, defiance and emotional outbursts.",
                "How your response can either calm the situation or make it worse.",
                "How to set boundaries without turning every limit into a battle.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 className="size-5 mt-0.5 text-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-border">
            <img src={beforeAfter.url} alt="Before and after transformation concept for calmer family life" loading="lazy" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMMON HELPERS ---------------- */

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h2>
      {subtitle && <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function SectionCta() {
  return (
    <section className="bg-hero-deep text-white py-7">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm sm:text-base font-semibold">Ready to make home feel calmer?</p>
        <div className="mt-3 max-w-sm mx-auto">
          <CtaButton variant="light" subtitle="Live on 14 Sep · 3:00–4:30 PM PKT">Reserve My Seat</CtaButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CURRICULUM ---------------- */

function CurriculumSection() {
  const lessons = [
    "Understand what your child's behaviour is really communicating.",
    "Learn practical ways to respond to tantrums without shouting.",
    "Set healthy boundaries around screens, study, bedtime and routines.",
    "Build cooperation while protecting your relationship with your child.",
    "Get your parenting questions answered live in Q&A.",
  ];
  return (
    <section id="curriculum" className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Inside the workshop" title="What We Will Cover" />
        <div className="mt-9 grid md:grid-cols-2 gap-5">
          {lessons.map((lesson, i) => (
            <div key={lesson} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <span className="grid place-items-center size-9 rounded-full bg-accent/30 text-warm-brown font-bold shrink-0">{i + 1}</span>
              <p className="text-sm sm:text-base leading-relaxed">{lesson}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT SAMRA ---------------- */

function AboutSamra() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4 grid md:grid-cols-[280px_1fr] gap-8 items-center">
        <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-blush/30 max-w-sm mx-auto">
          <img src={samraPortrait} alt="Miss Samra Riaz" className="w-full h-auto" />
        </div>
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">Meet your instructor</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Miss Samra Riaz</h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            A practical, compassionate approach to parenting that helps mothers and fathers understand what is really happening underneath difficult behaviour.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              "Parenting Guidance",
              "Child Behaviour",
              "Family Communication",
            ].map((tag) => (
              <span key={tag} className="rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-semibold border border-border">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STORY ---------------- */

function StorySection() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <SectionHeading eyebrow="A reminder for parents" title="You Do Not Have to Do This Alone" subtitle="Parenting gets easier when you understand what is happening and have a simple plan for the hard moments." />
      </div>
    </section>
  );
}

/* ---------------- INCLUDES ---------------- */

function IncludesSection() {
  const includes = [
    { icon: Video, title: "90-Minute Live Workshop", desc: "Join live from anywhere on Google Meet." },
    { icon: MessageCircle, title: "Live Q&A", desc: "Ask your own parenting questions." },
    { icon: FileText, title: "Practical Takeaways", desc: "Simple actions you can start using immediately." },
    { icon: Gift, title: "3 Free Bonuses", desc: "Extra resources to keep using after the workshop." },
  ];
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Your seat includes" title="Everything You Need to Get Started" />
        <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {includes.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl bg-card border border-border p-6 text-center shadow-sm">
              <span className="mx-auto grid place-items-center size-12 rounded-2xl bg-accent/40 text-warm-brown"><Icon className="size-5" /></span>
              <h3 className="mt-4 font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GUARANTEE ---------------- */

function GuaranteeSection() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-3xl border border-border bg-card p-7 sm:p-9 text-center shadow-sm">
          <Lock className="mx-auto size-7 text-accent" />
          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>A Safe Decision for Your Family</h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Come ready to learn, ask questions and leave with practical ideas you can try right away at home.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */

function PricingSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-3xl bg-card border border-border p-8 sm:p-10 shadow-xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">Workshop seat</p>
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <span className="text-5xl font-black" style={{ fontFamily: "var(--font-display)" }}>499</span>
            <span className="text-lg font-bold">PKR</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">One live session · 14 September · 3:00–4:30 PM PKT</p>
          <div className="mt-6">
            <CtaButton subtitle="Live on Google Meet · 3 free bonuses">Reserve My Seat</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BONUSES ---------------- */

function BonusesSection() {
  const bonuses = [
    { img: bonusCommunity.url, title: "Parenting Support Community" },
    { img: bonusGeniusBlueprint.url, title: "Parenting Genius Blueprint" },
    { img: bonusGratitudePlanner.url, title: "Gratitude Planner" },
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Included free" title="3 Bonuses for Every Attendee" />
        <div className="mt-9 grid md:grid-cols-3 gap-5">
          {bonuses.map(({ img, title }) => (
            <div key={title} className="rounded-3xl overflow-hidden bg-card border border-border shadow-sm">
              <img src={img} alt={title} loading="lazy" className="w-full h-auto" />
              <div className="p-5 text-center">
                <h3 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */

function TestimonialsSection() {
  return (
    <section className="py-14 md:py-20 bg-secondary">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading eyebrow="Parent feedback" title="What Attendees Appreciated" />
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {[testimonialMotherhood.url, testimonialParenting.url].map((src) => (
            <div key={src} className="rounded-3xl overflow-hidden bg-white shadow-md border border-border">
              <img src={src} alt="Parent testimonial" loading="lazy" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQSection() {
  const faqs = [
    ["Who is this workshop for?", "It is for mothers and fathers who want a calmer, more cooperative home and practical tools for everyday parenting challenges."],
    ["How long is the workshop?", "The live workshop runs for 90 minutes, from 3:00 PM to 4:30 PM Pakistan Standard Time."],
    ["Where will it happen?", "Online via Google Meet. You can join from your phone or computer."],
    ["Is there a live Q&A?", "Yes. You will have time to ask your own parenting questions during the live session."],
  ];
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                <span>{q}</span>
                <ChevronDown className="size-4 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 pr-8 text-sm text-muted-foreground leading-relaxed">{a}</p>
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
    <section className="py-14 md:py-20 bg-hero-deep text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">14 September · 3:00–4:30 PM PKT</p>
        <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>Give Yourself a Calmer Home to Come Back To.</h2>
        <p className="mt-4 text-sm sm:text-base text-white/75 leading-relaxed">Reserve your seat for the live parenting workshop on Google Meet.</p>
        <div className="mt-7 max-w-md mx-auto">
          <CtaButton variant="light" subtitle="499 PKR · Includes 3 free bonuses">Reserve My Seat</CtaButton>
        </div>
      </div>
    </section>
  );
}
