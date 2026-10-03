import { AccountingInterface } from "./AccountingInterface";
import { Connectors } from "./Connectors";
import { CRMInterface } from "./CRMInterface";
import { MailInterface } from "./MailInterface";
import { SpreadsheetInterface } from "./SpreadsheetInterface";
import { WebsiteAssistant } from "./WebsiteAssistant";

export function BusinessWorkspace() {
  return (
    <div className="relative" aria-label="Everyday business systems working together">
      <div className="pointer-events-none absolute -left-8 top-4 hidden h-40 w-40 rounded-full bg-[#ffe4d2]/80 blur-3xl xl:block" />
      <div className="pointer-events-none absolute -right-6 bottom-6 hidden h-44 w-44 rounded-full bg-[#ffe8da]/70 blur-3xl xl:block" />

      <div className="relative hidden xl:grid xl:grid-cols-[minmax(0,0.9fr)_6.25rem_minmax(0,1.12fr)] xl:grid-rows-[auto_5.5rem_auto]">
        <div className="col-start-1 row-start-1 self-end">
          <MailInterface />
        </div>
        <div className="col-start-3 row-start-1 self-end">
          <SpreadsheetInterface />
        </div>
        <div className="col-start-2 row-start-2">
          <Connectors />
        </div>
        <div className="col-start-1 row-start-3 self-start">
          <WebsiteAssistant />
        </div>
        <div className="col-start-3 row-start-3 flex flex-col gap-3.5 self-start">
          <CRMInterface />
          <AccountingInterface />
        </div>
      </div>

      <div className="relative flex flex-col gap-4 xl:hidden">
        <MailInterface />
        <SpreadsheetInterface />
        <WebsiteAssistant />
        <CRMInterface />
        <AccountingInterface />
      </div>
    </div>
  );
}
