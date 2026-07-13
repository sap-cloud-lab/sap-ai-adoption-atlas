(function () {
  "use strict";

  window.jouleAgentProductGuidance = {
    "Concur Expense": {
      icon: "receipt",
      role: "Expense administrator and finance controls owner for agent-assisted receipt, report, policy, and exception work in SAP Concur Expense.",
      activationChecks: [
        "Confirm that the exact agent is released for the customer's SAP Concur Expense entity, country or region, and production rollout cohort.",
        "Verify the feature's Base, Premium, Early Adopter Care, or other commercial status in the current SAP catalog and customer contract before enabling users.",
        "Complete the SAP-published Concur and Joule onboarding steps and test with the customer's real expense types, policy rules, and approval flow."
      ],
      integrationChecks: [
        "Validate employee, card, receipt, expense-type, policy, and approval data in SAP Concur before testing the agent; the agent should not compensate for incomplete configuration.",
        "Confirm any existing HR, card-provider, tax, or finance-system connections remain the supported systems of record and reconcile the agent result back to the expense report.",
        "Use only the document, receipt, and expense interfaces named in the agent's SAP Help setup; do not infer an API from the catalog description."
      ],
      authorizationChecks: [
        "Test separately with traveler, approver, auditor, processor, and administrator personas because their visible reports and permitted actions differ.",
        "Preserve SAP Concur group, cost-object, policy, and report permissions; do not grant a broad administrator role merely to make the agent work.",
        "Retain human review for submission, approval, audit, reimbursement, and exception decisions."
      ],
      architectureLabel: "SAP Concur Expense -> governed expense data and policy -> agent-assisted review -> human approval"
    },

    "Concur Travel": {
      icon: "plane",
      role: "Travel administrator and travel-program owner for personalized booking and meeting-planning assistance in SAP Concur Travel.",
      activationChecks: [
        "Confirm agent availability for the customer's SAP Concur Travel configuration, market, travel content, and rollout status.",
        "Verify Joule and agent entitlement against the customer contract, then follow the current SAP Concur onboarding guidance for the selected entity.",
        "Pilot with representative traveler profiles, company policies, routes, and booking scenarios before broad assignment."
      ],
      integrationChecks: [
        "Validate traveler profiles, company travel policy, preferred suppliers, budget controls, and the customer's configured travel content before testing recommendations.",
        "Confirm the existing travel-management-company, booking, profile, and expense handoffs continue to work through supported SAP Concur configuration.",
        "Treat availability and pricing as results from the configured travel ecosystem, and validate them again at booking time."
      ],
      authorizationChecks: [
        "Use the customer's SAP Concur identity and role model for travelers, arrangers, approvers, and travel administrators.",
        "Check that an arranger sees only travelers and profiles delegated to that arranger.",
        "Keep booking confirmation, policy exceptions, and spend approval with the authorized user or approver."
      ],
      architectureLabel: "SAP Concur Travel -> profile, policy and travel content -> Joule agent -> traveler confirmation"
    },

    "Joule": {
      icon: "sparkles",
      role: "Cross-application conversational entry point and orchestration layer for SAP-delivered capabilities and agents.",
      activationChecks: [
        "Confirm the connected SAP product, edition, release, region, language, agent availability, and commercial entitlement; a Joule label alone is not an activation decision.",
        "Use the current SAP for Me Business AI activation flow and the product-specific setup instructions shown for the selected tenant and feature.",
        "Assign a small pilot population and verify the capability appears in the intended embedded client before production rollout."
      ],
      integrationChecks: [
        "Include only SAP products supported in the customer's Joule formation and maintain one consistent user identity across those products.",
        "Validate each capability's context handoff, navigation target, business object, and write-back behavior in the source application.",
        "Use only SAP-documented destinations, trust, and integration steps for the capability; Joule does not make an unsupported product interface supported."
      ],
      authorizationChecks: [
        "Verify that Joule returns only business data and actions already permitted to the signed-in user in the connected application.",
        "Use least-privilege application roles and test positive, negative, and cross-organizational access cases.",
        "Require explicit user review or the source application's approval control for consequential transactions."
      ],
      architectureLabel: "Embedded SAP experience -> Joule on SAP BTP -> released capability or agent -> authorized source application"
    },

    "SAP Ariba Sourcing": {
      icon: "gavel",
      role: "Sourcing manager and category team for agent-assisted sourcing-event preparation, analysis, and controlled execution.",
      activationChecks: [
        "Confirm that the exact sourcing agent is available for the customer's SAP Ariba Sourcing realm and current release status.",
        "Verify the required Joule or Business AI commercial entitlement and complete the feature activation path published by SAP.",
        "Pilot with an approved event template, category, currency, supplier set, and sourcing policy before using live events."
      ],
      integrationChecks: [
        "Validate sourcing templates, questions, lots, bidding rules, supplier master data, commodity codes, currencies, and approval rules before relying on generated event content.",
        "Confirm any connected procurement or ERP master-data flow is already supported and reconciled; do not invent a direct interface for the agent.",
        "Trace recommendations back to the event data and retain the sourcing workspace as the system of record."
      ],
      authorizationChecks: [
        "Test with sourcing manager, project owner, team member, approver, and supplier-facing personas as applicable.",
        "Preserve realm permissions, team-member access, supplier visibility, and sealed-bid or competitive-event controls.",
        "Keep event publication, supplier invitation, award, and contract commitments under authorized human control."
      ],
      architectureLabel: "SAP Ariba Sourcing realm -> governed event and supplier data -> Joule agent -> sourcing approval"
    },

    "SAP CX AI Toolkit": {
      icon: "bot",
      role: "CX administrator and agent designer for SAP-delivered Customer Experience agent packages and governed channel automation.",
      activationChecks: [
        "Confirm the selected agent package, connected CX product, tenant, availability status, and package named on the current SAP catalog record.",
        "Verify Base or Premium entitlement and feature activation in the customer's SAP contract and SAP administration flow; do not treat 'Billable' or 'Non-Billable' catalog metadata as a full license determination.",
        "Configure and test the package in a non-production tenant with representative cases, knowledge, products, and channels before enabling autonomous steps."
      ],
      integrationChecks: [
        "Connect only the SAP CX applications, channels, mailboxes, knowledge sources, or commerce data explicitly required by the selected package's setup guide.",
        "Validate object mappings, routing rules, duplicate handling, error queues, and the handoff to a human service or sales user.",
        "Keep the connected SAP CX application as the system of record and document which steps read data, propose changes, or execute actions."
      ],
      authorizationChecks: [
        "Separate toolkit or package administration from the sales, service, and commerce users who consume the agent output.",
        "Use least-privilege technical identities for channel or system connections and rotate credentials through the supported administration mechanism.",
        "Test customer-data, territory, team, case, knowledge, and product visibility using real business-role restrictions."
      ],
      architectureLabel: "CX channel or event -> SAP CX AI Toolkit agent package -> connected CX business objects -> human handoff"
    },

    "SAP Field Service Management": {
      icon: "wrench",
      role: "Dispatcher, service planner, and field-service administrator for agent-assisted planning and dispatching.",
      activationChecks: [
        "Confirm agent availability for the customer's SAP Field Service Management tenant, region, release, and rollout status.",
        "Verify the current Business AI package or feature entitlement and follow the activation method displayed by SAP for that tenant.",
        "Pilot with a bounded service region, representative work orders, technicians, skills, calendars, and dispatch exceptions."
      ],
      integrationChecks: [
        "Validate service calls, activities, equipment, locations, skills, territories, calendars, travel assumptions, and priority rules before evaluating a dispatch proposal.",
        "Confirm the customer's existing ERP, asset, parts, and mobile integrations are healthy and supported; the agent should consume the resulting governed data, not bypass those connections.",
        "Test late changes, offline technicians, rejected assignments, duplicate events, and failed write-backs end to end."
      ],
      authorizationChecks: [
        "Separate dispatcher, planner, technician, supervisor, and administrator access in the test plan.",
        "Restrict visibility by company, branch, region, team, and service object according to the customer's SAP Field Service Management model.",
        "Require authorized confirmation for assignment changes that affect technicians, customers, safety, or service commitments."
      ],
      architectureLabel: "SAP Field Service Management -> service and workforce context -> Joule agent -> dispatcher-controlled assignment"
    },

    "SAP Intelligent Product Recommendation": {
      icon: "package-search",
      role: "Product specialist and sales or tender team for evidence-based product matching and recommendation.",
      activationChecks: [
        "Confirm that the selected agent is available for the customer's SAP Intelligent Product Recommendation tenant and commercial subscription.",
        "Complete the agent-specific initial setup published by SAP and confirm the supported input and output formats before loading production material.",
        "Pilot with a curated product range and a scored set of known tender or requirement examples."
      ],
      integrationChecks: [
        "Validate product attributes, units of measure, classifications, descriptions, language, and document quality before evaluating recommendations.",
        "Use the product and tender ingestion path documented for the solution; do not assume a direct ERP, CRM, or document-repository API.",
        "Record the source evidence and confidence or review outcome for each recommendation, and reconcile accepted results to the product system of record."
      ],
      authorizationChecks: [
        "Restrict product, tender, customer, and document access to the user's assigned business scope.",
        "Separate data administration and model or configuration duties from commercial approval.",
        "Keep final product selection, pricing, compliance, and tender submission with accountable business users."
      ],
      architectureLabel: "Governed product and tender content -> SAP Intelligent Product Recommendation -> ranked match -> expert decision"
    },

    "SAP LeanIX solutions": {
      icon: "network",
      role: "Enterprise architect and portfolio owner for research grounded in the governed SAP LeanIX workspace and approved content sources.",
      activationChecks: [
        "Confirm the assistant or agent is supported for the customer's SAP LeanIX solution, workspace, region, and license.",
        "Follow the current SAP LeanIX setup for the feature and verify any required workspace-level opt-in or administration setting.",
        "Pilot on a well-maintained domain with agreed research questions and an architect-reviewed expected answer set."
      ],
      integrationChecks: [
        "Improve fact-sheet ownership, lifecycle, relations, tags, data quality, and terminology before using the agent for portfolio conclusions.",
        "Approve any external or enterprise content sources explicitly and distinguish sourced facts from generated synthesis.",
        "Use only supported SAP LeanIX integrations and import mechanisms; reconcile accepted findings back to governed fact sheets."
      ],
      authorizationChecks: [
        "Preserve workspace roles, fact-sheet permissions, subscriptions, and restricted fields in both prompts and responses.",
        "Limit configuration and source-management privileges to the architecture administration team.",
        "Require an accountable architect to review lifecycle, risk, rationalization, and investment decisions."
      ],
      architectureLabel: "SAP LeanIX workspace and approved sources -> enterprise research agent -> cited synthesis -> architect review"
    },

    "SAP S/4HANA Cloud Private Edition": {
      icon: "server",
      role: "S/4HANA business-process owner, application lead, and security team for agent-assisted private-cloud transactions and insights.",
      activationChecks: [
        "Match the agent's minimum SAP S/4HANA release and feature-package requirement to the installed system and confirm the stated availability status.",
        "Complete the SAP-published Joule integration and agent setup for Private Edition, including documented prerequisites, corrections, and tenant activation.",
        "Test in a representative non-production system with the customer's configuration, extensions, workflows, and business data."
      ],
      integrationChecks: [
        "Document the embedded client, Joule formation, connected S/4HANA system, business objects, destinations, and any SAP-delivered communication setup used by the agent.",
        "Use only released interfaces and services named in the agent or product setup guide; custom code and legacy interfaces require a separate compatibility assessment.",
        "Test read, proposal, approval, write-back, error, retry, and rollback paths across the full landscape."
      ],
      authorizationChecks: [
        "Map each agent action to the user's existing PFCG or Fiori business roles, organizational restrictions, and relevant business-object authorization checks.",
        "Use least-privilege communication identities for any system-to-system step and keep credentials out of agent content.",
        "Retain workflow approval, segregation-of-duties controls, posting periods, and other application controls for financial or operational writes."
      ],
      architectureLabel: "S/4HANA Cloud Private Edition -> released business services -> Joule agent -> governed transaction or insight"
    },

    "SAP S/4HANA Cloud Public Edition": {
      icon: "cloud",
      role: "S/4HANA Cloud business-process owner, configuration expert, and IAM administrator for SAP-delivered in-app agents.",
      activationChecks: [
        "Confirm the agent against the customer's current SAP S/4HANA Cloud Public Edition release, country or region, scope, availability status, and commercial entitlement.",
        "Follow the exact initial-setup or activation instructions linked from the SAP catalog or Help page, including any documented feature activation and business-role changes.",
        "Validate first in the quality system with representative configuration and data before assigning production users."
      ],
      integrationChecks: [
        "Identify the in-app Joule entry point, released business objects, communication scenarios, workflows, and connected SAP services actually documented for the agent.",
        "Use released Public Edition APIs or events only when the agent setup explicitly requires them; do not infer a private API from an on-screen action.",
        "Test end-to-end with extensions, approval workflows, master data, posting periods, and error handling relevant to the business process."
      ],
      authorizationChecks: [
        "Map the agent's read and write operations to the required IAM business catalogs, business roles, spaces or pages, and organizational restrictions.",
        "Test restricted and unauthorized users as well as the happy path; access through Joule must not broaden access to the source business object.",
        "Keep workflow, posting, release, and segregation-of-duties controls in force for any proposed or executed transaction."
      ],
      architectureLabel: "S/4HANA Cloud Public Edition -> embedded Joule capability -> governed business object -> user or workflow approval"
    },

    "SAP Sales Cloud Version 2": {
      icon: "handshake",
      role: "Sales operations, account executive, and CX administrator for agent-assisted customer, opportunity, knowledge, and quote work.",
      activationChecks: [
        "Confirm the exact agent package is released for SAP Sales Cloud Version 2 and the customer's tenant, region, edition, and package entitlement.",
        "Activate the relevant Business AI or CX package through the current SAP process, then enable only the required users and client entry points.",
        "Pilot with representative accounts, opportunities, products, territories, knowledge, and approval scenarios."
      ],
      integrationChecks: [
        "Validate customer, contact, opportunity, product, pricing, activity, and knowledge data used by the selected agent.",
        "Connect mail, calendar, service, commerce, or back-end systems only when the package setup guide calls for that connection and the customer already governs it.",
        "Define human handoff, duplicate detection, error handling, and reconciliation for every proposed or created sales object."
      ],
      authorizationChecks: [
        "Preserve business roles, work-center access, sales-area or territory restrictions, team access, and object-level authorization.",
        "Separate package administration and technical connection privileges from day-to-day sales access.",
        "Require authorized review for customer communication, quote creation, pricing, discounts, and commitments."
      ],
      architectureLabel: "SAP Sales Cloud Version 2 -> CX agent package -> governed sales objects and knowledge -> seller review"
    },

    "SAP Service Cloud Version 2": {
      icon: "headphones",
      role: "Customer-service operations, case owner, and CX administrator for agent-assisted classification, knowledge, and resolution.",
      activationChecks: [
        "Confirm the selected package is released for SAP Service Cloud Version 2 and the customer's tenant, channels, region, and commercial entitlement.",
        "Complete the current Business AI or CX package activation and configure the feature according to its SAP Help initial-setup instructions.",
        "Pilot with a labelled set of representative cases, languages, priorities, channels, service levels, and escalation paths."
      ],
      integrationChecks: [
        "Validate case categories, routing rules, queues, service levels, customer records, installed products, and approved knowledge sources.",
        "Connect messaging, email, telephony, commerce, or back-end systems only through the supported integration already approved for the customer's service landscape.",
        "Test classification confidence, no-match handling, duplicate cases, failed actions, escalation, and human handoff."
      ],
      authorizationChecks: [
        "Preserve business roles, service-team or queue access, employee restrictions, customer-data visibility, and knowledge permissions.",
        "Use least-privilege technical identities for inbound channels and package connections.",
        "Keep customer-facing responses, case closure, refunds, credits, and other consequential actions under authorized human or workflow control."
      ],
      architectureLabel: "Service channel -> SAP Service Cloud Version 2 and CX agent package -> case or knowledge action -> human escalation"
    },

    "SAP Signavio Process Collaboration Hub": {
      icon: "users",
      role: "Process owner, workspace administrator, and process participant for guided process knowledge, onboarding, and screen assistance.",
      activationChecks: [
        "Confirm that the agent is available for the customer's SAP Signavio workspace, solution license, region, and stated Beta or generally available status.",
        "Follow the SAP Signavio Joule integration and agent-activation guidance for Base or Premium capabilities as applicable.",
        "Pilot with a curated process area, named owners, controlled user group, and explicit success measures for findability or onboarding time."
      ],
      integrationChecks: [
        "Validate published process content, dictionary entries, ownership, links, workspace structure, and user or license data before automating guidance or onboarding.",
        "Use supported SAP Signavio integrations and document-grounding options only when they are part of the selected scenario.",
        "Reconcile any workspace, user, role, or license change back to the administration record and retain a rollback path."
      ],
      authorizationChecks: [
        "Preserve workspace, folder, process, dictionary, and Collaboration Hub access restrictions.",
        "Limit user creation, license assignment, role assignment, and workspace administration to approved administrators.",
        "Test new joiner, process participant, modeler, approver, and workspace administrator personas separately."
      ],
      architectureLabel: "SAP Signavio workspace -> Joule agent -> governed process content or administration -> process-owner oversight"
    },

    "SAP Signavio Process Intelligence": {
      icon: "line-chart",
      role: "Process analyst, process owner, and transformation lead for agent-assisted analysis and value-case creation.",
      activationChecks: [
        "Confirm the agent's availability, workspace eligibility, solution license, and Base or Premium status for the customer's SAP Signavio tenant.",
        "Complete the SAP Signavio Joule integration and feature activation steps published for the selected agent.",
        "Pilot against a validated analysis with agreed KPIs, filters, process scope, cost assumptions, and known findings."
      ],
      integrationChecks: [
        "Validate source extraction, event-log semantics, case identifiers, activities, timestamps, attributes, currency, filters, and refresh timing before trusting an agent conclusion.",
        "Keep analysis definitions, process data, and value assumptions in governed SAP Signavio artifacts rather than only in the conversation.",
        "Trace generated findings and value cases to the relevant dashboard, analysis, metric, and editable assumption."
      ],
      authorizationChecks: [
        "Preserve workspace, process-data, analysis, dashboard, and attribute-level access restrictions.",
        "Limit data-source administration, transformations, and cost-model changes to accountable specialists.",
        "Require process-owner and finance validation before using an AI-generated value case for investment decisions."
      ],
      architectureLabel: "Process source data -> SAP Signavio Process Intelligence -> Joule analysis agent -> validated finding or value case"
    },

    "SAP SuccessFactors Employee Central": {
      icon: "contact",
      role: "HR process owner, people manager, and SuccessFactors administrator for employee-context grounding used by supported agents.",
      activationChecks: [
        "Confirm the exact agent is supported for the customer's SAP SuccessFactors release, data center, language, Employee Central scope, and commercial entitlement.",
        "Complete the current SAP Business AI activation and SuccessFactors AI administration steps, including user assignment and required terms.",
        "Pilot with synthetic or approved employee data and representative manager and employee populations before production use."
      ],
      integrationChecks: [
        "Validate person, employment, job, position, manager, organization, locale, and effective-dated data used to ground the agent.",
        "Confirm any recruiting, learning, performance, payroll, or identity connection already follows the supported SuccessFactors integration pattern.",
        "Test effective dates, concurrent employment, inactive users, missing managers, and cross-country data restrictions."
      ],
      authorizationChecks: [
        "Map each read or action to SuccessFactors Role-Based Permissions and target populations.",
        "Test employee, manager, HR partner, administrator, and proxy scenarios separately, including negative access cases.",
        "Treat employee and talent data as sensitive; minimize prompt content and retain workflow approval for HR decisions and changes."
      ],
      architectureLabel: "SAP SuccessFactors Employee Central -> role-permitted people context -> Joule agent -> employee or manager workflow"
    },

    "SAP SuccessFactors Performance and Goals": {
      icon: "target",
      role: "Employee, people manager, HR talent owner, and administrator for agent-assisted performance preparation and goal context.",
      activationChecks: [
        "Confirm the agent is supported for the customer's SuccessFactors release, data center, language, Performance and Goals configuration, and commercial entitlement.",
        "Activate the feature through the current SAP Business AI and SuccessFactors administration flow and assign only the intended pilot population.",
        "Pilot across representative goal plans, review forms, route maps, rating periods, job levels, and manager relationships."
      ],
      integrationChecks: [
        "Validate active goal plans, performance forms, competencies, route maps, rating scales, employee-manager relationships, and permitted supporting data.",
        "Confirm Employee Central or other talent-suite context is current and joined through supported SuccessFactors configuration.",
        "Test incomplete goals, changed managers, matrix relationships, inactive forms, multiple employments, and localization."
      ],
      authorizationChecks: [
        "Preserve Role-Based Permissions, target populations, form permissions, route-map steps, and field-level confidentiality.",
        "Test employee, direct manager, matrix manager, HR, and administrator views separately.",
        "Keep ratings, formal feedback, compensation consequences, and final performance decisions with authorized people and established workflows."
      ],
      architectureLabel: "Performance and Goals data -> Joule agent -> role-specific preparation -> employee and manager review"
    },

    default: {
      icon: "layers-3",
      role: "Business-process owner, product administrator, security lead, and adoption owner for the product that supplies the agent's business context.",
      activationChecks: [
        "Confirm the exact product, edition, release, region, language, availability status, and commercial entitlement in current SAP sources.",
        "Use the agent-specific SAP Help setup when it exists; if setup is not published, treat the item as discovery or controlled pilot scope rather than production-ready.",
        "Activate in non-production first and define measurable success, human ownership, support, and rollback before broad assignment."
      ],
      integrationChecks: [
        "Identify the authoritative business objects, source systems, supported connections, data quality controls, and read or write boundaries.",
        "Do not invent APIs, destinations, events, or technical services from a marketing description; use only SAP-published integration instructions.",
        "Test success, no-data, duplicate, stale-data, permission-denied, failed-action, retry, and human-handoff paths."
      ],
      authorizationChecks: [
        "Map the agent's reads and actions to existing application roles, organizational restrictions, and approval controls.",
        "Use least-privilege user and technical identities and test unauthorized as well as authorized personas.",
        "Retain human confirmation for material financial, employee, customer, safety, legal, or operational consequences."
      ],
      architectureLabel: "Authorized user -> SAP agent experience -> governed business context -> reviewed action in the system of record"
    }
  };

  window.jouleAgentSharedGuidance = {
    architecture: {
      summary: "SAP documents Joule as a multi-tenant application running in the SAP BTP Cloud Foundry environment. Its Fiori-compliant conversational client routes a signed-in user's request to supported capabilities and connected SAP applications; the source application remains authoritative for business data, authorization, and transactions.",
      checks: [
        "Draw the user and embedded client, Joule runtime, selected capability or agent, connected SAP product, governed data, and approval boundary as separate architecture elements.",
        "Use the product-specific setup guide to identify actual destinations and services; the catalog description is not an interface contract.",
        "Record which steps are informational, navigational, analytical, proposed transactions, or executed transactions and where human confirmation occurs."
      ],
      sourceUrls: [
        "https://help.sap.com/docs/joule/serviceguide/enable-joule-in-sap-products",
        "https://help.sap.com/docs/joule/serviceguide/authentication-of-requests"
      ]
    },
    identity: {
      summary: "For a Joule formation, SAP requires the integrated applications to use the same SAP Cloud Identity Services - Identity Authentication tenant and consistently represent the person with the same Global User ID. Joule uses SAP BTP authentication, while connected applications continue to enforce their own business authorizations.",
      checks: [
        "Establish and document trust between the SAP BTP subaccount, SAP Cloud Identity Services, the corporate identity provider, and every application in the formation.",
        "Validate Global User ID consistency and user provisioning in test and production; do not match users by an assumed email address alone.",
        "Test single sign-on, single logout, disabled users, role removal, leavers, and negative authorization cases."
      ],
      sourceUrls: [
        "https://help.sap.com/docs/joule/integrating-joule-with-sap/configure-trust-to-identity-authentication-tenant?locale=en-US",
        "https://help.sap.com/docs/joule/serviceguide/authentication-of-requests",
        "https://help.sap.com/docs/joule/serviceguide/user-administration-and-authentication"
      ]
    },
    activation: {
      summary: "SAP's current Business AI guidance starts package and feature activation in the SAP for Me Business AI dashboard. Depending on the feature, the guided flow can continue through SAP Central Business Configuration or an SAP support request; product-specific setup and user assignment still apply.",
      checks: [
        "Confirm package status, feature status, target tenant, customer number, responsible administrator, and assigned users before declaring the agent active.",
        "Follow the activation method displayed for that exact feature rather than copying another product's setup steps.",
        "Separate catalog visibility, commercial purchase, package activation, tenant feature activation, user assignment, and successful end-to-end testing in the rollout record."
      ],
      sourceUrls: [
        "https://help.sap.com/docs/joule/capabilities-guide/activating-business-ai-and-assigning-users?locale=en-US"
      ]
    },
    licensing: {
      summary: "SAP distinguishes Base AI included with eligible cloud subscriptions from Premium AI capabilities funded with AI Units or a product-specific package. Commercial treatment is feature- and contract-specific, so catalog labels such as Base, Premium, consumption-based, billable, or non-billable must be checked against the customer's order and SAP for Me.",
      checks: [
        "Confirm the underlying SAP product subscription, the selected agent or package entitlement, AI terms, user metric, AI Unit requirement, and production quantity with the customer's SAP commercial contact.",
        "Do not present a Beta entry, a blank commercial field, or a 'Non-Billable' direct-billing relationship as proof that no license or consumption charge applies.",
        "Estimate and monitor expected consumption for Premium scenarios, and record who owns renewal, balance, and expiry decisions."
      ],
      sourceUrls: [
        "https://www.sap.com/products/artificial-intelligence/pricing.html",
        "https://help.sap.com/docs/joule/capabilities-guide/activating-business-ai-and-assigning-users?locale=en-US"
      ]
    },
    monitoring: {
      summary: "SAP provides tenant-specific Joule Analytics for product, scenario, interaction, client, message, and conversation usage. Premium AI consumption and remaining AI Units are tracked in SAP for Me; these operational measures should be paired with product errors, human overrides, outcome KPIs, and support ownership.",
      checks: [
        "Baseline conversations, messages, active users, scenario mix, completion, handoff, rejection, and business outcome before expanding the pilot.",
        "Review Joule Analytics and SAP for Me consumption on an agreed cadence, with thresholds for cost, failed actions, low adoption, and unexpected access patterns.",
        "Maintain a product-specific incident path, release watch, regression suite, and rollback or feature-disable decision owner."
      ],
      sourceUrls: [
        "https://help.sap.com/docs/joule/serviceguide/joule-analytics-center",
        "https://www.sap.com/products/artificial-intelligence/pricing.html"
      ]
    },
    privacy: {
      summary: "SAP's Joule privacy guidance tells users to verify generated output and not submit sensitive personal data in the chat. Customers remain responsible for lawful purpose, data minimization, access, retention, notices, human review, and the product-specific privacy and security assessment.",
      checks: [
        "Classify prompt, conversation, grounding, business-object, employee, customer, and attachment data before rollout and document permitted and prohibited content.",
        "Review SAP's current data-processing, retention, retrieval, deletion, feedback, and continuous-improvement terms for the customer's tenant and consent choices.",
        "Provide user guidance, a human-verification step, an escalation route, and periodic checks that responses do not expose data outside the signed-in user's business scope."
      ],
      sourceUrls: [
        "https://help.sap.com/docs/joule/serviceguide/data-protection-and-privacy?locale=en-US"
      ]
    }
  };
}());
