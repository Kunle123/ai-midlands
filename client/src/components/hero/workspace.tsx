import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SoftCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative z-10 rounded-2xl border border-[#efe8e1] bg-white shadow-[0_14px_34px_-18px_rgba(23,32,51,0.32),0_1px_2px_rgba(23,32,51,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatusMark({
  tone,
  children,
}: {
  tone: "new" | "progress" | "won" | "sent";
  children: ReactNode;
}) {
  const tones = {
    new: "bg-[#e7f0ff] text-[#3d74d6]",
    progress: "bg-[#fff0e4] text-[#e07a32]",
    won: "bg-[#e5f6ec] text-[#1e9a52]",
    sent: "bg-[#e5f6ec] text-[#1e9a52]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-sans text-[11px] font-medium leading-none",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
