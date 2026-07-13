const sources = [
  {
    name: "SAP Learning: Understanding the SAP Business AI Portfolio",
    type: "Portfolio",
    url: "https://learning.sap.com/courses/discovering-sap-business-ai/understanding-the-sap-business-ai-portfolio"
  },
  {
    name: "SAP Learning: Using the AI-Assisted Capabilities in the SAP Fiori Launchpad",
    type: "Fiori AI",
    url: "https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition/using-the-ai-assisted-capabilities-in-the-sap-fiori-launchpad"
  },
  {
    name: "SAP: S/4HANA Cloud Public Edition, Analytical Business Insights",
    type: "Finance",
    url: "https://www.sap.com/products/erp/s4hana-cloud-public-edition-analytical-business-insights.html"
  },
  {
    name: "SAP Learning: Exploring the Generative AI Hub",
    type: "BTP",
    url: "https://learning.sap.com/courses/discovering-sap-s-generative-ai-hub/exploring-the-generative-ai-hub"
  },
  {
    name: "SAP Learning: Describing AI Foundation Capabilities",
    type: "AI Foundation",
    url: "https://learning.sap.com/courses/positioning-sap-business-ai/describing-ai-foundation-capabilities"
  },
  {
    name: "SAP Learning: 2608 Early Release Series",
    type: "Release",
    url: "https://learning.sap.com/products/s4hana-cloud/early-release-series"
  },
  {
    name: "SAP: Business AI Pricing",
    type: "Commercial",
    url: "https://www.sap.com/products/artificial-intelligence/pricing.html"
  },
  {
    name: "SAP Help: Enabling AI-Assisted Smart Summarization",
    type: "Help",
    url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/4fc8d03390c342da8a60f8ee387bca1a/4a69b2cc611a40c4bf5afb42fa016e0e.html"
  }
];

const capabilities = [
  {
    id: "smart-summarization",
    name: "AI-assisted smart summarization",
    category: "Embedded SAP app AI",
    layer: "consume",
    publicCloud: "Ready where the tenant release, app type, IAM app, catalog, and entitlement are active.",
    privateCloud: "Candidate pattern. Validate release, SAP Help scope, embedded AI enablement, and commercial terms.",
    release: "available",
    commercial: "validate",
    access: "Fiori object pages and SAP Fiori launchpad AI UI features",
    anchor: "IAM app F7924_SUM_TRAN or catalog SAP_CORE_BC_AIU_SUM_PC",
    summary: "Generates concise natural-language summaries from supported SAP Fiori elements object pages.",
    adoption: [
      "Start with read-only object pages that already have strong business context.",
      "Assign the AI UI feature authorization to a small pilot group.",
      "Test summary quality against real examples and define user feedback handling.",
      "Document where generated text can be copied, shared, or used in customer-facing communication."
    ],
    checks: [
      "Confirm supported app type and object page.",
      "Check data privacy, role-based access, and audit expectations.",
      "Validate whether customer entitlement includes the feature or requires additional commercial setup."
    ],
    source: sources[1].url
  },
  {
    id: "easy-filter",
    name: "AI-assisted easy filter",
    category: "Embedded SAP app AI",
    layer: "consume",
    publicCloud: "Ready where enabled for SAP Fiori elements list report apps.",
    privateCloud: "Candidate pattern. Validate release and supported app scope.",
    release: "available",
    commercial: "base",
    access: "Fiori list report natural-language filter entry",
    anchor: "IAM app F8552_TRAN or catalog SAP_CORE_BC_AIU_FIL_PC",
    summary: "Lets users describe filter intent in natural language and have the app propose filter values.",
    adoption: [
      "Choose high-volume list report apps where users already struggle with complex filters.",
      "Create example prompts by role, such as overdue items, high priority items, and month-end exceptions.",
      "Compare generated filters with manual variants during the pilot."
    ],
    checks: [
      "Confirm app support and business role assignment.",
      "Train users to inspect filter chips before executing the query.",
      "Record prompt examples that work reliably for customer-specific terminology."
    ],
    source: sources[1].url
  },
  {
    id: "error-explanation",
    name: "AI-assisted error explanation",
    category: "Embedded SAP app AI",
    layer: "consume",
    publicCloud: "Ready where available for Fiori elements and Web Dynpro ABAP applications.",
    privateCloud: "Candidate pattern. Validate release, supported UI technology, and help scope.",
    release: "available",
    commercial: "base",
    access: "Error message explanation panel",
    anchor: "IAM app F8553_TRAN or catalog SAP_CORE_BC_AIU_EXP_PC",
    summary: "Turns selected SAP error messages into natural-language resolution guidance for business users.",
    adoption: [
      "Start with high-frequency business errors in test or training systems.",
      "Compare AI guidance against support scripts and configuration constraints.",
      "Use it to reduce first-line support load before expanding to wider user groups."
    ],
    checks: [
      "Verify messages do not reveal restricted configuration or sensitive data to unauthorized users.",
      "Make sure users know it is guidance, not an override of support or compliance controls.",
      "Track whether the guidance reduces repeat incidents."
    ],
    source: sources[1].url
  },
  {
    id: "smart-personalization",
    name: "Smart personalization for My Home insights",
    category: "Embedded SAP app AI",
    layer: "consume",
    publicCloud: "Ready where My Home and insights card personalization are enabled.",
    privateCloud: "Candidate pattern. Validate scope and release.",
    release: "available",
    commercial: "base",
    access: "My Home insights card personalization",
    anchor: "IAM app F8555_TRAN or catalog SAP_CORE_BC_AIU_PER_PC",
    summary: "Uses natural language to help users add relevant insights cards to the SAP Fiori My Home page.",
    adoption: [
      "Create role-based starter prompts for finance analysts, buyers, planners, and managers.",
      "Curate a small set of recommended cards before asking users to personalize.",
      "Review adoption by role and remove low-value cards from guidance."
    ],
    checks: [
      "Confirm My Home is part of the customer launchpad adoption.",
      "Validate authorization for the underlying analytical content.",
      "Avoid promoting cards that expose metrics outside the user's business role."
    ],
    source: sources[1].url
  },
  {
    id: "smart-app-finder",
    name: "Smart app finder",
    category: "Embedded SAP app AI",
    layer: "consume",
    publicCloud: "Ready where available in the SAP Fiori launchpad.",
    privateCloud: "Candidate pattern. Validate release and launchpad scope.",
    release: "available",
    commercial: "base",
    access: "Fiori launchpad app discovery",
    anchor: "IAM app F8818_TRAN or catalog SAP_CORE_BC_AIU_PRO_PC",
    summary: "Helps users discover relevant SAP Fiori apps through natural-language app search.",
    adoption: [
      "Use during training to reduce navigation friction for new users.",
      "Prepare customer process examples that map business language to standard SAP app names.",
      "Pair with role cleanup so search results are useful and not noisy."
    ],
    checks: [
      "Validate app visibility through business catalogs.",
      "Check whether app descriptions and roles are understandable to the user population.",
      "Measure whether app finder reduces training and support questions."
    ],
    source: sources[1].url
  },
  {
    id: "analytical-business-insights",
    name: "Analytical Business Insights",
    category: "Finance close and reporting",
    layer: "apply",
    publicCloud: "Public Cloud product scenario for Cost Center Review Booklet and financial insight narratives.",
    privateCloud: "Validate availability and equivalent reporting/app scope before committing.",
    release: "available",
    commercial: "ai-units",
    access: "Generative AI side panel in the Cost Center Review Booklet application",
    anchor: "Cost Center Review Booklet AI quick actions",
    summary: "Analyzes and summarizes finance review-booklet data into narrative insights, root-cause candidates, and report-ready commentary.",
    adoption: [
      "Pilot with controlling users who already review cost center booklets monthly.",
      "Create prompt patterns for actual-vs-plan, prior-period movement, alert prioritization, and root-cause explanations.",
      "Keep generated commentary in reviewer-controlled reporting workflows."
    ],
    checks: [
      "Confirm AI Units, pricing, and customer commercial model.",
      "Check whether the relevant review booklet and scope are active.",
      "Define review and approval before commentary is distributed."
    ],
    source: sources[2].url
  },
  {
    id: "joule",
    name: "Joule",
    category: "Joule and agents",
    layer: "orchestrate",
    publicCloud: "Available by SAP solution scope, tenant, region, language, role, and commercial entitlement.",
    privateCloud: "Validate product support, release level, identity model, data access, and integration architecture.",
    release: "release",
    commercial: "license",
    access: "Joule conversational entry point across SAP solutions",
    anchor: "SAP Business AI portfolio component",
    summary: "SAP's generative AI copilot for asking questions and executing supported skills in SAP business context.",
    adoption: [
      "Identify the customer process where a conversational entry point removes friction.",
      "Confirm which Joule skills are supported for the customer's products and release.",
      "Pilot with users whose authorization boundaries are already clean.",
      "Log questions, missed intents, and value cases for expansion."
    ],
    checks: [
      "Confirm Joule licensing and availability for the specific SAP product.",
      "Validate identity, authorization, region, and language support.",
      "Define support process for incorrect or incomplete responses."
    ],
    source: sources[0].url
  },
  {
    id: "joule-agents",
    name: "Joule Agents and Joule Studio",
    category: "Joule and agents",
    layer: "orchestrate",
    publicCloud: "Use where SAP has delivered supported agents or extension paths for the customer's cloud solution.",
    privateCloud: "Validate agent runtime, connectivity, and operations model before promising automation.",
    release: "watch",
    commercial: "license",
    access: "Joule agent ecosystem and Joule Studio",
    anchor: "Joule, agents, assistants, and skills",
    summary: "Agentic capabilities that can coordinate tasks, skills, and enterprise context across SAP and connected applications.",
    adoption: [
      "Start with supervised agent patterns, not autonomous posting or uncontrolled execution.",
      "Select processes with clear input, decision, approval, and exception boundaries.",
      "Design handoff, audit trail, and escalation before expanding."
    ],
    checks: [
      "Validate product availability, beta/general availability status, and customer contract.",
      "Confirm SAP and non-SAP integration permissions.",
      "Define human approval for material financial or operational outcomes."
    ],
    source: sources[0].url
  },
  {
    id: "generative-ai-hub",
    name: "Generative AI Hub",
    category: "BTP AI Foundation",
    layer: "build",
    publicCloud: "Common BTP extension path for Public Cloud customers with the right BTP entitlements.",
    privateCloud: "Common BTP extension path for Private Cloud customers with connectivity and security design.",
    release: "available",
    commercial: "license",
    access: "SAP BTP AI Foundation services",
    anchor: "Generative AI Hub in SAP AI Foundation",
    summary: "Central BTP capability for model access, prompt orchestration, grounding patterns, and lifecycle controls for generative AI apps.",
    adoption: [
      "Create a BTP subaccount and entitlement model for AI Foundation.",
      "Choose a low-risk use case that needs SAP-context-aware generation.",
      "Design model access, prompt templates, grounding, logging, and evaluation.",
      "Package the use case as a reusable extension pattern."
    ],
    checks: [
      "Confirm BTP entitlements and region availability.",
      "Decide which data can be sent to model services and under what controls.",
      "Validate operations through AI Launchpad, monitoring, and usage tracking."
    ],
    source: sources[3].url
  },
  {
    id: "ai-core",
    name: "SAP AI Core",
    category: "BTP AI Foundation",
    layer: "build",
    publicCloud: "Useful for AI workloads that extend Public Cloud without modifying core.",
    privateCloud: "Useful for side-by-side AI workloads that need enterprise operations and lifecycle control.",
    release: "available",
    commercial: "license",
    access: "SAP BTP service for AI workload execution",
    anchor: "AI Foundation operations layer",
    summary: "Runs and manages AI workloads, scenarios, deployments, and lifecycle operations on SAP BTP.",
    adoption: [
      "Use when the AI workload needs controlled deployment and operational management.",
      "Separate prompt-only experiments from production workloads.",
      "Define model, deployment, monitoring, and rollback approach."
    ],
    checks: [
      "Confirm entitlement, service plan, region, and runtime requirements.",
      "Create responsible ownership for deployed AI workloads.",
      "Validate security, secrets, and connectivity before production."
    ],
    source: sources[3].url
  },
  {
    id: "ai-launchpad",
    name: "SAP AI Launchpad",
    category: "BTP AI Foundation",
    layer: "track",
    publicCloud: "Relevant when Public Cloud extensions use SAP AI Core or BTP AI services.",
    privateCloud: "Relevant when Private Cloud side-by-side AI workloads need operational visibility.",
    release: "available",
    commercial: "license",
    access: "Operations cockpit for AI scenarios",
    anchor: "AI Foundation operations and monitoring",
    summary: "Provides operational visibility and management for AI scenarios, deployments, and runtime artifacts.",
    adoption: [
      "Use from the first proof-of-value so the team learns operations early.",
      "Define who can view, operate, and promote AI assets.",
      "Treat prompts, deployments, and evaluations as governed assets."
    ],
    checks: [
      "Confirm how the customer wants to separate sandbox, test, and production.",
      "Connect monitoring to incident and change-control processes.",
      "Record usage and drift observations for each production scenario."
    ],
    source: sources[3].url
  },
  {
    id: "document-ai",
    name: "SAP Document AI",
    category: "BTP AI Foundation",
    layer: "apply",
    publicCloud: "Common side-by-side candidate for invoice, form, and document-heavy processes.",
    privateCloud: "Common side-by-side candidate where document processing can feed SAP workflows.",
    release: "available",
    commercial: "license",
    access: "BTP AI document processing service",
    anchor: "SAP AI Foundation component",
    summary: "Extracts and processes business information from documents for downstream workflows and review.",
    adoption: [
      "Select document types with clear fields and repeat volume.",
      "Create validation queues and exception rules before downstream posting.",
      "Measure touchless rate and manual correction rate."
    ],
    checks: [
      "Confirm document retention and privacy rules.",
      "Validate accuracy by document type, supplier, and layout variant.",
      "Keep high-impact postings behind review until confidence is proven."
    ],
    source: sources[4].url
  },
  {
    id: "knowledge-graph",
    name: "SAP Knowledge Graph",
    category: "BTP AI Foundation",
    layer: "build",
    publicCloud: "Consumed through SAP AI and Joule capabilities as SAP exposes business context.",
    privateCloud: "Validate available connectors, business document exposure, and product scope.",
    release: "release",
    commercial: "validate",
    access: "AI Foundation grounding and semantic context",
    anchor: "Semantic backbone for grounded AI",
    summary: "Connects and contextualizes enterprise data so Joule and AI Foundation can answer with business context.",
    adoption: [
      "Use it as a grounding concept in architecture discussions.",
      "Avoid promising direct customer development on SAP Knowledge Graph itself unless SAP provides that path.",
      "Map which business objects and documents need to ground the AI scenario."
    ],
    checks: [
      "Confirm whether the scenario consumes SAP-provided Knowledge Graph capabilities or customer-built graph services.",
      "Validate data exposure boundaries and authorization inheritance.",
      "Track SAP roadmap updates for S/4HANA and SuccessFactors grounding."
    ],
    source: sources[4].url
  },
  {
    id: "finance-variance",
    name: "Finance variance commentary pattern",
    category: "Finance close and reporting",
    layer: "apply",
    publicCloud: "Start with standard review-booklet and embedded AI capabilities where available.",
    privateCloud: "Can be implemented as a BTP grounded assistant if embedded feature parity is not available.",
    release: "release",
    commercial: "validate",
    access: "Embedded finance AI or BTP extension",
    anchor: "Customer adoption pattern",
    summary: "A repeatable way to ask AI for period-over-period, plan-vs-actual, alert-priority, and driver-based commentary.",
    adoption: [
      "Define accepted variance thresholds and business driver taxonomy.",
      "Provide context documents, master data, and prior close commentary as grounding.",
      "Keep AI output as draft commentary until finance approves.",
      "Track which explanations are accepted, edited, or rejected."
    ],
    checks: [
      "Confirm data source lineage and currency.",
      "Avoid hallucinated root causes by grounding in booked data and approved commentary.",
      "Define audit evidence for reports shared outside finance."
    ],
    source: sources[2].url
  },
  {
    id: "journal-proposal",
    name: "AI-assisted journal proposal pattern",
    category: "Finance close and reporting",
    layer: "apply",
    publicCloud: "Only use if SAP delivers a supported app or extension scenario in the customer release.",
    privateCloud: "Candidate for controlled extension where approval, SoD, and posting APIs are governed.",
    release: "watch",
    commercial: "validate",
    access: "New AI Fiori app or BTP-controlled extension",
    anchor: "Draft-first finance automation pattern",
    summary: "Uses AI to analyze prompt/data context and propose draft journal entries for review before posting.",
    adoption: [
      "Limit initial scope to recurring, low-risk adjustments with clear rules.",
      "Create drafts only; require named reviewer approval before posting.",
      "Capture source evidence, prompt, proposed entry, reviewer edits, and posting result."
    ],
    checks: [
      "Confirm SAP-supported app/API availability for the target edition and release.",
      "Run SoD, workflow, and audit review before production.",
      "Never bypass finance ownership of posting decisions."
    ],
    source: sources[0].url
  },
  {
    id: "btp-close-assistant",
    name: "BTP grounded close assistant",
    category: "Customer-specific AI extension",
    layer: "build",
    publicCloud: "Side-by-side extension pattern that keeps the clean core intact.",
    privateCloud: "Side-by-side extension pattern with Private Cloud connectivity and data governance.",
    release: "available",
    commercial: "ai-units",
    access: "BTP app using Generative AI Hub, destinations, APIs, and approved grounding data",
    anchor: "Build pattern for customer-specific SAP AI",
    summary: "A custom assistant that answers close questions from approved SAP APIs, reports, policies, and historical commentary.",
    adoption: [
      "Pick one process lane: close cockpit, cost center reporting, accrual review, or intercompany exceptions.",
      "Build a retrieval and grounding layer from approved SAP and policy sources.",
      "Create evaluator prompts and benchmark answers before user pilot.",
      "Add citation, confidence, and escalation behavior."
    ],
    checks: [
      "Confirm API access, destinations, roles, and data residency.",
      "Separate sandbox prompts from production prompt assets.",
      "Track cost, quality, latency, and user feedback."
    ],
    source: sources[3].url
  },
  {
    id: "release-2608",
    name: "SAP S/4HANA Cloud 2608 AI watch list",
    category: "Release Watch",
    layer: "track",
    publicCloud: "Primary release-watch lane for S/4HANA Cloud Public Edition.",
    privateCloud: "Track equivalent availability by Private Cloud release and feature scope.",
    release: "watch",
    commercial: "validate",
    access: "SAP Early Release Series, What's New Viewer, SAP Help, and release blogs",
    anchor: "2608 Early Release Series starts July 13, 2026",
    summary: "A holding lane for 2608 AI content until SAP publishes and confirms the final release scope.",
    adoption: [
      "Attend or review Artificial Intelligence, Finance, User Experience, and Cross Technology sessions.",
      "Promote confirmed items into the capability catalogue with release, app, catalog, and entitlement details.",
      "Keep speculative or demo-only content in watch status."
    ],
    checks: [
      "Do not label 2608 items available until SAP release documentation confirms it.",
      "Record exact release, scope item, app ID, catalog, and commercial model.",
      "Confirm whether the content applies to Public Cloud, Private Cloud, or BTP."
    ],
    source: sources[5].url
  }
];

const releaseItems = [
  {
    status: "Watch",
    title: "2608 Artificial Intelligence session",
    text: "SAP lists an Artificial Intelligence Early Release Series session on July 13, 2026. Use it as the first source for confirmed 2608 AI content."
  },
  {
    status: "Watch",
    title: "2608 Finance session",
    text: "Track finance AI and reporting innovations separately because finance close is the strongest customer adoption lane."
  },
  {
    status: "Method",
    title: "Promotion rule",
    text: "Only move a watch item into the catalogue when the release, edition, app or service, entitlement, and source URL are known."
  },
  {
    status: "Method",
    title: "Private Cloud validation",
    text: "When a feature appears in Public Cloud release material, validate Private Cloud release parity before customer promises."
  }
];

const state = {
  search: "",
  edition: "all",
  category: "all",
  commercial: "all",
  release: "all",
  layer: "all",
  selectedId: capabilities[0].id
};

const selectors = {
  search: document.querySelector("#searchInput"),
  edition: document.querySelector("#editionFilter"),
  category: document.querySelector("#categoryFilter"),
  commercial: document.querySelector("#commercialFilter"),
  release: document.querySelector("#releaseFilter"),
  layerButtons: document.querySelectorAll(".layer-filter"),
  grid: document.querySelector("#capabilityGrid"),
  resultCount: document.querySelector("#resultCount"),
  activeContext: document.querySelector("#activeContext"),
  detail: document.querySelector("#detailPanel"),
  releaseList: document.querySelector("#releaseList"),
  sourceList: document.querySelector("#sourceList"),
  metricCapabilities: document.querySelector("#metricCapabilities"),
  metricPublic: document.querySelector("#metricPublic"),
  metricPrivate: document.querySelector("#metricPrivate"),
  metricRelease: document.querySelector("#metricRelease")
};

function uniqueCategories() {
  return [...new Set(capabilities.map((item) => item.category))].sort();
}

function populateFilters() {
  uniqueCategories().forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectors.category.appendChild(option);
  });
}

function commercialLabel(value) {
  const labels = {
    base: "Base candidate",
    "ai-units": "AI Units",
    license: "License",
    validate: "Validate"
  };
  return labels[value] || value;
}

function releaseLabel(value) {
  const labels = {
    available: "Current",
    release: "Release dependent",
    watch: "Watch"
  };
  return labels[value] || value;
}

function layerLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function statusClass(value) {
  if (value === "available" || value === "base") return "green";
  if (value === "watch" || value === "ai-units") return "copper";
  if (value === "release" || value === "license") return "blue";
  return "red";
}

function matchesEdition(item) {
  if (state.edition === "all") return true;
  if (state.edition === "public") return !item.publicCloud.toLowerCase().includes("validate availability only");
  return !item.privateCloud.toLowerCase().includes("not available");
}

function matchesSearch(item) {
  if (!state.search) return true;
  const haystack = [
    item.name,
    item.category,
    item.layer,
    item.access,
    item.anchor,
    item.summary,
    item.publicCloud,
    item.privateCloud,
    ...item.adoption,
    ...item.checks
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.search.toLowerCase());
}

function filteredCapabilities() {
  return capabilities.filter((item) => {
    if (!matchesSearch(item)) return false;
    if (!matchesEdition(item)) return false;
    if (state.category !== "all" && item.category !== state.category) return false;
    if (state.commercial !== "all" && item.commercial !== state.commercial) return false;
    if (state.release !== "all" && item.release !== state.release) return false;
    if (state.layer !== "all" && item.layer !== state.layer) return false;
    return true;
  });
}

function renderMetrics() {
  selectors.metricCapabilities.textContent = capabilities.length;
  selectors.metricPublic.textContent = capabilities.filter((item) => item.publicCloud).length;
  selectors.metricPrivate.textContent = capabilities.filter((item) => item.privateCloud).length;
  selectors.metricRelease.textContent = capabilities.filter((item) => item.release !== "available" || item.commercial !== "base").length;
}

function renderCards(items) {
  selectors.grid.innerHTML = "";
  if (!items.length) {
    selectors.grid.innerHTML = '<div class="no-results">No capability matches these filters. Clear one filter or search for a broader term.</div>';
    selectors.resultCount.textContent = "0 items";
    selectors.activeContext.textContent = "No matching SAP AI content";
    renderDetail(null);
    return;
  }

  selectors.resultCount.textContent = `${items.length} ${items.length === 1 ? "item" : "items"}`;
  const context = [];
  if (state.edition !== "all") context.push(state.edition === "public" ? "Public Cloud" : "Private Cloud");
  if (state.category !== "all") context.push(state.category);
  if (state.layer !== "all") context.push(layerLabel(state.layer));
  selectors.activeContext.textContent = context.length ? `Filtered by ${context.join(", ")}` : "Showing all SAP AI content";

  items.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `capability-card${item.id === state.selectedId ? " active" : ""}`;
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="card-topline">
        <span class="tag green">${layerLabel(item.layer)}</span>
        <span class="tag">${item.category}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <div class="chip-row">
        <span class="tag ${statusClass(item.release)}">${releaseLabel(item.release)}</span>
        <span class="tag ${statusClass(item.commercial)}">${commercialLabel(item.commercial)}</span>
      </div>
      <div class="card-meta">
        <span class="dot" aria-hidden="true"></span>
        <span>${item.access}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      state.selectedId = item.id;
      render();
    });
    selectors.grid.appendChild(card);
  });

  const selected = items.find((item) => item.id === state.selectedId) || items[0];
  state.selectedId = selected.id;
  renderDetail(selected);
}

function renderDetail(item) {
  if (!item) {
    selectors.detail.innerHTML = '<div class="detail-empty">Select a capability to see access, deployment checks, and source links.</div>';
    return;
  }

  selectors.detail.innerHTML = `
    <div class="detail-content">
      <div class="chip-row">
        <span class="tag green">${layerLabel(item.layer)}</span>
        <span class="tag ${statusClass(item.release)}">${releaseLabel(item.release)}</span>
        <span class="tag ${statusClass(item.commercial)}">${commercialLabel(item.commercial)}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
      <ul class="detail-list">
        <li><strong>Access:</strong> ${item.access}</li>
        <li><strong>Anchor:</strong> ${item.anchor}</li>
        <li><strong>Public Cloud:</strong> ${item.publicCloud}</li>
        <li><strong>Private Cloud:</strong> ${item.privateCloud}</li>
      </ul>
      <div>
        <p class="section-label">Adoption path</p>
        <ul class="detail-checks">${item.adoption.map((step) => `<li>${step}</li>`).join("")}</ul>
      </div>
      <div>
        <p class="section-label">Readiness checks</p>
        <ul class="detail-checks">${item.checks.map((step) => `<li>${step}</li>`).join("")}</ul>
      </div>
      <a class="detail-source" href="${item.source}" target="_blank" rel="noreferrer">Open SAP source</a>
    </div>
  `;
}

function renderReleaseList() {
  selectors.releaseList.innerHTML = releaseItems
    .map(
      (item) => `
        <article class="release-item">
          <span class="tag ${item.status === "Watch" ? "copper" : "blue"}">${item.status}</span>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

function renderSources() {
  selectors.sourceList.innerHTML = sources
    .map(
      (source) => `
        <a href="${source.url}" target="_blank" rel="noreferrer">
          <strong>${source.name}</strong>
          <span>${source.type}</span>
        </a>
      `
    )
    .join("");
}

function render() {
  renderCards(filteredCapabilities());
}

function bindEvents() {
  selectors.search.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    render();
  });
  selectors.edition.addEventListener("change", (event) => {
    state.edition = event.target.value;
    render();
  });
  selectors.category.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });
  selectors.commercial.addEventListener("change", (event) => {
    state.commercial = event.target.value;
    render();
  });
  selectors.release.addEventListener("change", (event) => {
    state.release = event.target.value;
    render();
  });
  selectors.layerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.layer = button.dataset.layer;
      selectors.layerButtons.forEach((node) => node.classList.toggle("active", node === button));
      render();
    });
  });
}

window.atlasContent = { capabilities, releaseItems, sources };

if (selectors.grid) {
  populateFilters();
  renderMetrics();
  renderReleaseList();
  renderSources();
  bindEvents();
  render();
}
