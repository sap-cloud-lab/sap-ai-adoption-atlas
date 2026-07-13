(() => {
  "use strict";

  const rows = [
    ["Recurring Receivables Assistant", "Financial Management", "Supports recurring billing, collections, disputes, and customer-account insight.", "Not stated on the current SAP catalogue page", "https://www.sap.com/use-cases/joule-assistant/recurring-receivables-ai"],
    ["Workforce Upskilling Assistant", "Human Capital Management", "Provides adaptive microlearning in the flow of work.", "SAP roadmap: GA planned November 2026", "https://www.sap.com/use-cases/joule-assistant/workforce-upskilling-ai"],
    ["Core HR Assistant", "Human Capital Management", "Supports employee-data integrity, positions, and HR workflows.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/core-hr-ai"],
    ["Business Network Assistant", "Business Network", "Supports buy-side, sell-side, and partner collaboration across procurement, logistics, and assets.", "SAP roadmap: GA planned Q4 2026", "https://www.sap.com/use-cases/joule-assistant/business-network-ai"],
    ["Buying Assistant", "Spend Management", "Supports catalogue quality, spend leakage analysis, and supplier recommendations.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/buying-ai"],
    ["Campaign Assistant", "Customer Experience", "Supports campaign planning, audience activation, and optimisation.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/campaign-ai"],
    ["Career and Talent Development Assistant", "Human Capital Management", "Supports career paths, development plans, succession, and internal mobility.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/career-talent-development-ai"],
    ["Cash and Treasury Assistant", "Financial Management", "Supports cash positioning, liquidity, forecasting, and bank relationships.", "SAP roadmap: Early Adopter Care planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/cash-treasury-ai"],
    ["Category Management Assistant", "Spend Management", "Supports category strategies, spend analysis, and market intelligence.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/category-management-ai"],
    ["Compensation Assistant", "Human Capital Management", "Supports compensation planning, equity, guidance, and approvals.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/compensation-ai"],
    ["Content Assistant", "Customer Experience", "Supports content generation, localisation, and real-time personalisation.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/content-ai"],
    ["Procurement Contract Assistant", "Spend Management", "Supports contract authoring, compliance monitoring, and renewal optimisation.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/contract-ai"],
    ["Deal Closing Assistant", "Customer Experience", "Supports quote creation, pricing validation, and order conversion.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/deal-closing-ai"],
    ["Expense Management Assistant", "Financial Management; Spend Management", "Supports expense capture, validation, compliance, and reimbursement.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/expense-management-ai"],
    ["Financial Closing Assistant", "Financial Management", "Supports close execution, postings, accruals, reconciliation, and issue resolution.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/financial-closing-ai"],
    ["Financial Planning Assistant", "Financial Management", "Supports forecasting, scenario modelling, and continuous plan updates.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/financial-planning-ai"],
    ["Governance Assistant", "Financial Management", "Supports governance, risk, controls, audit, and regulatory monitoring.", "SAP roadmap: GA planned Q4 2026", "https://www.sap.com/use-cases/joule-assistant/grc-ai"],
    ["HR Knowledge Assistant", "Human Capital Management", "Provides cited answers from HR policy and employment-compliance content.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/hr-knowledge-ai"],
    ["HR Service Assistant", "Human Capital Management", "Supports employee HR service, self-service, and specialist-agent routing.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/hr-service-ai"],
    ["HR System Assistant", "Human Capital Management", "Supports permissions, configuration transport, and audit readiness.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/hr-system-ai"],
    ["Invoicing Assistant", "Spend Management", "Supports invoice extraction, fraud detection, exception handling, and posting.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/invoicing-ai"],
    ["Learning Assistant", "Human Capital Management", "Supports learning journeys, assignments, and compliance monitoring.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/learning-ai"],
    ["Logistics Assistant", "Supply Chain Management", "Supports warehousing, transportation, inventory, and disruption response.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/logistics-ai"],
    ["Manufacturing Assistant", "Supply Chain Management", "Supports production planning, execution, quality, and disruption management.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/manufacturing-ai"],
    ["Merchandising Assistant", "Customer Experience", "Supports product-content quality, assortment optimisation, and demand signals.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/merchandising-ai"],
    ["Onboarding Assistant", "Human Capital Management", "Coordinates new-hire tasks and onboarding guidance.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/onboarding-ai"],
    ["Order Management Assistant", "Customer Experience", "Supports order-risk identification, sourcing optimisation, and revenue reconciliation.", "Current catalogue name; SAP roadmap separately names an Order Lifecycle Assistant", "https://www.sap.com/use-cases/joule-assistant/order-management-ai"],
    ["Payroll Assistant", "Human Capital Management", "Supports payroll readiness, alerts, validation, and explanations.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/payroll-ai"],
    ["People Intelligence Assistant", "Human Capital Management", "Supports workforce KPI monitoring, root-cause analysis, and recommendations.", "Not stated on the current SAP catalogue page", "https://www.sap.com/use-cases/joule-assistant/people-intelligence-ai"],
    ["Deal Qualification Assistant", "Customer Experience", "Supports lead enrichment, qualification, routing, and conversion.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/deal-qualification-ai"],
    ["Case Management Assistant", "Customer Experience", "Supports case preparation, processing, knowledge, and next-best action.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/case-management-ai"],
    ["Performance & Goals Assistant", "Human Capital Management", "Supports goal creation, progress monitoring, and performance preparation.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/performance-goals-ai"],
    ["Product Design Assistant", "Supply Chain Management", "Supports product design, change impact, compliance, and production handover.", "SAP roadmap: GA planned Q4 2026", "https://www.sap.com/use-cases/joule-assistant/product-design-ai"],
    ["Receiving Assistant", "Spend Management", "Supports goods receipts, service entry sheets, returns, and quality tracking.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/receiving-ai"],
    ["Recruiting Assistant", "Human Capital Management", "Supports candidate discovery, matching, interviews, and scheduling.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/recruiting-ai"],
    ["Requisition Assistant", "Spend Management", "Supports guided buying channels, requisition completion, and alternatives.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/requisition-and-buying-ai"],
    ["Sales Assistant", "Customer Experience", "Supports opportunity updates, meeting insight, pipeline risk, and next actions.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/sales-ai"],
    ["Sales Operations Assistant", "Financial Management", "Supports sales-order creation and fulfilment-issue resolution.", "Not stated on the current SAP catalogue page", "https://www.sap.com/use-cases/joule-assistant/sales-operations-ai"],
    ["Services Procurement Assistant", "Spend Management", "Supports statement-of-work creation, approvals, changes, and performance.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/services-procurement-ai"],
    ["Shopping Assistant", "Customer Experience", "Supports personalised discovery, promotions, checkout, and conditional purchasing.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/shopping-ai"],
    ["Skills Assistant", "Human Capital Management", "Supports skills governance, job architecture, and skills evidence.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/skills-ai"],
    ["Sourcing Assistant", "Spend Management", "Supports supplier discovery, sourcing events, bid analysis, and negotiation.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/sourcing-assistant"],
    ["Supplier Management Assistant", "Spend Management", "Supports supplier onboarding, classification, risk, and performance.", "SAP roadmap: GA planned September 2026", "https://www.sap.com/use-cases/joule-assistant/supplier-management-ai"],
    ["Planning Assistant", "Supply Chain Management", "Supports demand, inventory, exception, and fulfilment planning.", "SAP roadmap: GA planned Q4 2026", "https://www.sap.com/use-cases/joule-assistant/supply-chain-planning-ai"],
    ["Tax and Compliance Assistant", "Financial Management", "Supports tax, e-invoicing, and regulatory compliance.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/tax-compliance-ai"],
    ["Time Assistant", "Human Capital Management", "Supports timesheets, leave, approvals, and payroll readiness.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/time-tracking-ai"],
    ["Travel Assistant", "Financial Management; Spend Management", "Supports travel planning, booking, approvals, and policy guidance.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/travel-expense-ai"],
    ["Enterprise Architecture Assistant", "Business Transformation Management", "Supports SAP LeanIX factsheet enrichment, internal research, and web research.", "SAP roadmap: GA planned June 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/enterprise-architecture-ai"],
    ["Self-Service Assistant", "Customer Experience", "Supports autonomous answers, transaction support, and case escalation.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/self-service-ai"],
    ["Accounts Payable Assistant", "Financial Management", "Supports payments, exceptions, risk checks, and vendor reconciliation.", "Not stated on the current SAP catalogue page", "https://www.sap.com/use-cases/joule-assistant/accounts-payable-ai"],
    ["Accounts Receivable Assistant", "Financial Management", "Supports collections, disputes, and customer-account context.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/accounts-receivable-ai"],
    ["Asset and Service Assistant", "Supply Chain Management", "Supports asset alerts, maintenance planning, scheduling, and technician support.", "SAP roadmap: GA planned Q3 2026", "https://www.sap.com/use-cases/joule-assistant/asset-and-service-management-ai"],
    ["Billing Assistant", "Financial Management", "Supports billing validation, posting-error resolution, and invoice accuracy.", "SAP roadmap: GA planned Q2 2026; verify current delivery", "https://www.sap.com/use-cases/joule-assistant/billing-ai"],
    ["Process Transformation Assistant", "Business Transformation Management", "Supports SAP Signavio process analysis, recommendations, and value cases.", "SAP roadmap: GA planned Q4 2026", "https://www.sap.com/use-cases/joule-assistant/process-transformation-ai"]
  ];

  const assistants = rows.map(([name, domain, description, availability, source]) => ({
    name,
    domains: domain.split("; "),
    description,
    availability,
    source
  }));

  const expectedTotal = 54;
  const grid = document.querySelector("[data-assistant-grid]");
  const empty = document.querySelector("[data-assistant-empty]");
  const search = document.querySelector("[data-assistant-search]");
  const domainFilter = document.querySelector("[data-domain-filter]");
  const statusFilter = document.querySelector("[data-status-filter]");
  const reset = document.querySelector("[data-reset-filters]");
  const resultSummary = document.querySelector("[data-result-summary]");
  const total = document.querySelector("[data-assistant-total]");

  if (!grid || !search || !domainFilter || !statusFilter || !resultSummary) return;

  const getStatus = (availability) => {
    if (availability.includes("Early Adopter Care")) return { key: "eac", label: "EAC planned" };
    if (availability.includes("GA planned")) return { key: "planned", label: "GA planned" };
    if (availability.startsWith("Not stated")) return { key: "not-stated", label: "Not stated" };
    return { key: "verify", label: "Verify status" };
  };

  const domains = [...new Set(assistants.flatMap((assistant) => assistant.domains))].sort((a, b) => a.localeCompare(b));
  domains.forEach((domain) => domainFilter.add(new Option(domain, domain)));

  const makeIcon = (name) => {
    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", name);
    icon.setAttribute("aria-hidden", "true");
    return icon;
  };

  const createCard = (assistant) => {
    const status = getStatus(assistant.availability);
    const card = document.createElement("article");
    card.className = "assistant-card";

    const top = document.createElement("div");
    top.className = "assistant-card-top";

    const iconWrap = document.createElement("span");
    iconWrap.className = "assistant-card-icon";
    iconWrap.append(makeIcon("waypoints"));

    const statusBadge = document.createElement("span");
    statusBadge.className = `assistant-status ${status.key}`;
    statusBadge.textContent = status.label;
    top.append(iconWrap, statusBadge);

    const heading = document.createElement("h2");
    heading.textContent = assistant.name;

    const domainList = document.createElement("div");
    domainList.className = "assistant-domain-list";
    assistant.domains.forEach((domain) => {
      const item = document.createElement("span");
      item.textContent = domain;
      domainList.append(item);
    });

    const description = document.createElement("p");
    description.className = "assistant-description";
    description.textContent = assistant.description;

    const availability = document.createElement("p");
    availability.className = "assistant-availability";
    availability.append(makeIcon("calendar-clock"), document.createTextNode(assistant.availability));

    const source = document.createElement("a");
    source.className = "assistant-source";
    source.href = assistant.source;
    source.target = "_blank";
    source.rel = "noreferrer";
    source.append(document.createTextNode("Open SAP source"), makeIcon("external-link"));

    card.append(top, heading, domainList, description, availability, source);
    return card;
  };

  const render = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedDomain = domainFilter.value;
    const selectedStatus = statusFilter.value;

    const filtered = assistants
      .filter((assistant) => {
        const haystack = [assistant.name, assistant.domains.join(" "), assistant.description, assistant.availability].join(" ").toLocaleLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        const matchesDomain = selectedDomain === "all" || assistant.domains.includes(selectedDomain);
        const matchesStatus = selectedStatus === "all" || getStatus(assistant.availability).key === selectedStatus;
        return matchesSearch && matchesDomain && matchesStatus;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    grid.replaceChildren(...filtered.map(createCard));
    grid.hidden = filtered.length === 0;
    empty.hidden = filtered.length !== 0;
    resultSummary.textContent = filtered.length === expectedTotal
      ? `Showing all ${expectedTotal} assistants`
      : `Showing ${filtered.length} of ${expectedTotal} assistants`;

    if (window.lucide) window.lucide.createIcons();
  };

  search.addEventListener("input", render);
  domainFilter.addEventListener("change", render);
  statusFilter.addEventListener("change", render);
  reset?.addEventListener("click", () => {
    search.value = "";
    domainFilter.value = "all";
    statusFilter.value = "all";
    search.focus();
    render();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== search && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      search.focus();
    }
  });

  if (assistants.length !== expectedTotal) {
    console.error(`Joule Assistants catalogue expected ${expectedTotal} records, found ${assistants.length}.`);
  }

  if (total) total.textContent = String(assistants.length);
  render();
})();
