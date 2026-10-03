import { AssistantCard } from "./AssistantCard";
import { Connectors } from "./Connectors";
import { CustomerRecord } from "./CustomerRecord";
import { EmailCard } from "./EmailCard";
import { InvoiceCard } from "./InvoiceCard";
import { SpreadsheetCard } from "./SpreadsheetCard";

export function BusinessWorkspace() {
  return (
    <div className="workspace-slot">
    <div className="workspace-fit">
      <section className="workspace" aria-label="Familiar business systems connected by automation">
        <Connectors />
        <EmailCard />
        <SpreadsheetCard />
        <AssistantCard />
        <CustomerRecord />
        <InvoiceCard />
        <div className="ai-node" aria-hidden="true">
          AM
        </div>
      </section>
    </div>
    </div>
  );
}
