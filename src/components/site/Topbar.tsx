import { Link } from "@tanstack/react-router";
import cpaLogo from "@/assets/cpa-logo.png";

export function Topbar() {
  return (
    <div className="w-full bg-topbar text-white text-xs">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2 flex flex-row items-center justify-between gap-2 sm:gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-grid place-items-center size-7 sm:size-8 rounded-full bg-white shrink-0 overflow-hidden">
            <img src={cpaLogo} alt="Confident Parent Academy" className="size-6 sm:size-7 object-contain" width={32} height={32} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-bold tracking-wide text-[11px] sm:text-sm" style={{ fontFamily: "var(--font-display)" }}>Confident Parent Academy</span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-medium text-white/70 uppercase">with Miss Samra Riaz</span>
          </span>
        </Link>

        <div className="flex flex-col items-end gap-0 leading-tight min-w-0">
          <span className="font-semibold text-[10px] sm:text-xs">Need Help?</span>
          <a href="mailto:hello@confidentparentacademy.com" className="underline text-[10px] sm:text-xs truncate max-w-[180px] sm:max-w-none">hello@confidentparentacademy.com</a>
        </div>
      </div>
    </div>
  );
}
