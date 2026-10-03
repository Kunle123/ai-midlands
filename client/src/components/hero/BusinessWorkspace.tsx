import { AssistantCard } from "./AssistantCard";
import { FlowCue } from "./Connectors";
import { CustomerRecord } from "./CustomerRecord";
import { EmailCard } from "./EmailCard";
import { InvoiceCard } from "./InvoiceCard";
import { SpreadsheetCard } from "./SpreadsheetCard";

export function BusinessWorkspace() {
  return (
    <div className="workspace" aria-label="Familiar business systems connected by automation">
      <div className="flow flow-admin">
        <EmailCard />
        <FlowCue direction="right" />
        <SpreadsheetCard />
      </div>
      <div className="flow flow-ops">
        <AssistantCard />
        <FlowCue direction="right" />
        <div className="flow-stack">
          <CustomerRecord />
          <FlowCue direction="down" />
          <InvoiceCard />
        </div>
      </div>
    </div>
  );
}
