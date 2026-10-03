import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MiniWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-[#e3ddd4] bg-white shadow-[0_1px_1px_rgba(26,35,50,0.04),0_14px_30px_-22px_rgba(26,35,50,0.55)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-[#f0ebe4] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#eadfd4]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#eadfd4]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#eadfd4]" />
        <span className="ml-1.5 font-sans text-[11px] font-medium tracking-wide text-slate-500">
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export function ScenarioLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 font-sans text-[13px] font-medium leading-snug text-slate-600">
      {children}
    </p>
  );
}

export function FlowMark({
  direction = "right",
}: {
  direction?: "right" | "down";
}) {
  const vertical = direction === "down";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-[#c2410c]",
        vertical ? "py-0.5" : "px-0.5"
      )}
      aria-hidden="true"
    >
      <svg
        width={vertical ? 10 : 22}
        height={vertical ? 22 : 10}
        viewBox={vertical ? "0 0 10 22" : "0 0 22 10"}
        fill="none"
      >
        {vertical ? (
          <>
            <path d="M5 0 V16" stroke="currentColor" strokeWidth="1.25" />
            <path
              d="M1.5 13.5 L5 18 L8.5 13.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <path d="M0 5 H16" stroke="currentColor" strokeWidth="1.25" />
            <path
              d="M13.5 1.5 L18 5 L13.5 8.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </div>
  );
}
