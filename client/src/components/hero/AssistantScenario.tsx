import { ScenarioLabel } from "./workspace";

export function AssistantScenario() {
  return (
    <div>
      <div className="overflow-hidden rounded-[10px] border border-[#e3ddd4] bg-white shadow-[0_1px_1px_rgba(26,35,50,0.04),0_14px_30px_-22px_rgba(26,35,50,0.55)]">
        <div className="flex items-center justify-between border-b border-[#f0ebe4] bg-[#faf8f5] px-3 py-2">
          <span className="font-sans text-[11px] text-slate-400">acme-installations.co.uk</span>
          <span className="font-sans text-[11px] font-medium text-slate-700">Ask a question</span>
        </div>
        <div className="space-y-3 px-3 py-3">
          <div className="max-w-[92%]">
            <p className="mb-1 font-sans text-[10px] font-medium tracking-wide text-slate-400">Customer</p>
            <div className="rounded-lg rounded-tl-sm bg-[#f4f1ec] px-3 py-2 font-sans text-[12.5px] leading-snug text-slate-800">
              Do you install in Birmingham?
            </div>
          </div>
          <div className="ml-auto max-w-[95%]">
            <p className="mb-1 text-right font-sans text-[10px] font-medium tracking-wide text-slate-400">Assistant</p>
            <div className="rounded-lg rounded-tr-sm border border-[#f0e4da] bg-white px-3 py-2 font-sans text-[12.5px] leading-snug text-slate-800">
              Yes. We're Midlands based and cover Birmingham. Would you like to arrange a call?
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-0.5">
            <span className="inline-flex items-center rounded-md bg-slate-900 px-2.5 py-1 font-sans text-[12px] font-medium text-white">
              Book a call
            </span>
            <span className="font-sans text-[12px] text-slate-600">New lead → CRM</span>
          </div>
        </div>
      </div>
      <ScenarioLabel>Customer service chatbots and AI assistants</ScenarioLabel>
    </div>
  );
}
