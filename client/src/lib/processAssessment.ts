export type ProcessDetails = {
  trigger: string;
  systems: string;
  outcome: string;
  frequency: string;
};

export type Assessment = {
  title: string;
  summary: string;
  approach: string[];
  systems: string[];
  humanControl: string;
  complexity: "Starter" | "Connected" | "Bespoke" | "To be confirmed";
  price: string;
  timeframe: string;
  processType: string;
  confidence: "clear" | "needs-detail";
  context: ProcessDetails;
};

const systemMatchers: Array<[string, RegExp]> = [
  ["Email", /email|inbox|outlook|gmail/i],
  ["Spreadsheets", /spreadsheet|excel|csv|sheet/i],
  ["CRM", /crm|salesforce|hubspot|pipedrive/i],
  ["Finance", /invoice|finance|xero|quickbooks|sage|account/i],
  ["Website / forms", /website|web form|form|chatbot|customer enquiry/i],
  ["Calendar", /calendar|booking|appointment|meeting/i],
  ["APIs / internal systems", /api|erp|sap|internal system|database/i],
  ["Documents", /pdf|document|attachment|word file/i],
];

type ProcessKind = {
  id: string;
  label: string;
  match: (text: string) => boolean;
  title: string;
  summary: string;
  approach: string[];
  humanControl: string;
};

const processKinds: ProcessKind[] = [
  {
    id: "email-to-crm",
    label: "Enquiry-to-CRM hand-off",
    match: text => /(email|inbox|web form|enquir|lead)/.test(text) && /\bcrm\b|salesforce|hubspot|pipedrive/.test(text) && /cop(y|ies|ied)|re.?key|transfer|enter|add|create|update|record|hand.?off/.test(text),
    title: "This looks like an enquiry-to-CRM hand-off",
    summary: "The process appears to move enquiry details from an inbox or form into a CRM. The first step is to agree which fields to capture, how to match existing contacts, and when a person should approve the next action.",
    approach: [
      "Map the enquiry source and the fields the team needs to capture.",
      "Define how existing contacts and duplicate enquiries should be matched.",
      "Create or update the CRM record, with uncertain matches sent for review.",
      "Agree whether follow-up is prepared automatically or approved by the team.",
    ],
    humanControl: "Keep a person in the loop for uncertain matches and before any customer follow-up is sent.",
  },
  {
    id: "crm-to-invoice",
    label: "CRM-to-invoice workflow",
    match: text => /\bcrm\b|salesforce|hubspot|pipedrive/.test(text) && /invoice|billing|finance|xero|quickbooks|sage/.test(text) && /won|order|deal|opportunit|copy|re.?key|create|raise|send|transfer/.test(text),
    title: "This looks like a CRM-to-invoice hand-off",
    summary: "A sales or order event appears to trigger work in finance. The first step is to map the agreed fields, the invoice rules, and any checks that must happen before an invoice is created or sent.",
    approach: ["Agree the CRM event that starts the workflow.", "Map customer, product and pricing fields to the finance system.", "Define validation and exception handling for missing or mismatched data.", "Return the invoice reference to the originating record."],
    humanControl: "Keep approval before an invoice is issued wherever pricing, tax or contractual judgement is required.",
  },
  {
    id: "document-extraction",
    label: "Document-to-data capture",
    match: text => /pdf|attachment|document|form|receipt|statement|application/.test(text) && /extract|read|capture|copy|re.?key|enter|fields|data/.test(text) && /spreadsheet|excel|crm|database|system|record|table/.test(text),
    title: "This looks like document-to-data capture",
    summary: "Information is being read from documents and entered into a structured record. The first step is to identify the fields, the acceptable formats, and what should happen when a value is missing or uncertain.",
    approach: ["List the document types and required fields.", "Define validation rules and confidence thresholds.", "Prepare structured records and flag uncertain values for checking.", "Write approved data to the agreed system."],
    humanControl: "Have a person verify low-confidence or high-impact extracted values before they are committed.",
  },
  {
    id: "approval",
    label: "Approval and decision hand-off",
    match: text => /approv|authoris|authorize|sign.?off|decision/.test(text) && /email|form|request|document|workflow|manager|team|system|route|notify/.test(text),
    title: "This looks like an approval hand-off",
    summary: "A request needs to reach the right person, collect a decision, and leave a clear record of what happened. The first step is to map the approval rules, exceptions and audit trail.",
    approach: ["Define who can approve each type of request.", "Route requests with the information needed to decide.", "Record approval, rejection and any comments against the source item.", "Escalate overdue or incomplete requests."],
    humanControl: "The decision remains with the authorised person; automation can route, remind and record it.",
  },
  {
    id: "sales-follow-up",
    label: "Sales follow-up preparation",
    match: text => /prospect|sales|follow.?up|outreach|proposal/.test(text) && /crm|email|contact|opportunit|customer/.test(text) && /draft|prepar|personal|send|message|email/.test(text),
    title: "This looks like sales follow-up preparation",
    summary: "The team may be able to reduce the time spent gathering context and preparing follow-up. The first step is to map which CRM details matter and what should be drafted for review.",
    approach: ["Identify the event that prompts follow-up.", "Gather the relevant contact and opportunity context.", "Prepare a draft using approved rules and tone.", "Record the reviewed action in CRM."],
    humanControl: "A person reviews and sends external messages; the system should not send them blindly.",
  },
  {
    id: "shared-inbox-routing",
    label: "Shared inbox routing",
    match: text => /shared inbox|team inbox|mailbox|inbox/.test(text) && /route|assign|triage|categor|prioriti|forward|owner|queue/.test(text),
    title: "This looks like shared-inbox routing",
    summary: "Messages appear to need sorting and assignment before someone can act. The first step is to agree the categories, ownership rules and exceptions that determine where each message goes.",
    approach: ["Map the message types and urgency cues.", "Agree routing and ownership rules.", "Send unclear messages to a review queue.", "Track whether each item was assigned and handled."],
    humanControl: "Let a person review ambiguous, sensitive or urgent messages before routing or responding.",
  },
  {
    id: "customer-enquiry",
    label: "Customer enquiry and response",
    match: text => /chatbot|assistant|customer question|customer enquiry|website visitor|answer customer|answer questions|booking assistant/.test(text),
    title: "This looks like a customer enquiry and response workflow",
    summary: "A customer needs an answer and possibly a clear next step. The first step is to define which questions can be answered safely, what information the assistant can use, and when a person should take over.",
    approach: ["List the common questions and approved sources.", "Define when to answer, ask for more detail or hand off.", "Connect the agreed next step, such as a booking or CRM lead.", "Review conversation outcomes and exceptions."],
    humanControl: "Escalate unclear, sensitive or consequential requests to a person.",
  },
  {
    id: "reporting-data",
    label: "Reporting and data consolidation",
    match: text => /report|spreadsheet|excel|csv|combine|consolidat|reconcil|copy and paste/.test(text) && /data|file|system|table|sheet|report|record/.test(text),
    title: "This looks like reporting or data consolidation",
    summary: "Information is being collected or combined for a report or decision. The first step is to confirm the source data, the required output and the checks needed to trust it.",
    approach: ["Identify the source files or systems and fields that matter.", "Remove duplicate collection or unnecessary transfer steps.", "Automate collection and validation of the data.", "Prepare the output for review in the format the team already uses."],
    humanControl: "A person reviews the prepared output before it is circulated or used for a decision.",
  },
];

function complexityFor(text: string, systems: string[]): Assessment["complexity"] {
  const score =
    (/api|erp|sap|database|legacy|custom system/.test(text) ? 2 : 0) +
    (/multiple|several|three|four|five|across systems|integration/.test(text) ? 1 : 0) +
    (systems.length >= 3 ? 1 : 0) +
    (/sensitive|personal data|financial|regulated|confidential/.test(text) ? 1 : 0);
  return score >= 4 ? "Bespoke" : score >= 2 ? "Connected" : "Starter";
}

export function buildAssessment(process: string, details: ProcessDetails): Assessment {
  const processText = process.toLowerCase();
  const detailsText = `${details.trigger} ${details.systems} ${details.outcome} ${details.frequency}`.toLowerCase();
  const text = `${processText} ${detailsText}`;
  const matched = processKinds.find(kind => kind.match(processText)) ?? processKinds.find(kind => kind.match(detailsText));
  const systems = systemMatchers.filter(([, matcher]) => matcher.test(text)).map(([name]) => name);
  const detectedSystems = systems.length ? systems : ["Systems to confirm"];
  const complexity = complexityFor(text, systems);
  const needsDetail = !matched || details.trigger === "Not sure" || details.outcome === "Not sure";
  const processType = matched?.label ?? "Process hand-offs to map";
  const price = needsDetail ? "To be confirmed after mapping the process" : complexity === "Starter" ? "from £2,000" : complexity === "Connected" ? "from £3,500" : "scoped individually";
  const timeframe = needsDetail ? "confirmed after we understand the process and systems" : complexity === "Starter" ? "often 1–2 weeks once access and rules are agreed" : complexity === "Connected" ? "often 2–4 weeks, depending on system access and testing" : "confirmed after a short discovery and integration check";

  if (needsDetail) {
    return {
      title: "A useful first step is to map the hand-offs",
      summary: "I can’t identify a specific workflow confidently from these details yet. Before recommending a solution, map what starts the work, where information moves, and what should happen at the end.",
      approach: ["Write down the trigger and the first person or system involved.", "List the systems and information that pass between them.", "Agree the required outcome and how often the process runs.", "Then decide which steps are repeatable and where a person should review."],
      systems: detectedSystems,
      humanControl: "Keep decisions and exceptions with the people who understand the process until the rules are clear.",
      complexity: "To be confirmed",
      price,
      timeframe,
      processType,
      confidence: "needs-detail",
      context: details,
    };
  }

  return {
    title: matched.title,
    summary: matched.summary,
    approach: matched.approach,
    systems: detectedSystems,
    humanControl: matched.humanControl,
    complexity,
    price,
    timeframe,
    processType,
    confidence: "clear",
    context: details,
  };
}
