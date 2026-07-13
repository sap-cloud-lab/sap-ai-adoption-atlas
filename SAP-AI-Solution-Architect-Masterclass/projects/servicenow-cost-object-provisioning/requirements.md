# Governed AI Provisioning for Cost Centers and WBS Elements

Prepared for: Fortescue Metals Group  
Prepared date: 12 July 2026  
Document status: Initiation and target-state requirements  
Primary landscape assumption: SAP S/4HANA Cloud Public Edition  
Source request channel: ServiceNow, including requests created from email  
Primary approval principle: AI proposes; deterministic rules validate; a human approves; released APIs execute; read-back proves the result

![Complete target architecture](servicenow-cost-object-provisioning-architecture.png)

## 1. Executive decision

The requirement is feasible, but the safe architecture is not:

Email → ChatGPT or Codex → Joule → direct save in SAP.

The recommended architecture is:

Microsoft 365 email or ServiceNow portal → ServiceNow request → SAP Integration Suite and API Management → SAP Build Process Automation → governed AI extraction and validation → human approval → released SAP S/4HANA Cloud APIs → read-back reconciliation → ServiceNow closure and reporting.

Joule is the conversational experience and an optional way to initiate, inspect and approve the process. It is not the transaction database, the workflow system of record or a general public REST service that ServiceNow can call as if it were another API.

The architecture deliberately separates five responsibilities:

1. ServiceNow owns request intake and the requester-facing case.
2. AI extracts, classifies, summarizes and asks for missing information.
3. deterministic services validate all financial and project master-data values.
4. SAP Build Process Automation owns approvals, state, segregation of duties and recovery.
5. SAP S/4HANA Cloud owns the cost center, enterprise project, WBS elements and financial plan or budget entries.

The final create, plan-load and release actions must be exposed only to a controlled workflow service. The LLM or agent must not receive an unrestricted tool that can post arbitrary payloads to S/4HANA.

## 2. Corrections to the interpretation of the SAP demonstration

### 2.1 The ServiceNow demonstration is not email ingestion through Gemini

The referenced SAP lesson describes the Joule Action Bar, powered by WalkMe, appearing in a ServiceNow browser and using the context of the active page. This is an experience-layer overlay. It does not establish that SAP is reading an enterprise mailbox through Gemini, and it does not show ServiceNow calling a public Joule API.

The separate Google scenario describes Joule collaborating with a Google agent in a Gmail and BigQuery example. That is an agent-interoperability demonstration, not the design that Fortescue must copy for Outlook or ServiceNow.

The linked 2 minute 32 second asset is titled “Omnipresent Joule - Demo Recording (long version with custom action).” It moves across ServiceNow, Gmail and SAP and finishes with a custom action that saves an SAP purchase order. It is a product demonstration, not a published reference architecture. Nothing in the asset labels the email step as Gemini.

Official references:

- [Exploring Joule's Capabilities](https://learning.sap.com/courses/experiencing-sap-business-ai/exploring-joule-s-capabilities-1)
- [Integrating Joule with Non-SAP Applications](https://learning.sap.com/courses/setting-up-joule-across-your-organizational-system-landscapes/integrating-joule-with-non-sap-applications)
- [Enabling Interoperability for AI Agents](https://learning.sap.com/courses/boosting-ai-driven-business-transformation-with-joule-agents/enabling-interoperability-for-ai-agents)
- [SAP Omnipresent Joule demo page](https://www.sap.com/assetdetail/2025/07/b64d929c-117f-0010-bca6-c68f7e60039b.html)

### 2.2 Joule is extended into non-SAP applications

SAP states that it does not currently provide a general-purpose API that lets an arbitrary third-party application call Joule as a standalone AI service. The production design should therefore use one of these patterns:

| Requirement | Correct pattern |
|---|---|
| Show Joule while a user works in ServiceNow | WalkMe plus the Joule Action Bar |
| Let Joule retrieve or act on ServiceNow data | Joule Studio skill or agent calling an approved ServiceNow or BTP service |
| Let ServiceNow start the SAP provisioning process | ServiceNow outbound REST or webhook to API Management and SAP Build Process Automation |
| Let an external pro-code agent work with Joule | Joule Studio Bring Your Own Agent using A2A, subject to current availability and governance |
| Let a third party call a Joule Agent from outside SAP | Future Agent Gateway or approved availability; do not make this the MVP dependency |

SAP Architecture Center currently describes the inbound Agent Gateway as not generally available and the current architecture as primarily outbound from Joule to external agents. The MVP must therefore work without an external call into Joule.

Official references:

- [Code-Based Agents: Bring Your Own Agent](https://help.sap.com/docs/joule/joule-development-guide-ba88d1ec6a1b442098863d577c19b0c0/code-based-agents-bring-your-own-agent)
- [Build AI Agents on SAP BTP](https://architecture.learning.sap.com/docs/golden-path/ai-golden-path/build-and-deliver/build-ai-agents)
- [Joule Development Guide](https://help.sap.com/docs/JOULE/ba88d1ec6a1b442098863d577c19b0c0)

### 2.3 Codex and ChatGPT are not the production integration runtime

Codex can help the implementation team design, build, test and maintain the integration. An approved ChatGPT workspace may also support ad hoc analysis of a user's connected email. Neither interactive product should be treated as the durable event listener, message queue, workflow engine or SAP technical user.

If Fortescue chooses OpenAI for text extraction or classification, implement it as an enterprise service using an approved OpenAI API deployment or as an approved external agent. The service must use explicit schemas, least-privilege tools, logging, retention controls and a fixed interface to the BTP workflow. A personal ChatGPT conversation or a Codex desktop session must never be the dependency that makes a production ServiceNow request complete.

OpenAI references:

- [OpenAI API models and Responses API availability](https://developers.openai.com/api/docs/models)
- [OpenAI Codex use cases](https://developers.openai.com/codex/use-cases)

## 3. Recommended solution statement

Build a governed cost-object provisioning service on SAP BTP that receives a canonical request from ServiceNow, uses AI only to turn unstructured request text into a proposed structured record, validates the record against SAP configuration and business rules, obtains accountable human approval, and then uses released S/4HANA Cloud Public Edition APIs to:

- create a cost center;
- create an enterprise project and its WBS hierarchy;
- write approved forecast or budget data;
- verify the created master data and plan data;
- keep the project and WBS elements in Created status until activation approval;
- move the project or selected WBS elements to Released only after approval;
- update the ServiceNow ticket with all identifiers, status and errors; and
- preserve a complete audit trail across the request, AI proposal, validation, approval and execution.

## 4. Scope

### 4.1 In scope

- ServiceNow request and catalog-item intake.
- Requests created from inbound Microsoft 365 email.
- Optional direct Microsoft Graph intake only if there is no suitable ServiceNow email-to-request process.
- Extraction of cost-center, project, WBS, forecast and budget attributes from request text and attachments.
- Structured clarification back to the requester.
- Deterministic validation against SAP master data and Fortescue rules.
- Duplicate checking and idempotent processing.
- Cost-center proposal, approval and creation.
- Enterprise-project and WBS proposal, approval and creation.
- Project and WBS Created-to-Released lifecycle.
- Financial plan, forecast and relevant budget write-back.
- Plan-data read-back and reconciliation.
- ServiceNow status updates and exception routing.
- Joule as an optional conversational channel for status, clarification and approval.
- SAP Business Data Cloud and SAP Knowledge Graph as semantic and analytical context.
- Monitoring, audit, security, privacy and support requirements.

### 4.2 Out of scope for the first release

- Fully autonomous creation without a named human approver.
- Giving a general LLM unrestricted access to S/4HANA.
- Making ChatGPT, Codex or a user desktop session a production middleware component.
- Depending on an inbound Joule Agent Gateway before it is generally available and approved for Fortescue.
- Replacing the ServiceNow request system of record with Joule.
- Training a custom model on all corporate email.
- Reading an entire mailbox when a ServiceNow record already contains the relevant request.
- Automatic deletion of partially created SAP objects after a downstream failure.
- Guessing Fortescue controlling areas, company codes, cost-center categories, project profiles, planning categories, budgets or approvers.

## 5. Design principles

1. Structured form first. ServiceNow catalog variables should capture required fields wherever possible. AI handles residual unstructured text, not avoidable form design.
2. One intake record. If email already creates a ServiceNow request, consume the ServiceNow request rather than reading the mailbox again.
3. AI proposes. AI may extract, summarize, classify and ask questions. It may not be the authority for financial master-data values.
4. Rules validate. Every SAP identifier and every planning dimension is validated through a released read API, configuration table or approved rule.
5. Approval before irreversible change. No active cost center is created before approval. No project or WBS is released before approval.
6. Workflow owns state. SAP Build Process Automation holds the durable process state, retries, timers, escalations and audit trail.
7. APIs execute. Only released and tenant-approved SAP APIs perform writes.
8. Read-back proves success. An HTTP success response is not enough; the solution reads back the object and plan data.
9. No blind retry. A timeout is followed by a duplicate or existence check before any create request is repeated.
10. Business Data Cloud is context, not the transaction bus. Direct S/4HANA APIs remain authoritative for transactional confirmation.
11. Minimum necessary data. Only the ticket fields and attachments needed for this process are sent to an AI model.
12. Clean core. No direct table updates, screen scraping or unsupported automation for S/4HANA Cloud Public Edition.

## 6. Target architecture components

### 6.1 Experience and intake

#### Microsoft 365 and Outlook

Role:

- source of a request when a business user emails the service desk;
- source of attachments;
- optional source of request-thread updates.

Preferred implementation:

- let ServiceNow inbound email processing create or update the request;
- preserve the email as evidence on the ServiceNow record;
- do not create a second mailbox-ingestion pipeline unless there is a confirmed gap.

ServiceNow documents that inbound email actions or flows can create and update records and preserve attachments. [ServiceNow inbound email actions](https://www.servicenow.com/docs/r/platform-administration/c_InboundEmailActions.html)

#### ServiceNow

Role:

- external request system of record;
- catalog form and ticket number;
- requester identity;
- attachments and comments;
- fulfillment status and communications;
- initial validation and routing;
- optional ServiceNow-native approval if Fortescue decides that approval must remain there.

Recommended pattern:

- use a structured catalog item for Cost Center Request and Project or WBS Request;
- allow email to create a draft request, then direct the requester to complete missing structured variables;
- publish an outbound REST message or IntegrationHub action to the BTP API;
- store the BTP workflow instance ID and SAP object IDs back on the ticket.

Relevant sources:

- [Create a request from inbound email](https://www.servicenow.com/docs/r/service-management-for-the-enterprise/t_CreateARequestFromAnInboundEmail.html)
- [Outbound REST web service](https://www.servicenow.com/docs/r/api-reference/web-services/c_OutboundRESTWebService.html)
- [REST step in ServiceNow IntegrationHub](https://www.servicenow.com/docs/r/integrate-applications/integration-hub/rest-request-action-designer.html)

#### WalkMe and Joule Action Bar

Role:

- make Joule available while the user is in ServiceNow;
- use screen-level context to summarize the ticket or offer a next action;
- let the user ask, for example, “What information is missing?” or “Show the SAP proposal for this request.”

Boundary:

- the Action Bar is not the backend integration;
- screen context must not replace a signed, versioned request payload;
- the authoritative action still calls the BTP service.

Availability caution:

SAP release material in early 2026 still described the Joule Action Bar as Early Adopter Care. Fortescue must confirm current region, entitlement, AI Unit and contract availability before making it a mandatory user channel. The backend ServiceNow-to-BTP workflow works without the Action Bar and should remain the production dependency.

#### Joule

Role:

- conversational entry point;
- status query;
- clarification and missing-information dialog;
- presentation of a proposal;
- optional human confirmation;
- invocation of a governed workflow trigger through a deterministic skill.

Recommended user prompts:

- “Show the cost-center proposal for request REQ0012345.”
- “What required information is missing from REQ0012345?”
- “Submit the validated proposal for approval.”
- “Show the plan-load reconciliation for project PRJ000123.”
- “Release project PRJ000123 after approval.”

Joule must never accept a prompt such as “ignore the workflow and save this now.”

### 6.2 SAP Business AI

#### Joule Studio agent

Appropriate tasks:

- classify request as cost center, enterprise project, WBS change or unsupported;
- extract fields into a versioned schema;
- identify ambiguous or missing fields;
- summarize evidence;
- produce a plain-English proposal for the approver;
- compare request wording with validated master-data values;
- route to a deterministic skill.

Inappropriate tasks:

- invent a cost-center ID;
- choose a controlling area, company code, hierarchy, profit center or responsible person without an approved rule;
- choose a project profile or settlement design from model intuition;
- invent a planning category;
- generate replacement-scope fields for plan data;
- release a project because a user wrote “urgent” in the ticket.

#### Joule skill

Use deterministic Joule skills for:

- getRequest;
- validateProposal;
- submitProposalForApproval;
- getWorkflowStatus;
- getPlanReconciliation;
- requestRelease.

A skill is preferable to an agent for the actual process trigger because the path, inputs and outputs are fixed, auditable and repeatable.

#### Human in the loop in Joule

Joule Studio supports tool-level approval through human_approval_required and human_approval_prompt. Use this as an immediate conversational safety control where appropriate. The formal approval record should still be a durable workflow task in SAP Build Process Automation, My Inbox or SAP Task Center.

[SAP Joule Studio human-in-the-loop documentation](https://help.sap.com/docs/Joule_Studio/45f9d2b8914b4f0ba731570ff9a85313/7bd0afe3ce774b2dbef3c3c0114a39ec.html)

#### SAP AI Core and generative AI hub

Optional responsibilities:

- approved model access;
- prompt templates;
- data masking;
- content filtering;
- grounding;
- retrieval;
- observability of model calls.

The model could be an SAP-supported third-party model, including an OpenAI model where it is available in the approved SAP model catalog, or a separate Fortescue-approved OpenAI API deployment. Select one governed path. Do not send the same corporate request to multiple model platforms without a reason and approval.

AI Core is not the workflow engine and does not perform the S/4HANA transaction.

[SAP AI Core orchestration](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/orchestration-8d022355037643cebf775cd3bf662cc5)

#### SAP AI Agent Hub

Role:

- inventory and lifecycle governance for SAP and non-SAP agents;
- policy, ownership and observability;
- future governance of a Fortescue OpenAI agent exposed through A2A.

It does not replace API Management or process approval.

### 6.3 SAP BTP integration and control plane

#### SAP API Management

Role:

- expose one Fortescue provisioning API rather than raw S/4 endpoints;
- authenticate ServiceNow and Joule clients;
- validate payload schema;
- enforce quotas and threat protection;
- hide backend credentials;
- version API contracts;
- produce correlation IDs and usage logs.

Recommended external API operations:

- POST /cost-object-requests
- GET /cost-object-requests/{requestId}
- POST /cost-object-requests/{requestId}/submit
- POST /cost-object-requests/{requestId}/release-request
- GET /cost-object-requests/{requestId}/reconciliation

The external API must not expose a generic “call any S/4 URL” operation.

#### SAP Integration Suite: Cloud Integration

Role:

- receive ServiceNow requests;
- transform ServiceNow data into the canonical schema;
- perform schema and attachment metadata checks;
- enrich with requester and correlation identifiers;
- route to SAP Build Process Automation;
- call ServiceNow to update the request;
- implement transport-level retries and dead-letter handling;
- map between REST, OData and SOAP where needed.

SAP provides a ServiceNow receiver adapter for BTP-to-ServiceNow operations. ServiceNow-to-BTP initiation should use a ServiceNow outbound REST call or webhook to an HTTPS endpoint.

[SAP Integration Suite ServiceNow receiver adapter](https://help.sap.com/docs/integration-suite/sap-integration-suite/servicenow-receiver-adapter)

#### SAP Integration Suite: Advanced Event Mesh

Optional for the MVP; recommended when volume or resilience requires it.

Potential events:

- fortescue.costobject.requested.v1
- fortescue.costobject.validated.v1
- fortescue.costobject.approved.v1
- fortescue.costobject.created.v1
- fortescue.costobject.planloaded.v1
- fortescue.costobject.released.v1
- fortescue.costobject.failed.v1

Event Mesh decouples ServiceNow from a long-running workflow and supports replay. It must not be used as an ungoverned duplicate trigger.

#### SAP Build Process Automation

This is the recommended process-control authority.

Responsibilities:

- API or event trigger;
- durable request state;
- business rules and decisions;
- clarification tasks;
- approval routing;
- timers, reminders and escalation;
- actions that call validation and S/4 APIs;
- exception work queue;
- compensation decisions;
- process logs;
- publication of outcome events.

SAP documents API-triggered processes and approval forms, as well as the pattern in which an approved form is followed by an S/4 action.

- [Configure an API trigger](https://help.sap.com/docs/build-process-automation/sap-build-process-automation/configure-and-test-api-call-to-trigger-process)
- [Configure approval forms](https://help.sap.com/docs/build-process-automation/sap-build-process-automation/configure-forms-and-approval-forms)
- [Use actions after approval](https://help.sap.com/docs/build-process-automation/sap-build-process-automation/set-up-and-use-actions-with-sap-build-process-automation)

#### SAP Task Center or My Inbox

Role:

- durable approval task;
- named approver;
- approve, reject or request more information;
- delegation, due date and escalation;
- complete proposal and validation evidence;
- deep link to ServiceNow and the staging record.

#### SAP Cloud Application Programming Model and SAP HANA Cloud

Recommended when the workflow needs a robust draft and audit service.

Store:

- canonical request and schema version;
- original ServiceNow sys_id and ticket number;
- revision number;
- extraction output and confidence by field;
- validation results;
- proposed SAP payload;
- approval decisions;
- execution state;
- S/4 object identifiers;
- plan-load totals;
- reconciliation result;
- correlation and idempotency keys;
- model and prompt version;
- timestamps and error details.

The staging service is the draft location for a cost center because the S/4HANA cost-center CRUD API documents active create, read, update and delete operations, not a business-object draft.

#### Identity, destinations and secrets

Use:

- SAP Cloud Identity Services and IAS for SAP application identity;
- Entra ID federation according to Fortescue architecture;
- OAuth 2.0, mTLS or X.509 where supported;
- BTP Destination service;
- separate destinations for read, create, plan write and release;
- separate technical principals for production and non-production;
- no credentials in prompts, tickets, workflow context or source code.

### 6.4 SAP Business Data Cloud and semantic plane

SAP Business Data Cloud must be represented in the architecture, but it should not sit on the synchronous write path.

Use it for:

- trusted SAP and non-SAP data products;
- historical cost-center and project performance;
- semantic context through SAP Knowledge Graph;
- cross-domain reasoning for Finance, Projects, Procurement and Sales;
- duplicate-pattern analysis;
- ownership and organizational analytics;
- forecasting and scenario analysis;
- SAP Analytics Cloud planning and dashboards;
- post-implementation value tracking.

Do not use a potentially delayed BDC replication as proof that a just-created cost center or WBS exists. Verify directly against S/4HANA.

SAP describes Business Data Cloud as the unified data layer and SAP Knowledge Graph as the semantic bridge that gives Joule Agents business context.

- [Understanding Joule's Foundations](https://learning.sap.com/courses/introducing-joule/understanding-joule-s-foundations_da570a21-155e-43e9-bdf1-35b2bb010702)
- [SAP Business Data Cloud and Joule](https://news.sap.com/2025/02/sap-business-data-cloud-databricks-turbocharge-business-ai/)
- [New Joule Studio and enterprise-scale agentic development](https://news.sap.com/2026/05/new-joule-studio-enterprise-scale-agentic-development/)

### 6.5 SAP S/4HANA Cloud Public Edition transaction plane

#### Cost center

Authoritative product area:

- SAP S/4HANA Cloud Public Edition;
- Management Accounting and Margin Analysis;
- Manage Cost Centers.

Preferred write interface:

- API name: Cost Center;
- technical service: API_COST_CENTER;
- protocol: OData V4;
- communication scenario: Business Object Cost Center Integration, SAP_COM_0943;
- entity: A_CostCenter_2;
- recommended create operation: CreateValidityPeriod where appropriate, or POST A_CostCenter_2.

Do not confuse this with API_COSTCENTER_SRV, which SAP documents as Cost Center - Read (A2X).

Official references:

- [Cost Center API](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/36af0ae155c84a0fbd1973df76b3b0f5.html)
- [Cost Center operations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/2edc2360a51645f6a69e60bbdcc64e59.html)

Alternative bulk or legacy integration:

- CostCentreReplicationBulkRequest_In;
- asynchronous SOAP;
- SAP_COM_0179.

Use the OData V4 CRUD API for the interactive governed scenario unless tenant constraints dictate the bulk SOAP service.

#### Enterprise project and WBS elements

Authoritative product area:

- SAP S/4HANA Cloud Public Edition;
- Enterprise Portfolio and Project Management;
- Project Control - Enterprise Projects;
- Project Planning.

Interface:

- API name: Enterprise Project;
- technical service: API_ENTERPRISE_PROJECT_SRV_0002;
- runtime path: API_ENTERPRISE_PROJECT_SRV;v=0002;
- protocol: OData V2;
- communication scenario: Enterprise Project Integration, SAP_COM_0308.

Important operations:

- POST A_EnterpriseProject to create the project definition;
- POST A_EnterpriseProjectElement to create a WBS element;
- PATCH project and WBS entities for supported updates;
- POST ChangeEntProjProcgStatus with ProcessingStatus 10 to release a project;
- POST ChangeEntProjElmntProcgStatus with ProcessingStatus 10 to release an individual WBS element;
- create or update blocked functions for purchasing, time, staff expense, service posting and other expense posting.

Official references:

- [Create project definition](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/70d6833458c84c86bffb302becc51dac.html)
- [Create project element](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/4c442f1d8473499397f1eb57ec570f97.html)
- [Enterprise Project operations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/e3a1e6b27add49ee84c047a10b9ba06e.html)
- [Processing status for projects and WBS elements](https://help.sap.com/docs/SAP_S4HANA_CLOUD/f369b2eff700401494ba6e7c9a573288/d442899643f342e3af889580cbc2ad32.html)

#### Financial plan, forecast and budget

Authoritative storage:

- ACDOCP financial planning table in S/4HANA Cloud.

Write API:

- API_FINPLANNINGDATA_SRV;
- OData V2;
- communication scenario SAP_COM_0087;
- POST FinancialPlanData.

Read-back API:

- API_FINPLANNINGENTRYITEM_SRV;
- communication scenario SAP_COM_0087.

The write service supports account assignments including CostCenter and WBSElement. SAP also supports the Import Financial Plan Data app and SAP Analytics Cloud integrated planning.

Official references:

- [Financial Plan Data - Write](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/d5d7064aaedb4028aad85cab986053e7.html)
- [Financial planning architecture overview](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1cbcff7ccd35405ab445b223c1ab1588/f900a12c7abf4c91957478cd6f6e48e8.html)
- [Fields for financial plan data import](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1cbcff7ccd35405ab445b223c1ab1588/f1b2611c76d249ca97454a01c8b8086e.html)
- [Plan Data Scope](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1cbcff7ccd35405ab445b223c1ab1588/dd1d244504d44d928d3da20f710a7bd1.html)
- [Budgeting for projects](https://help.sap.com/docs/SAP_S4HANA_CLOUD/c56f622a2edf491b9f1b596b55587009/242195683a2641da805698d7d2f47915.html)

Critical warning:

FinancialPlanData uses aggregation-level and replacement-scope strings. When replacement scope is omitted, SAP can derive it from the aggregation level. A wrong scope can replace existing plan data. These fields must be fixed by a reviewed mapping and never generated by an LLM.

Standard budget categories include BUDGET01 for project budgeting and BUDGET02 for cost-center budgeting. They are not interchangeable with period-level forecast data:

- BUDGET01 replaces an annual, whole-project budget scope. A submission may carry the complete set of project/WBS budget rows, but it must not target only one WBS element or one period. WBSElement, FiscalPeriod/FiscalYearPeriod and CompanyCode must not be used as BUDGET01 replacement-scope fields.
- BUDGET02 replaces an annual cost-center budget scope. FiscalPeriod/FiscalYearPeriod must not be a BUDGET02 replacement-scope field.
- A forecast or ordinary plan category may support period and WBS granularity according to the tenant-approved category and mapping.

The Fortescue forecast category, fiscal-year handling, currencies, ledger, aggregation level and replacement policy must therefore be confirmed separately from BUDGET01 and BUDGET02 in the tenant.

## 7. End-to-end cost-center process

### 7.1 Intake

1. A user submits the ServiceNow catalog item or emails the approved service address.
2. ServiceNow creates or updates the request and assigns a unique sys_id.
3. Attachments are virus-scanned and classified.
4. ServiceNow calls the BTP provisioning API with the minimum required request data.
5. API Management assigns a correlation ID and validates the schema.

### 7.2 Proposal

6. Integration Suite maps the request to the canonical schema.
7. The AI service extracts candidate values and confidence for each field.
8. The service records the evidence span for each extracted value.
9. Missing or ambiguous mandatory fields produce a clarification task.
10. The requester updates the ServiceNow record or responds through Joule.

### 7.3 Deterministic validation

11. Validate controlling area.
12. Validate company code and relationship to controlling area.
13. Validate cost-center category.
14. Validate standard hierarchy area.
15. Validate profit center and company-code compatibility.
16. Validate responsible person against the approved directory or SAP value help.
17. Validate validity start and end dates.
18. Check that the proposed cost-center key conforms to Fortescue naming rules.
19. Check for an existing cost center and overlapping validity.
20. Validate plan category, currency, G/L accounts, periods and totals.

### 7.4 Approval

21. Build Process Automation produces a human-readable comparison:

- original request;
- extracted proposal;
- normalized values;
- validation evidence;
- duplicate check;
- planned forecast or budget totals;
- downstream impact;
- confidence warnings.

22. Route the task to the correct Finance master-data approver.
23. Approver can approve, reject or request more information.
24. Any material requester change creates a new proposal revision and invalidates the earlier approval.

### 7.5 Creation and plan load

25. On approval, call API_COST_CENTER.
26. Store the returned key and read the object back.
27. Compare every controlled field with the approved payload.
28. Classify the approved financial dataset as forecast/plan or BUDGET02 cost-center budget.
29. Post it using the reviewed category-specific mapping through API_FINPLANNINGDATA_SRV.
30. Read the plan data using API_FINPLANNINGENTRYITEM_SRV.
31. Reconcile forecasts by periods, G/L accounts, currencies, category and totals; reconcile BUDGET02 as the complete annual cost-center budget scope.
32. Update ServiceNow with cost center, status and evidence links.

### 7.6 Cost-center draft decision

The cost-center API does not document a draft operation. Therefore the preferred design is:

- hold the proposal in CAP and HANA Cloud;
- obtain approval;
- create the real cost center only after approval.

If Fortescue requires a second review after the plan is loaded, use a controlled two-gate variation:

1. Gate 1 authorizes creation of the real cost center.
2. Create the cost center with operational locks enabled and planning locks configured to allow the approved plan load.
3. Load and reconcile the plan.
4. Gate 2 authorizes activation.
5. Patch the operational locks off.

This is not a draft. It is a real master record and may replicate to downstream systems. The one-gate staging design is safer unless there is a confirmed business reason for the two-gate design.

## 8. End-to-end enterprise-project and WBS process

### 8.1 Proposal and validation

Validate:

- project type and whether this is an enterprise project, professional-services project or another object;
- project external ID and naming convention;
- project profile;
- company code, controlling area, responsible cost center and profit center;
- start and end dates;
- project currency;
- investment profile or revenue relevance where applicable;
- WBS hierarchy, parent-child relationships and ordinal positions;
- responsible organizations;
- blocked functions;
- availability-control profile;
- settlement requirements;
- plan and budget account assignments.

### 8.2 Gate 1: authorize creation

The first approval authorizes creation of the SAP project and WBS hierarchy. Without this approval, the proposal remains only in the BTP staging store.

### 8.3 Create in status Created

Call the Enterprise Project API in an ordered sequence: create the project definition first, read back its UUID, then create WBS elements parent-before-child through A_EnterpriseProjectElement. Use an OData `$batch` strategy only after tenant metadata and failure testing prove that its transaction and recovery behaviour is suitable. SAP's initial project processing status is Created, code 00.

Created status supports project planning. The project is not yet ready for execution, and commitments and actual costs are not posted as they are after release.

Apply blocked-function indicators where the business design requires additional protection.

### 8.4 Load forecast and budget

1. Classify the payload deterministically as forecast/plan, project budget or cost-center budget.
2. For forecast or ordinary plan data, post the approved WBS and period lines allowed by the tenant category.
3. For BUDGET01, submit and replace the complete annual project budget scope; do not process it as a single-WBS or single-period update.
4. For BUDGET02, submit and replace the annual cost-center budget scope; do not use period in the replacement scope.
5. Use a separate, reviewed aggregation and replacement-scope mapping for each data kind.
6. Run SAP validation and substitution rules.
7. Read back plan entries.
8. Reconcile forecasts by project, WBS, period, G/L account, category and currency; reconcile BUDGET01 by complete project and fiscal year; reconcile BUDGET02 by cost center and fiscal year.
9. Keep the project in Created status on any failure.

### 8.5 Gate 2: authorize release

The approval form must show:

- created project and WBS IDs;
- full hierarchy;
- plan and budget totals;
- validation messages;
- availability-control result where relevant;
- blocked functions;
- evidence of read-back;
- any differences from the original request.

On approval:

- call ChangeEntProjProcgStatus with ProcessingStatus 10 to release the whole project; or
- call ChangeEntProjElmntProcgStatus for selected WBS elements when partial release is the approved design.

Released status means the project or WBS is ready for execution and allows commitments and actual-cost postings. Releasing the project releases lower-level WBS elements that remain in Created status.

### 8.6 Failure behaviour

- If project creation succeeds and WBS creation partly fails, do not automatically delete the project.
- Keep the project in Created status and route the item to the exception work queue.
- If plan load fails, keep Created status and blocked functions.
- If release times out, read status before retrying.
- If ServiceNow update fails after SAP success, retry only the ServiceNow update.

## 9. Canonical request model

The canonical request must be versioned. A representative structure is:

    {
      "schemaVersion": "1.0",
      "requestId": "REQ0012345",
      "sourceSystem": "ServiceNow",
      "sourceRecordId": "service-now-sys-id",
      "requestRevision": 3,
      "requestType": "COST_CENTER | ENTERPRISE_PROJECT",
      "requester": {
        "userId": "employee-id",
        "email": "approved-business-email"
      },
      "costCenterProposal": {
        "costCenter": "proposed-key",
        "name": "name",
        "description": "description",
        "controllingArea": "value",
        "companyCode": "value",
        "category": "value",
        "standardHierarchyArea": "value",
        "profitCenter": "value",
        "responsiblePerson": "value",
        "validFrom": "YYYY-MM-DD",
        "validTo": "YYYY-MM-DD"
      },
      "projectProposal": {
        "project": "external-id",
        "projectDescription": "description",
        "projectProfile": "value",
        "projectCurrency": "AUD",
        "startDate": "YYYY-MM-DD",
        "endDate": "YYYY-MM-DD",
        "wbsElements": []
      },
      "planProposal": {
        "dataKind": "FORECAST | PLAN | PROJECT_BUDGET | COST_CENTER_BUDGET",
        "planningCategory": "tenant-confirmed",
        "ledger": "tenant-confirmed",
        "fiscalYear": 2027,
        "scopeMode": "PERIODIC | WHOLE_PROJECT_ANNUAL | COST_CENTER_ANNUAL",
        "replacementScopePolicy": "approved-policy-id",
        "lines": []
      },
      "attachments": [],
      "correlationId": "uuid",
      "idempotencyKey": "hash"
    }

The LLM may populate candidate values only. The validated payload must be a separate immutable object with validation status and evidence.

## 10. Minimum data requirements

### 10.1 Cost center

| Field | Source | Validation |
|---|---|---|
| Request ID | ServiceNow | Unique and immutable |
| Cost center external key | Form or numbering service | Naming, duplicate and validity check |
| Name and description | Request | Length and prohibited-content check |
| Controlling area | Form or rule | Released SAP value |
| Company code | Form or rule | Valid relationship to controlling area |
| Cost-center category | Form or rule | Approved Fortescue value |
| Standard hierarchy area | Rule or form | Exists and permitted |
| Profit center | Form or rule | Exists, valid and compatible |
| Responsible person | Form | Directory or SAP value validation |
| Validity dates | Form | Date policy and overlap check |
| Currency and country where required | Rule | SAP configuration |
| Forecast or budget category | Rule | Tenant-approved category |
| Forecast G/L accounts and periods | Forecast lines | Released values and open plan horizon |
| Cost-center budget scope | Budget dataset | Complete annual BUDGET02 scope; no period replacement field |

### 10.2 Enterprise project and WBS

| Field | Source | Validation |
|---|---|---|
| Project external ID | Form or numbering service | Naming and duplicate check |
| Project profile | Rule | Approved mapping by request type |
| Project description | Request | Length and content |
| Project dates | Request | Logical and policy check |
| Project currency | Rule or form | Company and profile compatibility |
| Responsible cost center | Form | Exists and valid for dates |
| Profit center | Form or rule | Exists and compatible |
| Project type | Form | Approved enterprise-project type |
| WBS external IDs | Form or numbering service | Unique and hierarchical |
| Parent WBS | Structured form | No cycles and correct parent |
| WBS dates | Request | Within project dates |
| Responsible organization | Form | Released value |
| Blocked functions | Rule | Policy-based |
| Forecast or plan lines | Attachment or form | Complete, balanced, period-valid and allowed by category |
| Project budget dataset | Attachment or form | Complete annual BUDGET01 project scope; not a single-WBS or period patch |
| Release scope | Approval | Whole project or explicit WBS list |

## 11. Functional requirements

### Intake and request management

- FR-001: The solution shall accept a ServiceNow request through a versioned HTTPS API.
- FR-002: The solution shall accept requests created from ServiceNow inbound email without separately reading the mailbox.
- FR-003: The solution shall preserve the ServiceNow sys_id, ticket number and request revision.
- FR-004: The solution shall reject unsupported request types without attempting an SAP write.
- FR-005: The solution shall quarantine or reject unsupported attachment types.
- FR-006: The solution shall update ServiceNow with the BTP workflow instance ID.

### AI proposal

- FR-010: The solution shall extract only fields defined by the canonical schema.
- FR-011: The solution shall record confidence and source evidence for every AI-extracted field.
- FR-012: The solution shall mark model-generated values as proposed, never validated.
- FR-013: The solution shall ask for clarification when a mandatory value is missing or ambiguous.
- FR-014: The solution shall never infer a financial identifier solely from similarity or model memory.
- FR-015: The solution shall treat ticket and attachment instructions as untrusted data.

### Validation

- FR-020: The solution shall validate all SAP identifiers through released APIs or approved reference tables.
- FR-021: The solution shall check duplicates before approval.
- FR-022: The solution shall repeat duplicate and validity checks immediately before creation.
- FR-023: The solution shall validate plan categories and replacement-scope policy.
- FR-024: The solution shall calculate and display forecast or budget totals before approval.
- FR-025: The solution shall reject a WBS hierarchy containing duplicate IDs, missing parents or cycles.
- FR-026: The solution shall persist all validation results and messages.

### Approval

- FR-030: The solution shall route the request to a named approver or approved group.
- FR-031: The solution shall support approve, reject and request-more-information outcomes.
- FR-032: The solution shall invalidate approval when controlled data changes.
- FR-033: The solution shall record approver identity, timestamp, comments and proposal revision.
- FR-034: The solution shall enforce separation between requester and approver where policy requires it.
- FR-035: The solution shall not auto-approve when a due date expires.
- FR-036: Joule confirmation, if used, shall call the same governed approval service.

### Cost-center execution

- FR-040: The solution shall keep a cost-center proposal outside S/4HANA before approval.
- FR-041: The solution shall create a cost center only after approval.
- FR-042: The solution shall use API_COST_CENTER under SAP_COM_0943 unless an approved exception selects the SOAP bulk service.
- FR-043: The solution shall read the cost center back and reconcile all controlled fields.
- FR-044: The solution shall not retry a timed-out create before checking whether the object exists.
- FR-045: The optional two-gate design shall use documented lock indicators and shall clearly state that the object is real, not draft.

### Project and WBS execution

- FR-050: The solution shall create the project and WBS only after Gate 1 approval.
- FR-051: The solution shall retain Created processing status until release approval.
- FR-052: The solution shall set approved blocked functions.
- FR-053: The solution shall load and reconcile plan or budget data before Gate 2.
- FR-054: The solution shall release only the approved project or WBS scope.
- FR-055: The solution shall store the result of every status-change call.

### Plan and budget

- FR-060: The solution shall use a reviewed mapping for aggregation level and replacement scope.
- FR-061: The LLM shall not compose or modify replacement-scope fields.
- FR-062: The solution shall use tenant-approved planning categories.
- FR-063: The solution shall classify each payload as forecast/plan, BUDGET01 project budget or BUDGET02 cost-center budget before building the API payload.
- FR-064: The solution shall read back posted plan entries.
- FR-065: The solution shall reconcile line counts and totals by relevant dimensions.
- FR-066: A failed plan load shall leave the cost center locked or the project and WBS in Created status.
- FR-067: BUDGET01 shall be validated and replaced as a complete annual project scope; WBSElement, FiscalPeriod/FiscalYearPeriod and CompanyCode shall not be replacement-scope fields.
- FR-068: BUDGET02 shall be validated and replaced as an annual cost-center scope; FiscalPeriod/FiscalYearPeriod shall not be a replacement-scope field.
- FR-069: Forecast and ordinary plan categories shall use their own tenant-approved period, WBS, ledger, currency and G/L-account rules.

### ServiceNow outcome

- FR-070: The solution shall post SAP object IDs and status back to ServiceNow.
- FR-071: The solution shall post a clear error and support reference on failure.
- FR-072: The solution shall preserve correlation IDs across ServiceNow, BTP and S/4HANA.
- FR-073: ServiceNow closure shall occur only after SAP read-back and reconciliation succeed.

## 12. AI and agent requirements

- AIR-001: The AI model shall return schema-constrained structured output.
- AIR-002: The prompt shall state that the source content is untrusted evidence, not system instruction.
- AIR-003: The agent shall have allowlisted tools only.
- AIR-004: The agent shall not possess raw S/4HANA credentials.
- AIR-005: Write-capable tools shall accept a workflow instance and approved payload reference, not arbitrary JSON.
- AIR-006: The service shall log model, prompt, policy and schema versions.
- AIR-007: The service shall retain field-level confidence and evidence.
- AIR-008: The service shall run regression evaluations against approved request examples.
- AIR-009: The service shall test prompt injection, hidden instructions and malicious attachments.
- AIR-010: A low-confidence or conflicting output shall route to clarification.
- AIR-011: No model output shall bypass deterministic validation.
- AIR-012: The model shall not decide the approver.
- AIR-013: The model shall not decide the release status.
- AIR-014: The model shall not decide planning replacement scope.
- AIR-015: Model data retention and residency shall comply with Fortescue policy and vendor terms.

## 13. Security and privacy requirements

- SEC-001: Use least-privilege communication arrangements and users.
- SEC-002: Separate read-only, cost-center-create, project-create, plan-write and release authorizations where practical.
- SEC-003: Use OAuth 2.0, mTLS or X.509 rather than basic authentication for production where supported.
- SEC-004: Store secrets only in approved BTP security material or secret services.
- SEC-005: Do not store secrets in ServiceNow work notes, AI prompts or logs.
- SEC-006: Apply API schema validation and payload-size limits.
- SEC-007: Apply attachment malware scanning.
- SEC-008: Redact personal and sensitive content that is not necessary for the model task.
- SEC-009: Preserve requester, approver and executor identities in the audit record.
- SEC-010: Enforce segregation of duties.
- SEC-011: Use separate DEV, TEST and PROD endpoints, credentials and destinations.
- SEC-012: Encrypt data in transit and at rest.
- SEC-013: Define retention and deletion for raw email, attachments, prompts, model outputs and audit records.
- SEC-014: Restrict BDC and Knowledge Graph access to authorized data products.
- SEC-015: Prevent data from one request or company context leaking into another.
- SEC-016: Require change control for prompt, policy, schema, mapping and API versions.

## 14. Non-functional requirements

- NFR-001 Availability: The API intake shall meet the agreed service availability.
- NFR-002 Durability: An accepted request shall not be lost if a downstream service is temporarily unavailable.
- NFR-003 Idempotency: Replaying the same request revision shall not create a duplicate SAP object.
- NFR-004 Performance: Initial acceptance and correlation ID should be returned quickly; long-running work shall be asynchronous.
- NFR-005 Scalability: The design shall support queue-based processing when volume increases.
- NFR-006 Auditability: Every material decision and external call shall be traceable.
- NFR-007 Explainability: The approver shall see where each proposed field came from.
- NFR-008 Recoverability: Operations teams shall be able to resume a failed process from a controlled checkpoint.
- NFR-009 Observability: Logs and metrics shall use the common correlation ID.
- NFR-010 Supportability: Support staff shall have a single process status view and runbook.
- NFR-011 Maintainability: Mappings and decision tables shall be configuration, not buried in prompts.
- NFR-012 Accessibility: Approval forms shall meet Fortescue accessibility standards.
- NFR-013 Data quality: Read-back differences shall block completion.
- NFR-014 Release safety: A project shall not be released if plan reconciliation has failed.

## 15. Idempotency and transaction design

Use an idempotency key derived from:

- source system;
- ServiceNow sys_id;
- request revision;
- object type;
- approved payload hash.

Maintain one execution ledger with:

- proposed key;
- SAP create request ID;
- API response;
- S/4 UUID;
- current lifecycle state;
- plan-load batch ID;
- release request ID.

The complete process is a saga, not one ACID transaction. Cost-center or project creation, plan write, release and ServiceNow update are separate commits.

Rules:

1. Check existence before create.
2. After timeout, check existence and the execution ledger.
3. Retry only when the prior outcome is proven absent.
4. Never retry release without reading current status.
5. Never auto-delete a created object as a generic rollback.
6. Route irrecoverable partial success to a named exception owner.

## 16. Approval model

### Cost center: recommended single gate

| Stage | State | Authority |
|---|---|---|
| Proposal | BTP draft only | Requester and data steward |
| Validated | No SAP write | Validation service |
| Approved | Approved payload immutable | Finance approver |
| Created | Active SAP cost center | Workflow technical executor |
| Plan loaded | Plan reconciled | Workflow |
| Completed | Ticket updated | Workflow |

### Cost center: optional two-gate model

| Stage | State | Authority |
|---|---|---|
| Gate 1 | Approve creation | Finance master-data approver |
| Created and locked | Real SAP object, operational locks on | Workflow |
| Plan loaded | Read-back reconciled | Workflow |
| Gate 2 | Approve activation | Business owner or controller |
| Activated | Approved locks removed | Workflow |

### Enterprise project and WBS: two gates

| Stage | State | Authority |
|---|---|---|
| Gate 1 | Approve project and WBS creation | Project control or Finance |
| Created | Processing status 00 | Workflow |
| Plan and budget loaded | Reconciled; not released | Workflow |
| Gate 2 | Approve release | Accountable project and Finance approvers |
| Released | Processing status 10 | Workflow |

## 17. Reporting and business-process consumers

The created objects and plan data support:

- Record-to-Report and Management Accounting;
- cost-center planning, forecast and plan-versus-actual reporting;
- Project Financial Control;
- enterprise-project planning and execution;
- Budget Availability Control where configured;
- Source-to-Pay when requisitions, purchase orders or supplier invoices use the cost object;
- Order-to-Cash or Project-to-Cash where project revenue, sales orders or billing use WBS elements;
- maintenance and capital-project processes where orders settle to the cost object;
- SAP Analytics Cloud planning and dashboards;
- Business Data Cloud data products, insight applications and Joule analytical questions.

The phrase “QDP” in the initiating discussion appears to be a Fortescue-specific or voice-transcribed label. It must be confirmed before it is represented as an SAP product or process. This document does not invent a definition for it.

## 18. Monitoring and operations

Monitor:

- ServiceNow request and outbound REST execution;
- API Management traffic, rejects and latency;
- Integration Suite message processing and dead letters;
- Event Mesh queue depth and replay;
- Build Process Automation instance, approval and action status;
- CAP staging and idempotency ledger;
- AI calls, policy blocks, confidence and evaluation quality;
- Joule skill or agent traces where licensed;
- S/4HANA communication messages and API errors;
- S/4 Application Interface Framework for relevant SOAP services;
- plan-load reconciliation;
- SAP Cloud ALM integration and business-process monitoring;
- ServiceNow update completion.

Key metrics:

- requests received;
- percentage submitted through structured forms;
- clarification rate;
- extraction accuracy by field;
- validation failure rate;
- duplicate detection rate;
- approval lead time;
- straight-through processing after approval;
- SAP create success;
- plan-load success;
- read-back mismatch rate;
- release success;
- mean time to recover;
- manual touches per request;
- number of blocked prompt-injection attempts.

## 19. Error catalogue

| Error | Required behaviour |
|---|---|
| Missing mandatory field | Return to requester; no SAP call |
| Low AI confidence | Human clarification; no guess |
| Invalid SAP value | Show exact validation error |
| Duplicate cost center or project | Stop and link existing object |
| Approval rejected | Close or return to draft based on reason |
| Approval expired | Escalate; never auto-approve |
| API timeout during create | Read SAP and execution ledger before retry |
| Partial WBS creation | Keep project Created; exception queue |
| Plan-write validation error | Keep locked or Created; correct and resubmit |
| Plan reconciliation mismatch | Block release and ticket closure |
| Release timeout | Read processing status before retry |
| ServiceNow update fails | Retry only ServiceNow update |
| Model service unavailable | Continue structured/manual path or queue |
| BDC unavailable | Transaction process continues; analytical context degrades gracefully |

## 20. Acceptance criteria

### Cost-center happy path

- A structured ServiceNow request creates one BTP workflow.
- All required values validate.
- The approver sees the source and proposal.
- No S/4 object exists before approval.
- One cost center is created after approval.
- Read-back equals the approved payload.
- Forecast or budget entries are posted and reconciled.
- ServiceNow contains the SAP key and success status.

### Cost-center duplicate and retry

- A repeated request revision does not create a second cost center.
- A simulated create timeout triggers a read, not an immediate duplicate POST.
- Existing cost-center validity overlap is detected.

### Project and WBS happy path

- Gate 1 creates one project and the correct WBS hierarchy.
- The project remains in Created status.
- Forecast or plan data is written to the correct permitted WBS and period assignments.
- BUDGET01, when requested, is loaded and reconciled as the complete annual project scope rather than as a single-WBS update.
- Read-back totals and scope match the approved dataset.
- Gate 2 changes the approved scope to Released.
- Commitments or actual postings are not enabled before release.

### AI safety

- Malicious ticket text cannot invoke a write tool.
- An invented profit center is rejected.
- A low-confidence project profile triggers clarification.
- The agent cannot alter the approved replacement-scope policy.
- A changed request revision invalidates the old approval.

### Security

- Requester cannot approve their own request when SoD applies.
- ServiceNow cannot call raw S/4 endpoints.
- Model logs do not contain unnecessary sensitive content.
- Non-production credentials cannot access production.

## 21. Implementation roadmap

### Phase 0: design validation and governance

Deliver:

- confirm S/4HANA edition, release and scope items;
- confirm enterprise-project object type;
- confirm communication scenarios SAP_COM_0943, SAP_COM_0308 and SAP_COM_0087;
- test all APIs in a non-production tenant;
- confirm planning categories and replacement-scope policy;
- approve security, privacy and retention;
- agree RACI and approval matrix;
- define ServiceNow catalog variables;
- decide SAP AI Core versus an approved external OpenAI API for extraction.

Exit condition:

- a manual signed test can create, read back and safely control one cost center and one project with WBS in non-production.

### Phase 1: deterministic cost-center MVP

Deliver:

- ServiceNow structured request;
- Integration Suite and API Management;
- CAP staging and idempotency;
- deterministic validation;
- Build Process Automation approval;
- API_COST_CENTER create and read-back;
- ServiceNow update;
- monitoring and runbook.

AI is optional in this phase. Prove the transaction and governance first.

### Phase 2: AI-assisted intake

Deliver:

- schema-constrained extraction;
- confidence and evidence;
- clarification loop;
- prompt-injection and regression evaluations;
- Joule status and submission skill.

### Phase 3: project, WBS, forecast and budget

Deliver:

- project and WBS hierarchy validation;
- Gate 1 creation;
- Created status and blocked functions;
- API_FINPLANNINGDATA_SRV integration;
- read-back reconciliation;
- Gate 2 release;
- exception handling.

### Phase 4: Business Data Cloud and advanced analytics

Deliver:

- relevant finance and project data products;
- SAP Datasphere semantic model;
- SAP Analytics Cloud dashboard;
- SAP Knowledge Graph grounding;
- duplicate and anomaly context;
- value-realization metrics.

### Phase 5: optional cross-agent interoperability

Deliver only after availability and governance approval:

- Fortescue external agent implemented with an approved OpenAI API;
- A2A endpoint;
- Joule BYOA integration;
- AI Agent Hub registration;
- external invocation through SAP Agent Gateway when generally available and approved.

## 22. RACI outline

| Activity | Requester | Finance master data | Project control | SAP BTP team | ServiceNow team | Security and AI governance |
|---|---|---|---|---|---|---|
| Submit request | R | I | I | I | A | I |
| Define mandatory fields | C | A | A | C | R | C |
| Validate finance values | I | A/R | C | C | I | I |
| Validate project and WBS | I | C | A/R | C | I | I |
| Approve cost center | I | A/R | I | I | I | I |
| Approve project creation and release | I | C | A/R | I | I | I |
| Operate BTP workflow | I | C | C | A/R | C | C |
| Operate ServiceNow intake | I | C | C | C | A/R | C |
| Approve model and data use | I | C | C | C | C | A/R |
| Support S/4 APIs | I | C | C | A/R | I | C |

## 23. Prerequisites and tenant decisions

Confirm before build:

1. SAP S/4HANA Cloud Public Edition tenant release and activated scope items.
2. Whether Fortescue uses enterprise projects, professional-services projects or another project model.
3. Communication arrangements for SAP_COM_0943, SAP_COM_0308 and SAP_COM_0087.
4. OAuth, X.509 and communication-user standards.
5. Cost-center numbering and hierarchy rules.
6. Project profile, type and WBS naming rules.
7. Cost-center and project approval matrix.
8. Forecast planning categories.
9. BUDGET01 and BUDGET02 use in the tenant.
10. Ledger, fiscal-year and currency rules.
11. Plan aggregation and replacement scope.
12. SAP substitution and validation rules for plan data.
13. Whether cost-center post-load review requires the two-gate locked design.
14. Joule Studio edition, region and entitlements.
15. WalkMe and Joule Action Bar availability in ServiceNow.
16. SAP Business Data Cloud formation, data products, Datasphere and SAP Analytics Cloud availability.
17. Approved OpenAI API or SAP AI Core model path.
18. Data classification, retention and model-usage approval.

## 24. Key risks and treatments

| Risk | Treatment |
|---|---|
| Demo is mistaken for product integration | Use documented architecture and validate entitlements |
| Raw email is incomplete | Structured ServiceNow form and clarification |
| LLM invents financial fields | Allowlist, validation and human approval |
| Cost center is treated as a draft | Stage outside S/4; clearly document optional lock pattern |
| Plan replacement scope overwrites data | Fixed reviewed mapping and narrow scope |
| Duplicate on timeout | Idempotency ledger and read-before-retry |
| Project is released too early | Created status, blocked functions and Gate 2 |
| BDC is put on critical write path | Direct S/4 API read-back |
| ChatGPT or Codex becomes shadow middleware | Approved deployed service only |
| Agent Gateway availability changes | Keep MVP independent; reassess later |
| Approval happens casually in chat | Durable BPA task remains authority |
| Partial success is auto-deleted | Exception queue and accountable remediation |
| ServiceNow and SAP status diverge | Correlation, reconciliation and status-repair job |

## 25. Recommended first technical spike

Use one synthetic non-production request and prove this exact chain:

1. ServiceNow or Postman sends the canonical request to API Management.
2. Build Process Automation creates an approval.
3. Approval triggers API_COST_CENTER in the S/4 test tenant.
4. The workflow reads the cost center back.
5. The workflow posts a narrowly scoped test plan line through API_FINPLANNINGDATA_SRV.
6. The workflow reads the plan line through API_FINPLANNINGENTRYITEM_SRV.
7. The workflow reconciles the result.
8. The workflow updates the synthetic ServiceNow ticket.
9. Repeat the same request and prove no duplicate is created.
10. Simulate a timeout and prove that the workflow reads before retrying.

Then repeat for an enterprise project with one WBS element:

1. create in status Created;
2. apply blocked functions;
3. load and reconcile test plan data;
4. obtain Gate 2 approval;
5. release to status Released;
6. confirm status by read-back.

## 26. Final architectural position

Fortescue can achieve this requirement with SAP Business AI, ServiceNow, SAP BTP, SAP Business Data Cloud and SAP S/4HANA Cloud Public Edition.

The safest and most supportable interpretation is:

- ServiceNow captures the request.
- Joule or an approved model helps understand it.
- Business Data Cloud and Knowledge Graph provide context.
- deterministic validation protects master and plan data.
- Build Process Automation obtains accountable approval.
- Integration Suite and API Management protect the interfaces.
- released S/4HANA APIs create and verify the objects.
- the enterprise project and WBS remain Created until approval to Release.
- Codex helps build and maintain the solution; it is not the production transaction engine.

The control sentence for the entire design is:

AI proposes. Rules validate. A human approves. SAP APIs execute. Read-back proves. Project release enables transactions.

## Appendix A: Official source register

### Joule and SAP Business AI

- [Exploring Joule's Capabilities](https://learning.sap.com/courses/experiencing-sap-business-ai/exploring-joule-s-capabilities-1)
- [Integrating Joule with Non-SAP Applications](https://learning.sap.com/courses/setting-up-joule-across-your-organizational-system-landscapes/integrating-joule-with-non-sap-applications)
- [Joule Studio Human in the Loop](https://help.sap.com/docs/Joule_Studio/45f9d2b8914b4f0ba731570ff9a85313/7bd0afe3ce774b2dbef3c3c0114a39ec.html)
- [Code-Based Agents](https://help.sap.com/docs/joule/joule-development-guide-ba88d1ec6a1b442098863d577c19b0c0/code-based-agents-bring-your-own-agent)
- [Build AI Agents on SAP BTP](https://architecture.learning.sap.com/docs/golden-path/ai-golden-path/build-and-deliver/build-ai-agents)

### Integration and workflow

- [SAP Integration Suite](https://help.sap.com/docs/integration-suite)
- [Build Integrations and APIs](https://help.sap.com/docs/integration-suite/sap-integration-suite/66e4e1b8982340a9b55d8ab38a7df7d1.html)
- [ServiceNow Receiver Adapter](https://help.sap.com/docs/integration-suite/sap-integration-suite/servicenow-receiver-adapter)
- [SAP Build Process Automation API trigger](https://help.sap.com/docs/build-process-automation/sap-build-process-automation/configure-and-test-api-call-to-trigger-process)
- [SAP Build approval forms](https://help.sap.com/docs/build-process-automation/sap-build-process-automation/configure-forms-and-approval-forms)

### S/4HANA Cloud APIs

- [Cost Center API](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/36af0ae155c84a0fbd1973df76b3b0f5.html)
- [Cost Center operations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/2edc2360a51645f6a69e60bbdcc64e59.html)
- [Create Project Definition](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/70d6833458c84c86bffb302becc51dac.html)
- [Create Project Element](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/4c442f1d8473499397f1eb57ec570f97.html)
- [Enterprise Project operations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/988903b47d7040f6ac4ec02e44bb58e4/e3a1e6b27add49ee84c047a10b9ba06e.html)
- [Project and WBS processing status](https://help.sap.com/docs/SAP_S4HANA_CLOUD/f369b2eff700401494ba6e7c9a573288/d442899643f342e3af889580cbc2ad32.html)
- [Financial Plan Data - Write](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1e3c2c0366834d1fb76461f439248880/d5d7064aaedb4028aad85cab986053e7.html)
- [Financial planning architecture](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1cbcff7ccd35405ab445b223c1ab1588/f900a12c7abf4c91957478cd6f6e48e8.html)
- [Plan Data Scope](https://help.sap.com/docs/SAP_S4HANA_CLOUD/1cbcff7ccd35405ab445b223c1ab1588/dd1d244504d44d928d3da20f710a7bd1.html)

### ServiceNow

- [Inbound email actions](https://www.servicenow.com/docs/r/platform-administration/c_InboundEmailActions.html)
- [Outbound REST](https://www.servicenow.com/docs/r/api-reference/web-services/c_OutboundRESTWebService.html)
- [ServiceNow approvals](https://www.servicenow.com/docs/r/build-workflows/workflow-studio/ask-approval-flow-designer.html)

### Business Data Cloud

- [Understanding Joule's Foundations](https://learning.sap.com/courses/introducing-joule/understanding-joule-s-foundations_da570a21-155e-43e9-bdf1-35b2bb010702)
- [SAP Business Data Cloud and Joule](https://news.sap.com/2025/02/sap-business-data-cloud-databricks-turbocharge-business-ai/)

## Appendix B: Visual assets

- `servicenow-cost-object-provisioning-architecture.png` is the authoritative implementation diagram and is generated by `render-architecture.ps1`.
- `servicenow-cost-object-provisioning-architecture-ai-concept.png` is a supplementary AI-generated presentation concept only.
- `visual-generation-notes.md` records the generation method, exact prompt and semantic caveat for the supplementary concept.
