import { MiniWindow, ScenarioLabel } from "./workspace";

function LinkBetweenSystems() {
  return (
    <div
      className="flex items-center justify-center py-1 @min-[720px]:col-span-3 @min-[720px]:col-start-2 @min-[720px]:px-1 @min-[720px]:py-0"
      aria-hidden="true"
    >
      <div className="hidden w-full items-center @min-[720px]:flex">
        <span className="h-px flex-1 bg-[#c2410c]" />
        <span className="mx-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c2410c]" />
        <span className="h-px flex-1 bg-[#c2410c]" />
      </div>
      <div className="flex flex-col items-center @min-[720px]:hidden">
        <span className="h-3 w-px bg-[#c2410c]" />
        <span className="my-0.5 h-1.5 w-1.5 rounded-full bg-[#c2410c]" />
        <span className="h-3 w-px bg-[#c2410c]" />
      </div>
    </div>
  );
}

export function IntegrationScenario() {
  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-1 @min-[720px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] @min-[720px]:gap-x-1">
        <MiniWindow title="CRM" className="@min-[720px]:col-start-1">
          <p className="font-sans text-[13px] font-medium leading-tight text-slate-900">Acme Ltd</p>
          <p className="mt-1 font-sans text-[12px] leading-tight text-slate-500">Installation</p>
          <p className="mt-2.5 flex items-center gap-1.5 font-sans text-[12px] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
            Status: Won
          </p>
        </MiniWindow>
        <LinkBetweenSystems />
        <MiniWindow title="Accounting" className="@min-[720px]:col-start-5">
          <p className="font-sans text-[13px] font-medium leading-tight text-slate-900">Invoice #1042</p>
          <p className="mt-1 font-sans text-[12px] leading-tight text-slate-500">Acme Ltd</p>
          <p className="mt-2.5 font-sans text-[13px] font-medium tabular-nums text-slate-800">£8,000</p>
        </MiniWindow>
      </div>
      <ScenarioLabel>Connect your systems</ScenarioLabel>
    </div>
  );
}
