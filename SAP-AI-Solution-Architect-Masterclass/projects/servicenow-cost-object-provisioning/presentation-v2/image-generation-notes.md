# Image generation notes

Mode: OpenAI built-in image generation.

Reference image role: visual style reference only. The supplied image was not edited.

## Slide 1 prompt

Create a clean 16:9 non-technical business-process slide titled “1. Ask Joule in ServiceNow to Create the Cost Center”. Show a ServiceNow ticket named “REQ0012345 — New Cost Center” already open. Show Joule as a panel inside the same ServiceNow screen. Present four numbered steps: ASK with the user message “Create the cost center using this ticket.”; REVIEW with Joule replying “I found the required fields. Please review the proposal.” and a proposal containing Company Code 1000, Controlling Area A000, Profit Center 4100 and Valid From 01.07.2026; APPROVE with an orange “APPROVE & CREATE” button and the safety caption “No SAP record exists before approval.”; CREATE with a green SAP S/4HANA Cloud result “COST CENTER 41001234 CREATED” and a return arrow “SERVICENOW TICKET UPDATED”. Footer: “ASK → REVIEW → APPROVE → CREATE”. Start with the existing ServiceNow ticket; do not show email intake or backend architecture. Use the supplied image only as a style reference.

## Slide 2 prompt

Create a clean 16:9 solution-architecture slide titled “2. Solution Architecture — Joule Initiates, Workflow Controls, SAP Executes”. Show five numbered layers with a solid controlled flow: ServiceNow + WalkMe; Joule + Joule Studio; an orange Human Approval gate; SAP Build Process Automation; SAP Integration Suite; SAP S/4HANA Cloud with “COST CENTER CREATED” and “PLAN / FORECAST LOADED”. Return the cost-center ID and status to the ServiceNow ticket. Below the flow, show SAP Business Data Cloud + Knowledge Graph as business context and analytics, not the transaction write path. Show Fortescue ChatGPT / Codex as optional support outside the runtime. Footer: “Joule starts the request. Human approval controls it. SAP APIs perform it.” Use the supplied image only as a style reference.

## Slide 3 prompt

Create a precise 16:9 technical-architecture slide titled “3. Technical Architecture — Governed Cost Center Provisioning”. Use five lanes: Experience; SAP Business AI; BTP Control Plane; Integration; SAP S/4HANA Cloud. Include ServiceNow Ticket, WalkMe + Joule Action Bar, Joule Studio Agent, required-field validation, human approval, SAP Build Process Automation, CAP + SAP HANA Cloud proposal staging, idempotency and approval evidence, SAP API Management with OAuth 2.0 / mTLS, SAP Integration Suite mapping/retry/callback, Destinations + Secrets, API_COST_CENTER with OData V4 / SAP_COM_0943 / A_CostCenter_2 / CreateValidityPeriod, API_FINPLANNINGDATA_SRV with SAP_COM_0087, and API_FINPLANNINGENTRYITEM_SRV read-back. Add a return arrow to update ServiceNow and Joule with the cost-center ID, a Business Data Cloud + Knowledge Graph context band, an IAS / Entra ID / least privilege / correlation ID / SAP Cloud ALM security rail, and a “NO LLM DIRECT WRITE” boundary. Footer: “The agent proposes. The approved workflow owns the transaction.” Use the supplied image only as a style reference.
