import { FlowMark, MiniWindow, ScenarioLabel } from "./workspace";

function ApprovalPath() {
  const steps = [
    { label: "AI Draft", emphasis: false },
    { label: "Review", emphasis: true },
    { label: "Approve", emphasis: false },
  ];

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 font-sans text-[12px]">
      {steps.map((step, index) => (
        <span key={step.label} className="inline-flex items-center gap-1.5">
          {index > 0 && (
            <span className="text-[#c2410c]" aria-hidden="true">
              →
            </span>
          )}
          <span
            className={
              step.emphasis
                ? "font-medium text-slate-900 underline decoration-[#c2410c] decoration-1 underline-offset-4"
                : "text-slate-500"
            }
          >
            {step.label}
          </span>
        </span>
      ))}
    </div>
  );
}

export function OutreachScenario() {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <MiniWindow title="Record">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6f1eb] font-sans text-[11px] font-medium text-[#9a3412]">
              SM
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[13px] font-medium leading-tight text-slate-900">Sarah Mitchell</p>
              <p className="mt-0.5 font-sans text-[12px] leading-tight text-slate-500">Operations Director · Acme Ltd</p>
            </div>
          </div>
        </MiniWindow>
        <div className="flex justify-center">
          <FlowMark direction="down" />
        </div>
        <MiniWindow title="Email draft">
          <p className="font-sans text-[11px] text-slate-400">To: Sarah Mitchell</p>
          <p className="mt-1.5 font-sans text-[12.5px] leading-snug text-slate-700">
            Sarah — congratulations on the installation. I can show how the paperwork would move through from here.
          </p>
        </MiniWindow>
      </div>
      <ApprovalPath />
      <ScenarioLabel>Automate personalised outreach</ScenarioLabel>
    </div>
  );
}
