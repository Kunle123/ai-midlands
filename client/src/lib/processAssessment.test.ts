import { describe, expect, it } from "vitest";
import { buildAssessment, type ProcessDetails } from "./processAssessment";

const details: ProcessDetails = {
  trigger: "Email or shared inbox",
  systems: "Outlook, HubSpot and Xero",
  outcome: "Create or update a CRM record",
  frequency: "Daily",
};

const cases: Array<{ name: string; process: string; type: string; confidence?: "clear" | "needs-detail" }> = [
  { name: "email enquiry copied into CRM", process: "Each weekday we copy enquiry details from a shared inbox into the CRM, then send a follow-up email. It takes two hours a day and items can be missed.", type: "Enquiry-to-CRM hand-off" },
  { name: "web form to CRM", process: "Website enquiries are copied into Salesforce and assigned to a salesperson.", type: "Enquiry-to-CRM hand-off" },
  { name: "Gmail lead rekey", process: "A lead arrives by email and a person re-keys it into HubSpot.", type: "Enquiry-to-CRM hand-off" },
  { name: "customer email to Pipedrive", process: "We add customer enquiry details from Outlook into Pipedrive, then assign an owner.", type: "Enquiry-to-CRM hand-off" },
  { name: "CRM won deal to Xero", process: "When a deal is won in CRM, finance re-enters it into Xero to create an invoice.", type: "CRM-to-invoice workflow" },
  { name: "order to invoice", process: "A won order in Salesforce is copied into Sage to raise the customer invoice.", type: "CRM-to-invoice workflow" },
  { name: "HubSpot to QuickBooks", process: "We create a QuickBooks invoice after an opportunity is marked won in HubSpot.", type: "CRM-to-invoice workflow" },
  { name: "PDF application extraction", process: "We read PDF applications and enter the fields into a CRM record.", type: "Document-to-data capture" },
  { name: "email attachments to spreadsheet", process: "Staff copy details from email attachments and documents into an Excel tracker.", type: "Document-to-data capture" },
  { name: "receipt data capture", process: "We extract the date and totals from receipts and add the data to a finance spreadsheet.", type: "Document-to-data capture" },
  { name: "manager approval", process: "A request arrives by email and a manager must approve it before the team is notified.", type: "Approval and decision hand-off" },
  { name: "purchase sign-off", process: "Purchase requests need authorisation and a recorded decision from the budget owner.", type: "Approval and decision hand-off" },
  { name: "document sign-off", process: "We route a document to the right person for sign-off and record the decision.", type: "Approval and decision hand-off" },
  { name: "salesperson follow-up", process: "Sales staff use CRM context to draft a personalised follow-up email to a prospect.", type: "Sales follow-up preparation" },
  { name: "proposal follow-up", process: "After a proposal, we prepare an email using the opportunity details in CRM.", type: "Sales follow-up preparation" },
  { name: "account outreach prep", process: "The team checks contact and opportunity records before preparing sales outreach.", type: "Sales follow-up preparation" },
  { name: "shared inbox triage", process: "A shared inbox needs new emails categorised and routed to the right owner.", type: "Shared inbox routing" },
  { name: "team inbox assignments", process: "We triage and assign messages from a team mailbox to the right queue.", type: "Shared inbox routing" },
  { name: "priority routing", process: "Urgent emails in a shared inbox should be prioritised and forwarded to the on-call team.", type: "Shared inbox routing" },
  { name: "customer question assistant", process: "A website assistant answers common customer questions and offers a booking.", type: "Customer enquiry and response" },
  { name: "customer chat", process: "We want a chatbot to answer customer questions and escalate unclear requests.", type: "Customer enquiry and response" },
  { name: "booking assistant", process: "A customer asks about availability and an assistant books a suitable appointment.", type: "Customer enquiry and response" },
  { name: "weekly spreadsheet report", process: "Each Friday we combine several Excel sheets into a weekly report.", type: "Reporting and data consolidation" },
  { name: "CSV reconciliation", process: "We reconcile and combine CSV exports from three systems for a monthly report.", type: "Reporting and data consolidation" },
  { name: "unclear automation request", process: "We want to use AI to make the business more efficient.", type: "Process hand-offs to map", confidence: "needs-detail" },
];

describe("first-pass process assessment", () => {
  it("covers 25 common and ambiguous process descriptions", () => {
    expect(cases).toHaveLength(25);
  });

  it.each(cases)("classifies $name", ({ process, type, confidence = "clear" }) => {
    const context = process.includes("use AI to make the business more efficient") ? {
      trigger: "Not sure",
      systems: "Unknown",
      outcome: "Not sure",
      frequency: "Not sure",
    } : details;
    const result = buildAssessment(process, context);
    expect(result.processType).toBe(type);
    expect(result.confidence).toBe(confidence);
  });

  it("returns a neutral next step when structured details remain uncertain", () => {
    const result = buildAssessment("We have a process that needs improvement.", {
      trigger: "Not sure",
      systems: "Unknown",
      outcome: "Not sure",
      frequency: "Not sure",
    });
    expect(result.confidence).toBe("needs-detail");
    expect(result.complexity).toBe("To be confirmed");
    expect(result.price).toContain("To be confirmed");
  });
});
