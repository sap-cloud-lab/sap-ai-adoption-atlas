const architectureDetails = {
  "sap-business-ai": {
    type: "SAP portfolio layer",
    tooltip: "AI embedded in SAP processes, Joule experiences, agents, and customer-built solutions.",
    summary: "SAP Business AI brings AI into business processes, user experiences, and enterprise workflows.",
    role: "This top layer is where people experience AI through Joule, embedded capabilities, assistants, agents, and company-specific extensions.",
    example: "A finance user asks Joule to explain an unusual close variance and receives a grounded answer with the supporting business context.",
    availability: "Capabilities, supported products, languages, regions, and Base or Premium AI entitlements vary.",
    source: "https://www.sap.com/products/artificial-intelligence.html"
  },
  joule: {
    type: "SAP AI experience",
    tooltip: "SAP's AI experience for coordinating assistants, agents, insights, and actions in the flow of work.",
    summary: "Joule brings assistants and agents together in a conversational experience across supported SAP and connected non-SAP work.",
    role: "Joule sits above the business landscape. It interprets user intent, presents context, coordinates supported agents and skills, and returns results where people work.",
    example: "A procurement manager asks Joule to investigate a delayed order; Joule gathers context, invokes supported capabilities, and proposes the next action.",
    availability: "Supported products, capabilities, data centres, languages, and entitlements vary by customer landscape.",
    source: "https://help.sap.com/docs/joule/3fdd7b321eb24d1b9d40605dce822e84/what-is-joule"
  },
  "domain-agents": {
    type: "Portfolio grouping",
    tooltip: "Process-aware Joule Agents for finance, spend, supply chain, HR, and customer experience.",
    summary: "Domain agents reason over business context and coordinate multi-step work for a business function.",
    role: "These tiles group SAP-delivered and extensible agent scenarios by business domain. They are not five separately orderable platform products.",
    example: "A supply-chain agent assesses a material shortage, checks alternatives, and prepares a recommended response for approval.",
    availability: "Each individual agent has its own release status, product dependency, region, scope, and licensing requirements.",
    source: "https://www.sap.com/products/artificial-intelligence/ai-agents.html"
  },
  "embedded-ai": {
    type: "Capability grouping",
    tooltip: "AI delivered directly inside SAP applications and business processes.",
    summary: "Embedded AI supports predictions, recommendations, matching, summarisation, and automation inside SAP workflows.",
    role: "It keeps the AI interaction within the application and process where the work already happens. It is a capability class rather than a standalone product.",
    example: "An SAP application proposes a likely account assignment or summarises a case without the user leaving the business screen.",
    availability: "Feature coverage and Base or Premium AI entitlement vary by SAP application, edition, and release.",
    source: "https://www.sap.com/products/artificial-intelligence.html"
  },
  "custom-ai": {
    type: "Architecture grouping",
    tooltip: "Customer-built agents, applications, skills, and workflows created on SAP's AI platform.",
    summary: "Custom AI extends SAP-delivered capabilities for company-specific processes, data, policies, and integrations.",
    role: "Joule Studio, SAP AI Core, generative AI hub, SAP Document AI, APIs, and integration services can be combined to deliver the custom outcome.",
    example: "A company builds a finance-close agent that retrieves its own policy, drafts variance commentary, and routes the result for controller approval.",
    availability: "Custom AI is an architecture category, not a product or SKU. Every underlying service must be checked for entitlement and regional availability.",
    source: "https://www.sap.com/products/artificial-intelligence/ai-foundation-os.html"
  },
  "knowledge-graph": {
    type: "SAP semantic context capability",
    tooltip: "Connects enterprise data, processes, and relationships so AI can reason with SAP business context.",
    summary: "SAP Knowledge Graph gives Joule and agents business meaning instead of isolated records.",
    role: "It provides semantic and process context across business entities, relationships, policies, transactions, and APIs. Business Data Cloud supplies trusted data; Knowledge Graph supplies meaning and relationships.",
    example: "An agent can understand that a supplier, purchase order, goods receipt, invoice, company code, and approval policy are related parts of one process.",
    availability: "Graph content and supported SAP solutions evolve. Do not confuse this with the separate graph capability in SAP Integration Suite.",
    source: "https://www.sap.com/products/artificial-intelligence/knowledge-graph.html"
  },
  "business-data-cloud": {
    type: "SAP data product",
    tooltip: "A governed data foundation that unifies SAP data and connects third-party data with business meaning.",
    summary: "SAP Business Data Cloud provides trusted, AI-ready data and reusable business data products.",
    role: "It preserves business semantics while supporting data products, analytics, planning, data engineering, and grounding for AI and knowledge services.",
    example: "Finance and procurement data products provide harmonised measures and dimensions that an agent can use without rebuilding every extraction.",
    availability: "Requires appropriate subscriptions, formation setup, supported source systems, and regional availability.",
    source: "https://www.sap.com/products/data-cloud/what-is-sap-business-data-cloud.html"
  },
  "domain-data-products": {
    type: "Data product grouping",
    tooltip: "Curated business datasets packaged with semantics, metadata, documentation, and APIs.",
    summary: "Domain data products organise trusted business data for reuse across analytics, planning, and AI.",
    role: "Finance, spend, supply chain, HR, customer, and industry tiles illustrate domain-oriented data products made consumable through SAP Business Data Cloud.",
    example: "A finance data product exposes governed journal, company-code, and reporting semantics for an analytics or AI scenario.",
    availability: "The domains are illustrative. Actual catalogue content, source systems, lifecycle status, and entitlements vary.",
    source: "https://help.sap.com/docs/business-data-cloud/administering-sap-business-data-cloud/activating-data-packages"
  },
  "sap-applications": {
    type: "SAP portfolio grouping",
    tooltip: "SAP business systems where processes run, data originates, and governed AI actions execute.",
    summary: "SAP applications provide the business objects, process logic, events, APIs, and embedded experiences used by AI.",
    role: "The grouping covers Cloud ERP and finance, spend and Business Network, supply chain, human capital management, and customer experience solutions.",
    example: "An approved agent action updates a purchase requisition through a supported SAP API instead of writing directly to a database table.",
    availability: "Each application is licensed, deployed, configured, and AI-enabled separately.",
    source: "https://www.sap.com/products.html"
  },
  "non-sap-applications": {
    type: "External system grouping",
    tooltip: "Third-party and legacy systems connected as data sources, tools, agents, or action endpoints.",
    summary: "Non-SAP applications participate through supported APIs, events, connectors, MCP, A2A, or integration flows.",
    role: "This area shows the open enterprise landscape. Salesforce, Agentforce, Microsoft, ServiceNow, custom applications, and legacy systems are not bundled SAP products.",
    example: "A Joule scenario retrieves a ServiceNow request, validates SAP master data, and returns a governed status update through approved integrations.",
    availability: "Connectivity depends on each target product, connector, API, identity model, and customer licence.",
    source: "https://www.sap.com/products/technology-platform/integration-suite/what-is-sap-integration-suite.html"
  },
  "ai-foundation": {
    type: "SAP platform capability set",
    tooltip: "SAP's AI operating system for building, integrating, running, and governing enterprise AI.",
    summary: "AI Foundation combines development, model access, runtimes, lifecycle operations, document processing, and governance on SAP BTP.",
    role: "It supports SAP-delivered AI and customer-built agents and applications. The diagram expands the major technology experiences and services within this foundation.",
    example: "A team prototypes prompts in the generative AI hub, runs workloads through SAP AI Core, and manages the scenario through supported operational tools.",
    availability: "AI Foundation is an umbrella capability set, not a single BTP service instance. Packaging varies by service, BTP credits, and AI Units.",
    source: "https://www.sap.com/products/artificial-intelligence/ai-foundation-os.html"
  },
  "unified-ai-portal": {
    type: "SAP experience concept",
    tooltip: "A central entry point for accessing AI Foundation tools, services, and administration.",
    summary: "Unified AI Portal brings AI development, experimentation, deployment, operations, and governance experiences together.",
    role: "It reduces the need to navigate disconnected tools and presents a unified experience for AI Foundation capabilities.",
    example: "An AI practitioner enters one portal to find approved tools, build a scenario, and reach the relevant operational views.",
    availability: "Treat this as a unified experience rather than a separately orderable product. Public product-level provisioning information remains limited.",
    source: "https://learning.sap.com/courses/becoming-an-sap-btp-solution-architect/exploring-ai-foundation"
  },
  "joule-studio": {
    type: "SAP development environment",
    tooltip: "SAP's AI-first environment for building custom agents, applications, skills, and workflows.",
    summary: "Joule Studio supports low-code and pro-code development grounded in business context.",
    role: "It is the principal build experience for extending Joule and creating company-specific agents, apps, skills, and workflows across SAP and third-party systems.",
    example: "A solution architect defines an agent, its tools, the approval boundary, its SAP context, and the workflow used to deploy it.",
    availability: "Capabilities and entitlements are being introduced in phases. Validate the specific Joule Studio capability and region before planning delivery.",
    source: "https://www.sap.com/products/artificial-intelligence/joule-studio.html"
  },
  "ai-core": {
    type: "SAP BTP service",
    tooltip: "The scalable runtime and lifecycle service for predictive and generative AI workloads on SAP BTP.",
    summary: "SAP AI Core executes pipelines, serves models, manages deployments, and exposes standard lifecycle APIs.",
    role: "It is the operational runtime beneath many custom AI scenarios and provides the execution foundation used by the generative AI hub.",
    example: "A custom classification model is deployed, versioned, monitored, and exposed for application use through SAP AI Core.",
    availability: "Region, environment, service plan, quota, supported scenario, and model restrictions apply.",
    source: "https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/vector-search"
  },
  "generative-ai-hub": {
    type: "SAP AI Core capability",
    tooltip: "Governed access to supported foundation models, prompt lifecycle, grounding, and orchestration.",
    summary: "The generative AI hub lets developers explore models and integrate generative AI under enterprise controls.",
    role: "It extends SAP AI Core. Model execution, resource management, and operational control remain with SAP AI Core; the hub is not a separate runtime.",
    example: "A developer compares approved models, manages a prompt template, adds grounding, and calls the scenario from an application.",
    availability: "Supported models, features, regions, and commercial terms change over time and must be checked for the target subaccount.",
    source: "https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub"
  },
  "ai-launchpad": {
    type: "SAP BTP SaaS application",
    tooltip: "A control plane for managing AI scenarios across one or more connected AI runtimes.",
    summary: "SAP AI Launchpad provides operational views for executions, deployments, metrics, prompts, and generative AI activity.",
    role: "It manages scenarios across connected runtimes such as SAP AI Core. It does not itself include the underlying runtime capacity.",
    example: "An administrator reviews deployments and executions across multiple SAP AI Core resource groups from a central operational interface.",
    availability: "AI runtimes are not included in an AI Launchpad subscription; service plans, roles, and runtime connections are required.",
    source: "https://help.sap.com/docs/ai-launchpad/sap-ai-launchpad/what-is-sap-ai-launchpad"
  },
  "document-ai": {
    type: "SAP BTP service",
    tooltip: "Extracts and enriches information from structured and unstructured business documents.",
    summary: "SAP Document AI recognises fields from business documents and returns them for downstream workflows.",
    role: "It is the document-processing capability in AI Foundation. SAP Knowledge Graph has a different purpose: business meaning and relationships.",
    example: "An invoice is processed to identify the supplier, invoice number, amounts, dates, and line items before business validation.",
    availability: "Editions, APIs, document types, languages, and regions vary. Extracted data should be validated before critical use.",
    source: "https://help.sap.com/docs/SAP_DOCUMENT_AI/5fa7265b9ff64d73bac7cec61ee55ae6/what-is-sap-document-ai"
  },
  "ai-agent-hub": {
    type: "SAP governance capability",
    tooltip: "A registry and governance command centre for agents, models, and MCP servers.",
    summary: "SAP AI Agent Hub helps organisations discover, inventory, verify, and govern AI assets across SAP and third-party platforms.",
    role: "It governs agents and related AI assets; it is not the runtime that executes them. The dashed border signals phased or availability-sensitive capabilities.",
    example: "An architecture team records an agent's owner, purpose, connected models, tools, risk, verification status, and business outcome.",
    availability: "Availability is phased and can depend on SAP LeanIX entitlement or Early Adopter participation. Confirm current commercial scope.",
    source: "https://help.sap.com/docs/leanix/ea/ai-agent-hub"
  }
};

const architectureNodes = [...document.querySelectorAll("[data-node]")];
const filterButtons = [...document.querySelectorAll("[data-layer-filter]")];
const canvas = document.querySelector("[data-architecture-canvas]");
const inspector = document.querySelector("#architecture-inspector");
const inspectorBackdrop = document.querySelector("[data-inspector-backdrop]");
const inspectorClose = document.querySelector("[data-inspector-close]");
const tooltip = document.querySelector("#architecture-tooltip");

let activeNode = null;
let lastTrigger = null;

function initializeIcons() {
  if (!window.lucide) return false;
  window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  return true;
}

function setInspectorContent(button) {
  const detail = architectureDetails[button.dataset.node];
  if (!detail) return;
  const title = button.dataset.title || detail.title || button.textContent.trim().replace(/\s+/g, " ");
  document.querySelector("[data-inspector-type]").textContent = detail.type;
  document.querySelector("[data-inspector-title]").textContent = title;
  document.querySelector("[data-inspector-summary]").textContent = detail.summary;
  document.querySelector("[data-inspector-role]").textContent = detail.role;
  document.querySelector("[data-inspector-example]").textContent = detail.example;
  document.querySelector("[data-inspector-availability]").textContent = detail.availability;
  document.querySelector("[data-inspector-source]").href = detail.source;
}

function openInspector(button) {
  lastTrigger = button;
  activeNode?.classList.remove("is-selected");
  activeNode?.setAttribute("aria-expanded", "false");
  activeNode = button;
  activeNode.classList.add("is-selected");
  activeNode.setAttribute("aria-expanded", "true");
  setInspectorContent(button);
  inspector.setAttribute("aria-hidden", "false");
  inspector.removeAttribute("inert");
  document.body.classList.add("architecture-inspector-open");
  window.requestAnimationFrame(() => inspectorClose.focus());
}

function closeInspector({ restoreFocus = true } = {}) {
  document.body.classList.remove("architecture-inspector-open");
  inspector.setAttribute("aria-hidden", "true");
  inspector.setAttribute("inert", "");
  activeNode?.classList.remove("is-selected");
  activeNode?.setAttribute("aria-expanded", "false");
  activeNode = null;
  if (restoreFocus && lastTrigger) lastTrigger.focus();
}

function positionTooltip(button) {
  const detail = architectureDetails[button.dataset.node];
  if (!detail || window.matchMedia("(max-width: 620px)").matches) return;
  tooltip.textContent = detail.tooltip;
  tooltip.classList.add("is-visible");
  tooltip.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-describedby", tooltip.id);
  const rect = button.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const left = Math.max(12, Math.min(window.innerWidth - tooltipRect.width - 12, rect.left + rect.width / 2 - tooltipRect.width / 2));
  const placeAbove = rect.top > tooltipRect.height + 24;
  const top = placeAbove ? rect.top - tooltipRect.height - 10 : rect.bottom + 10;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${Math.max(12, top)}px`;
}

function hideTooltip(button) {
  tooltip.classList.remove("is-visible");
  tooltip.setAttribute("aria-hidden", "true");
  button.removeAttribute("aria-describedby");
}

architectureNodes.forEach((button) => {
  button.setAttribute("aria-expanded", "false");
  button.addEventListener("mouseenter", () => positionTooltip(button));
  button.addEventListener("mouseleave", () => hideTooltip(button));
  button.addEventListener("focus", () => positionTooltip(button));
  button.addEventListener("blur", () => hideTooltip(button));
  button.addEventListener("click", () => {
    hideTooltip(button);
    openInspector(button);
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const layer = button.dataset.layerFilter;
    filterButtons.forEach((item) => {
      const isActive = item.dataset.layerFilter === layer;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    canvas.dataset.focusLayer = layer;
    canvas.querySelectorAll("[data-layer]").forEach((item) => {
      item.classList.toggle("is-dimmed", layer !== "all" && item.dataset.layer !== layer);
    });
  });
});

inspectorClose.addEventListener("click", () => closeInspector());
inspectorBackdrop.addEventListener("click", () => closeInspector());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("architecture-inspector-open")) closeInspector();
});

if (!initializeIcons()) window.addEventListener("load", initializeIcons, { once: true });
