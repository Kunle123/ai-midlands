import { AssistantScenario } from "./AssistantScenario";
import { IntegrationScenario } from "./IntegrationScenario";
import { OutreachScenario } from "./OutreachScenario";
import { SpreadsheetScenario } from "./SpreadsheetScenario";

export function BusinessAutomationVisual() {
  return (
    <div className="@container" aria-label="Examples of work AI Midlands can take on">
      <div className="flex flex-col gap-6 @min-[720px]:gap-7">
        <SpreadsheetScenario />
        <IntegrationScenario />
        <div className="grid grid-cols-1 gap-6 @min-[720px]:grid-cols-2 @min-[720px]:gap-5">
          <AssistantScenario />
          <OutreachScenario />
        </div>
      </div>
    </div>
  );
}
