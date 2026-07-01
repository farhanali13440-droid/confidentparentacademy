export function Footer() {
  return (
    <footer className="bg-primary text-white/70 text-xs">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center space-y-4">
        <p className="text-base font-semibold text-white/90" style={{ fontFamily: "var(--font-display)" }}>
          Confident Parent Academy
        </p>
        <p className="max-w-2xl mx-auto">
          Calm, science-backed parenting guidance with Miss Samra Riaz, Clinical Psychologist &amp; Parent Counsellor.
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <a href="mailto:hello@confidentparentacademy.com" className="underline">hello@confidentparentacademy.com</a>
          <span className="hidden sm:inline">•</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="underline">Instagram</a>
          <span className="hidden sm:inline">•</span>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="underline">Facebook</a>
        </p>
        <p>
          <a href="#" className="underline mx-2">Privacy Policy</a>|
          <a href="#" className="underline mx-2">Terms &amp; Conditions</a>|
          <a href="#" className="underline mx-2">Disclaimer</a>
        </p>
        <p className="max-w-3xl mx-auto text-white/50">
          This site is not a part of the Facebook™ website or Facebook™ Inc.
          Additionally, this site is NOT endorsed by Facebook™ in any way.
          Facebook™ is a trademark of Facebook™, Inc.
        </p>
        <p className="text-white/50">© {new Date().getFullYear()} Confident Parent Academy — Miss Samra Riaz. All rights reserved.</p>
      </div>
    </footer>
  );
}
