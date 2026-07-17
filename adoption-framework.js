(function () {
  "use strict";

  const feasibilityById = {
    J787: "high",
    J467: "high",
    J650: "high",
    J937: "high",
    J585: "medium",
    J425: "medium",
    J741: "high",
    J788: "medium",
    J1132: "high",
    J663: "high",
    J855: "high",
    J1043: "high",
    J1343: "high",
    J1038: "high",
    J327: "high",
    J648: "medium",
    J938: "high",
    J2462: "medium",
    J326: "medium",
    J955: "medium",
    J671: "high",
    J1177: "partial",
    J940: "partial",
    J383: "medium",
    J1325: "high",
    J872: "high",
    J939: "high",
    J657: "high",
    J882: "high",
    J1130: "partial",
    J468: "medium",
    J278: "high",
    J1632: "high",
    J314: "medium",
    J395: "high",
    J1131: "high",
    J1129: "partial"
  };

  const feasibilityLabels = {
    high: "High feasibility",
    medium: "Medium feasibility",
    partial: "Partial only"
  };

  const feasibilityReasons = {
    high: "The business outcome is generally reproducible with supported product APIs, document retrieval, and customer-owned workflow. Consequential actions still need deterministic validation and approval.",
    medium: "The outcome needs live operational data, optimisation or domain calculation beyond an LLM. Reproduction is possible, but delivery complexity and control burden are material.",
    partial: "An external solution can approximate the outcome, but SAP-native semantics, embedded application context, proprietary content, or privileged internal tools are not fully portable."
  };

  const recommendedRouteById = {
    J787: "hybrid",
    J467: "hybrid",
    J650: "custom",
    J937: "custom",
    J585: "hybrid",
    J425: "hybrid",
    J741: "hybrid",
    J788: "hybrid",
    J1132: "hybrid",
    J663: "hybrid",
    J855: "hybrid",
    J1043: "custom",
    J1343: "custom",
    J1038: "hybrid",
    J327: "hybrid",
    J648: "hybrid",
    J938: "hybrid",
    J2462: "hybrid",
    J326: "hybrid",
    J955: "hybrid",
    J671: "custom",
    J1177: "sap",
    J940: "sap",
    J383: "hybrid",
    J1325: "hybrid",
    J872: "hybrid",
    J939: "hybrid",
    J657: "hybrid",
    J882: "hybrid",
    J1130: "sap",
    J468: "hybrid",
    J278: "custom",
    J1632: "hybrid",
    J314: "hybrid",
    J395: "custom",
    J1131: "hybrid",
    J1129: "sap"
  };

  const routeLabels = {
    custom: "Customer AI Platform",
    hybrid: "Hybrid AI Workspace",
    sap: "SAP Business AI"
  };

  const routeReasons = {
    custom: "The portable outcome is mainly read, explain, classify, or draft. Build it on the Customer AI Platform only after confirming every required SAP interface.",
    hybrid: "The outcome combines customer-specific reasoning with optimisation, live operations, or a consequential product action that should stay behind SAP or human control.",
    sap: "The outcome depends materially on embedded SAP context, proprietary semantics, or product tools that are not fully portable. Start with the SAP capability and custom-build only the surrounding work."
  };

  const openAgentIds = new Set();

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalise(value) {
    return String(value ?? "").toLocaleLowerCase();
  }

  function availabilityClass(value) {
    if (value === "Generally Available") return "ga";
    if (value === "Early Adopter Care") return "eac";
    return "beta";
  }

  function integrationBoundary(agent) {
    const products = (agent.products || []).join(" | ");
    const haystack = `${products} ${agent.category}`;

    if (haystack.includes("S/4HANA Cloud Public Edition")) {
      return "Released Public Edition APIs or events only, activated through communication arrangements. No internal APIs or direct table access.";
    }
    if (haystack.includes("S/4HANA Cloud Private Edition")) {
      return "Released APIs first; use destinations and Cloud Connector for private endpoints. A governed ABAP Cloud/RAP façade may be possible where SAP permits it.";
    }
    if (haystack.includes("Concur")) {
      return "Use supported SAP Concur APIs and preserve traveler, report, policy, approval, and audit permissions.";
    }
    if (haystack.includes("SuccessFactors")) {
      return "Use supported SuccessFactors OData APIs, purpose-limit employee data, and preserve role-based permissions and approval.";
    }
    if (haystack.includes("Ariba")) {
      return "Use supported SAP Ariba APIs and keep realm configuration, supplier access, templates, event rules, and sourcing approval in control.";
    }
    if (haystack.includes("Signavio")) {
      return "Use supported Signavio APIs. SAP process content, workspace context, and embedded navigation may not be reproducible outside the product.";
    }
    if (haystack.includes("LeanIX")) {
      return "Use supported LeanIX APIs or its documented MCP server, with workspace permissions and fact-sheet access preserved.";
    }
    if (haystack.includes("Field Service Management")) {
      return "Use supported field-service APIs and events; keep schedule constraints, optimisation, dispatcher authority, and execution status deterministic.";
    }
    if (haystack.includes("CX AI Toolkit") || haystack.includes("Sales Cloud") || haystack.includes("Service Cloud")) {
      return "Use supported SAP CX APIs and toolkit paths; preserve tenant roles, channel controls, customer-data purpose, and case or quote approval.";
    }
    if (products === "Joule" || !products) {
      return "Verify that a documented product API or action exists. A Joule catalogue label alone does not create an external integration boundary.";
    }
    return "Use the product's documented public APIs, events, identity model, and approval controls. Do not infer an interface from the agent description.";
  }

  function externalPattern(agent, level) {
    const profile = window.jouleAgentProfiles && window.jouleAgentProfiles[agent.id];
    const defaultPattern = {
      high: "Retrieve governed data, apply constrained model reasoning, persist a proposal, and route any write through deterministic validation and human approval.",
      medium: "Combine a model with deterministic rules or an optimisation service, then place every transaction behind product validation and human approval.",
      partial: "Rebuild only the portable outcome. Do not promise equivalent SAP context, private semantics, embedded navigation, or proprietary content."
    }[level];

    return profile && profile.action ? profile.action : defaultPattern;
  }

  function hasConsequentialAction(agent) {
    const profile = window.jouleAgentProfiles && window.jouleAgentProfiles[agent.id];
    const haystack = normalise([
      agent.name,
      agent.displayName,
      agent.description,
      agent.longDescription,
      profile && profile.action,
      profile && profile.approval
    ].join(" "));
    return /\b(post|create|update|change|schedule|transfer|execute|approve|release|submit|book|assign|write|maintain|resolve)\b/.test(haystack);
  }

  function recommendedRoute(agent, level) {
    if (recommendedRouteById[agent.id]) return recommendedRouteById[agent.id];
    if (level === "partial") return "sap";
    if (level === "medium" || hasConsequentialAction(agent)) return "hybrid";
    return "custom";
  }

  function sapOptionFit(agent) {
    if (agent.availability === "Generally Available") {
      return { tone: "strong", icon: "circle-check", label: "Consume natively", detail: "The SAP-delivered capability is generally available; validate the tenant, entitlement, region, and release." };
    }
    if (agent.availability === "Early Adopter Care") {
      return { tone: "conditional", icon: "clock-3", label: "Early access", detail: "The SAP-delivered capability is in Early Adopter Care and is not a general-production assumption." };
    }
    if (agent.availability === "Beta") {
      return { tone: "conditional", icon: "flask-conical", label: "Beta / validate", detail: "The SAP-delivered capability is listed as Beta in this snapshot; confirm current customer availability." };
    }
    return { tone: "limited", icon: "circle-help", label: "Validate status", detail: "No dependable deployment status is published in this snapshot." };
  }

  function customerOptionFit(agent, level, route) {
    const hasPublishedProduct = Array.isArray(agent.products) && agent.products.length > 0;
    if (level === "partial") {
      return { tone: "limited", icon: "lock-keyhole", label: "Partial outcome only", detail: "A customer platform can support surrounding work, but it cannot reproduce the full SAP-native semantics or embedded product context." };
    }
    if (level === "high" && route === "custom" && hasPublishedProduct) {
      return { tone: "strong", icon: "circle-check", label: "Build + deploy", detail: "The portable outcome is a strong customer-platform candidate, subject to confirmed read and action interfaces." };
    }
    return { tone: "conditional", icon: "circle-alert", label: "Build with constraints", detail: hasPublishedProduct
      ? "A customer build is feasible only with supported interfaces, deterministic controls, and any required human approval."
      : "The catalogue does not publish a product mapping here; confirm the system boundary before treating this as deployable." };
  }

  function hybridOptionFit(route) {
    if (route === "hybrid") {
      return { tone: "strong", icon: "circle-check", label: "Combine + deploy", detail: "Use customer-specific reasoning while SAP or a named person retains the native, closed, or consequential step." };
    }
    if (route === "custom") {
      return { tone: "neutral", icon: "circle-dashed", label: "Optional", detail: "A hybrid pattern is technically possible, but it adds operating complexity where the portable customer outcome may be sufficient." };
    }
    return { tone: "limited", icon: "shield-check", label: "SAP-led extension", detail: "Keep the SAP-delivered capability as the core and use custom AI only for supportable surrounding workflow." };
  }

  function optionFitMarkup(fit) {
    return `<span class="option-fit ${escapeHtml(fit.tone)}"><i data-lucide="${escapeHtml(fit.icon)}" aria-hidden="true"></i><span>${escapeHtml(fit.label)}</span></span>`;
  }

  function listMarkup(items) {
    if (!Array.isArray(items) || !items.length) return "<p>Validate against the current product documentation and tenant.</p>";
    return `<ul>${items.slice(0, 4).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function detailMarkup(agent, level) {
    const profile = window.jouleAgentProfiles && window.jouleAgentProfiles[agent.id];
    const process = profile && profile.process ? profile.process : agent.longDescription || agent.description;
    const controls = profile && profile.agentSpecificControls ? profile.agentSpecificControls : [];
    const approval = profile && profile.approval ? profile.approval : "Define a named business owner and approval boundary before any consequential product action.";

    const route = recommendedRoute(agent, level);
    const sapFit = sapOptionFit(agent);
    const customerFit = customerOptionFit(agent, level, route);
    const hybridFit = hybridOptionFit(route);

    return `
      <tr class="agent-detail-row" id="agent-detail-${escapeHtml(agent.id)}">
        <td colspan="9">
          <div class="agent-detail-panel">
            <section><h4>Portable business outcome</h4><p>${escapeHtml(process)}</p></section>
            <section><h4>Customer AI build pattern</h4><p>${escapeHtml(externalPattern(agent, level))}</p><p>${escapeHtml(feasibilityReasons[level])}</p></section>
            <section class="option-assessment"><h4>Three-option assessment</h4><dl><div><dt>SAP Business AI</dt><dd>${escapeHtml(sapFit.label)} — ${escapeHtml(sapFit.detail)}</dd></div><div><dt>Customer AI Platform</dt><dd>${escapeHtml(customerFit.label)} — ${escapeHtml(customerFit.detail)}</dd></div><div><dt>Hybrid AI Workspace</dt><dd>${escapeHtml(hybridFit.label)} — ${escapeHtml(hybridFit.detail)}</dd></div></dl><p><strong>Recommended:</strong> ${escapeHtml(routeLabels[route])}. ${escapeHtml(routeReasons[route])}</p></section>
            <section><h4>Approval and controls</h4><p>${escapeHtml(approval)}</p>${listMarkup(controls)}</section>
          </div>
        </td>
      </tr>
    `;
  }

  function rowMarkup(agent) {
    const level = feasibilityById[agent.id] || "medium";
    const products = agent.products && agent.products.length ? agent.products.join(" · ") : "Product not published";
    const isOpen = openAgentIds.has(agent.id);
    const sourceUrl = agent.catalogUrl || agent.apiUrl || "https://discovery-center.cloud.sap/ai-catalog/";
    const route = recommendedRoute(agent, level);
    const sapFit = sapOptionFit(agent);
    const customerFit = customerOptionFit(agent, level, route);
    const hybridFit = hybridOptionFit(route);

    return `
      <tr class="agent-matrix-row">
        <td class="matrix-agent" data-label="Agent">
          <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(agent.displayName || agent.name)}</a>
          <span class="agent-id">${escapeHtml(agent.id)} · ${escapeHtml(agent.typeLabel || agent.type)}</span>
        </td>
        <td class="matrix-product" data-label="SAP product / domain"><span class="agent-products">${escapeHtml(products)}</span><span class="agent-category">${escapeHtml(agent.category || "Category not published")}</span></td>
        <td class="matrix-status" data-label="SAP status"><span class="status-label ${availabilityClass(agent.availability)}">${escapeHtml(agent.availability || "Validate")}</span></td>
        <td class="matrix-option matrix-option-sap" data-label="SAP Business AI">${optionFitMarkup(sapFit)}</td>
        <td class="matrix-option matrix-option-customer" data-label="Customer AI Platform">${optionFitMarkup(customerFit)}</td>
        <td class="matrix-option matrix-option-hybrid" data-label="Hybrid AI Workspace">${optionFitMarkup(hybridFit)}</td>
        <td class="matrix-recommendation" data-label="Recommended approach"><span class="route-label ${route}">${escapeHtml(routeLabels[route])}</span></td>
        <td class="matrix-boundary" data-label="Integration boundary">${escapeHtml(integrationBoundary(agent))}</td>
        <td class="matrix-details"><button class="agent-detail-button" type="button" data-agent-toggle="${escapeHtml(agent.id)}" aria-expanded="${isOpen}" aria-controls="agent-detail-${escapeHtml(agent.id)}" aria-label="${isOpen ? "Hide" : "Show"} implementation detail for ${escapeHtml(agent.name)}"><i data-lucide="${isOpen ? "chevron-up" : "chevron-down"}" aria-hidden="true"></i></button></td>
      </tr>
      ${isOpen ? detailMarkup(agent, level) : ""}
    `;
  }

  function renderAgentMatrix() {
    const tableBody = document.getElementById("agent-matrix-body");
    const empty = document.getElementById("agent-empty");
    const evidence = document.getElementById("matrix-evidence");
    const catalog = window.jouleAgentCatalog;

    if (!tableBody || !empty || !evidence) return;

    if (!catalog || !Array.isArray(catalog.agents)) {
      tableBody.innerHTML = "";
      empty.hidden = false;
      empty.textContent = "The agent catalogue could not be loaded.";
      evidence.textContent = "Agent evidence unavailable. Open the SAP Discovery Center catalogue directly.";
      return;
    }

    const search = normalise(document.getElementById("agent-search").value).trim();
    const feasibility = document.getElementById("feasibility-filter").value;
    const availability = document.getElementById("availability-filter").value;

    const filtered = catalog.agents.filter((agent) => {
      const level = feasibilityById[agent.id] || "medium";
      const haystack = normalise([
        agent.id,
        agent.name,
        agent.displayName,
        agent.category,
        agent.availability,
        routeLabels[recommendedRoute(agent, level)],
        ...(agent.products || [])
      ].join(" "));
      return (!search || haystack.includes(search)) && (!feasibility || level === feasibility) && (!availability || agent.availability === availability);
    });

    tableBody.innerHTML = filtered.map(rowMarkup).join("");
    empty.hidden = filtered.length > 0;
    evidence.textContent = `Showing ${filtered.length} of ${catalog.agents.length} records · SAP Discovery Center snapshot ${catalog.snapshotLabel || catalog.snapshotDate || "date not published"} · Option fit and the recommended approach are independent architecture assessments; validate interfaces, entitlements, and tenant availability.`;

    document.querySelectorAll("[data-agent-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.agentToggle;
        if (openAgentIds.has(id)) openAgentIds.delete(id);
        else openAgentIds.add(id);
        renderAgentMatrix();
        window.requestAnimationFrame(() => {
          const nextButton = document.querySelector(`[data-agent-toggle="${id}"]`);
          if (nextButton) nextButton.focus();
        });
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function renderFeasibilityCounts() {
    const catalog = window.jouleAgentCatalog;
    if (!catalog || !Array.isArray(catalog.agents)) return;

    ["high", "medium", "partial"].forEach((level) => {
      const node = document.querySelector(`[data-feasibility-count="${level}"]`);
      if (!node) return;
      node.textContent = String(catalog.agents.filter((agent) => (feasibilityById[agent.id] || "medium") === level).length);
    });

    ["custom", "hybrid", "sap"].forEach((route) => {
      const node = document.querySelector(`[data-route-count="${route}"]`);
      if (!node) return;
      node.textContent = String(catalog.agents.filter((agent) => {
        const level = feasibilityById[agent.id] || "medium";
        return recommendedRoute(agent, level) === route;
      }).length);
    });
  }

  function updateDecisionAssessment() {
    const form = document.getElementById("route-assessment");
    const result = document.getElementById("decision-result");
    if (!form || !result) return;

    const capability = document.getElementById("sap-capability").value;
    const processFit = document.getElementById("process-fit").value;
    const interfaceFit = document.getElementById("interface-fit").value;
    const variation = document.getElementById("process-variation").value;
    const economics = document.getElementById("economics-fit").value;
    const action = document.getElementById("action-fit").value;

    let route = "hybrid";
    let label = "Likely route";
    let title = "Hybrid by design";
    let icon = "git-merge";
    let reason = "Use custom AI for customer-specific reasoning and SAP for the native or closed transaction step.";
    let actions = [
      "Confirm the exact published interfaces and communication arrangements.",
      "Separate proposal generation from approval and posting.",
      "Compare three-year cost per controlled business outcome."
    ];

    if (interfaceFit === "none" && capability === "unavailable") {
      route = "blocked";
      label = "No-go gate";
      title = "Redesign or retain a manual step";
      icon = "octagon-x";
      reason = "No packaged capability and no supported external doorway means there is no supportable agent route for the required step.";
      actions = [
        "Reduce the scope to supported read or draft activity.",
        "Assess an allowed customer-built service or Private Edition façade.",
        "Keep the closed step manual until a supported interface exists."
      ];
    } else if (interfaceFit === "none" || (capability === "available" && processFit === "high" && variation === "low" && economics !== "custom")) {
      route = "sap";
      title = "SAP Business AI";
      icon = "sparkles";
      reason = interfaceFit === "none"
        ? "The required step has no supported external doorway. Use the SAP capability if it is available and the business outcome is essential."
        : "The packaged capability fits the process and its lifecycle economics are stronger than building and operating a custom alternative.";
      actions = [
        "Validate the exact tenant, edition, release, region, role, and entitlement.",
        "Confirm the packaged process against real customer exceptions.",
        "Model AI Units, adoption, support, and exit dependency over three years."
      ];
    } else if (interfaceFit === "full" && action !== "native" && (processFit === "low" || variation === "high") && economics === "custom") {
      route = "custom";
      title = "Managed Custom AI";
      icon = "brain-circuit";
      reason = "Supported interfaces cover the use case, while customer-specific process variation and economics justify our managed platform.";
      actions = [
        "Deploy on our managed platform or inside the customer’s BTP environment.",
        "Keep SAP access behind typed tools, policy, identity, and deterministic validation.",
        "Price reusable platform operation, SAP adapters, evaluation, and support."
      ];
    }

    result.className = `decision-result ${route}`;
    document.getElementById("decision-route-label").textContent = label;
    document.getElementById("decision-route-title").textContent = title;
    document.getElementById("decision-route-reason").textContent = reason;
    document.getElementById("decision-route-actions").innerHTML = actions.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    const currentIcon = result.querySelector("svg, i");
    if (currentIcon) {
      const nextIcon = document.createElement("i");
      nextIcon.setAttribute("data-lucide", icon);
      nextIcon.setAttribute("aria-hidden", "true");
      currentIcon.replaceWith(nextIcon);
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function initialiseDecisionAssessment() {
    const form = document.getElementById("route-assessment");
    if (!form) return;
    form.addEventListener("submit", (event) => event.preventDefault());
    form.querySelectorAll("select").forEach((control) => control.addEventListener("change", updateDecisionAssessment));
    updateDecisionAssessment();
  }

  function formatNumber(value, maximumFractionDigits) {
    return new Intl.NumberFormat("en-AU", { maximumFractionDigits }).format(value);
  }

  function formatCurrency(value, currency, minimumFractionDigits = 0) {
    const maximumFractionDigits = Math.max(minimumFractionDigits, value < 100 ? 2 : 0);
    if (currency === "USD") {
      return `US$${new Intl.NumberFormat("en-AU", { minimumFractionDigits, maximumFractionDigits }).format(value)}`;
    }
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits,
      maximumFractionDigits
    }).format(value);
  }

  function formatTokenCount(value) {
    if (value >= 1_000_000) return `${formatNumber(value / 1_000_000, 1)}M`;
    if (value >= 1_000) return `${formatNumber(value / 1_000, 1)}K`;
    return formatNumber(value, 0);
  }

  function updateCostCalculator() {
    const SAP_AI_UNITS_PER_ACTION = 0.02;
    const SAP_AI_UNIT_EUR_LIST_PRICE = 7;
    const EUR_USD_REFERENCE_RATE = 1.1430;
    const tasks = Math.max(0, Number(document.getElementById("tasks-per-year").value) || 0);
    const actions = Math.max(0, Number(document.getElementById("actions-per-task").value) || 0);
    const inputTokens = Math.max(0, Number(document.getElementById("input-tokens").value) || 0);
    const outputTokens = Math.max(0, Number(document.getElementById("output-tokens").value) || 0);
    const [inputRate, outputRate] = document.getElementById("model-rate").value.split(",").map(Number);

    const sapActions = tasks * actions;
    const sapUnits = sapActions * SAP_AI_UNITS_PER_ACTION;
    const sapCostEur = sapUnits * SAP_AI_UNIT_EUR_LIST_PRICE;
    const sapCostUsd = sapCostEur * EUR_USD_REFERENCE_RATE;
    const sapThreeYearCost = sapCostUsd * 3;
    const externalTokens = tasks * (inputTokens + outputTokens);
    const externalInputCost = tasks * (inputTokens / 1_000_000) * inputRate;
    const externalOutputCost = tasks * (outputTokens / 1_000_000) * outputRate;
    const externalCost = externalInputCost + externalOutputCost;
    const externalThreeYearCost = externalCost * 3;

    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    setText("sap-runtime-cost", `≈ ${formatCurrency(sapCostUsd, "USD")}`);
    setText("sap-ai-units", formatNumber(sapUnits, sapUnits < 10 ? 2 : 0));
    setText("sap-three-year-cost", `≈ ${formatCurrency(sapThreeYearCost, "USD")}`);
    setText("external-runtime-cost", formatCurrency(externalCost, "USD"));
    setText("external-token-count", formatTokenCount(externalTokens));
    setText("external-three-year-cost", formatCurrency(externalThreeYearCost, "USD"));

    setText("sap-formula-actions", `${formatNumber(tasks, 0)} tasks × ${formatNumber(actions, 2)} actions = ${formatNumber(sapActions, 0)}`);
    setText("sap-formula-units", `${formatNumber(sapActions, 0)} × 0.02 = ${formatNumber(sapUnits, sapUnits < 10 ? 2 : 0)} AI Units`);
    setText("sap-formula-eur", `${formatNumber(sapUnits, sapUnits < 10 ? 2 : 0)} × €7 = ${formatCurrency(sapCostEur, "EUR")}`);
    setText("sap-formula-usd", `${formatCurrency(sapCostEur, "EUR")} × 1.1430 = ${formatCurrency(sapCostUsd, "USD")}`);
    setText("sap-formula-three-year", `${formatCurrency(sapCostUsd, "USD", 2)} × 3 = ${formatCurrency(sapThreeYearCost, "USD")}`);
    setText("external-formula-input", `${formatNumber(tasks, 0)} × ${formatNumber(inputTokens, 0)} ÷ 1M × ${formatCurrency(inputRate, "USD", inputRate % 1 ? 2 : 0)} = ${formatCurrency(externalInputCost, "USD")}`);
    setText("external-formula-output", `${formatNumber(tasks, 0)} × ${formatNumber(outputTokens, 0)} ÷ 1M × ${formatCurrency(outputRate, "USD")} = ${formatCurrency(externalOutputCost, "USD")}`);
    setText("external-formula-annual", `${formatCurrency(externalInputCost, "USD")} + ${formatCurrency(externalOutputCost, "USD")} = ${formatCurrency(externalCost, "USD")}`);
    setText("external-formula-three-year", `${formatCurrency(externalCost, "USD")} × 3 = ${formatCurrency(externalThreeYearCost, "USD")}`);
  }

  function initialiseCalculator() {
    const form = document.getElementById("cost-calculator");
    if (!form) return;
    form.addEventListener("submit", (event) => event.preventDefault());
    form.querySelectorAll("input, select").forEach((control) => control.addEventListener("input", updateCostCalculator));
    updateCostCalculator();
  }

  function initialiseMatrixControls() {
    const controls = ["agent-search", "feasibility-filter", "availability-filter"];
    controls.forEach((id) => {
      const control = document.getElementById(id);
      if (!control) return;
      control.addEventListener(id === "agent-search" ? "input" : "change", renderAgentMatrix);
    });

    const clear = document.getElementById("clear-agent-filters");
    if (clear) {
      clear.addEventListener("click", () => {
        document.getElementById("agent-search").value = "";
        document.getElementById("feasibility-filter").value = "";
        document.getElementById("availability-filter").value = "";
        openAgentIds.clear();
        renderAgentMatrix();
      });
    }
  }

  const operatingModelIds = ["sap-business-ai", "customer-ai-platform", "hybrid-ai-workspace"];

  function scrollToView(node, shouldFocus) {
    if (!node) return;
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    if (shouldFocus) {
      window.setTimeout(() => {
        try {
          node.focus({ preventScroll: true });
        } catch (_error) {
          node.focus();
        }
      }, reducedMotion ? 0 : 360);
    }
  }

  function replaceHash(hash, mode) {
    const url = new URL(window.location.href);
    url.hash = hash;
    window.history[mode === "replace" ? "replaceState" : "pushState"]({}, "", url);
  }

  function showOperatingModel(modelId, options) {
    const settings = { history: "push", scroll: true, focus: true, ...(options || {}) };
    const viewer = document.getElementById("operating-models");
    if (!viewer || !operatingModelIds.includes(modelId)) return;

    viewer.hidden = false;
    viewer.dataset.activeModel = modelId;

    document.querySelectorAll("[data-model-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.modelPanel !== modelId;
    });

    document.querySelectorAll("[data-model-tab]").forEach((tab) => {
      const active = tab.dataset.modelTab === modelId;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    if (settings.history) replaceHash(`#${modelId}`, settings.history);

    const panel = document.querySelector(`[data-model-panel="${modelId}"]`);
    if (settings.scroll) scrollToView(viewer, false);
    if (settings.focus && panel) {
      window.setTimeout(() => {
        try {
          panel.focus({ preventScroll: true });
        } catch (_error) {
          panel.focus();
        }
      }, settings.scroll ? 360 : 0);
    }
  }

  function showFrameworkHome(options) {
    const settings = { history: "push", scroll: true, focus: true, ...(options || {}) };
    const viewer = document.getElementById("operating-models");
    const home = document.querySelector("[data-framework-home]");
    if (viewer) viewer.hidden = true;
    if (settings.history) replaceHash("#framework", settings.history);
    if (settings.scroll) scrollToView(home, false);

    if (settings.focus) {
      const title = document.getElementById("framework-title");
      if (title) {
        title.tabIndex = -1;
        window.setTimeout(() => {
          try {
            title.focus({ preventScroll: true });
          } catch (_error) {
            title.focus();
          }
        }, settings.scroll ? 360 : 0);
      }
    }
  }

  function handleOperatingModelHash(options) {
    const hash = window.location.hash.replace(/^#/, "");
    if (operatingModelIds.includes(hash)) {
      showOperatingModel(hash, { history: null, scroll: true, focus: Boolean(options && options.focus) });
    } else if (hash === "framework") {
      showFrameworkHome({ history: null, scroll: true, focus: Boolean(options && options.focus) });
    }
  }

  function initialiseOperatingModels() {
    const viewer = document.getElementById("operating-models");
    if (!viewer) return;

    document.querySelectorAll("[data-open-model]").forEach((button) => {
      button.addEventListener("click", () => showOperatingModel(button.dataset.openModel));
    });

    document.querySelectorAll("[data-model-tab]").forEach((button) => {
      button.addEventListener("click", () => showOperatingModel(button.dataset.modelTab, { focus: false }));
      button.addEventListener("keydown", (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const currentIndex = operatingModelIds.indexOf(button.dataset.modelTab);
        let nextIndex = currentIndex;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + operatingModelIds.length) % operatingModelIds.length;
        }
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % operatingModelIds.length;
        }
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = operatingModelIds.length - 1;
        const nextId = operatingModelIds[nextIndex];
        showOperatingModel(nextId, { scroll: false, focus: false });
        const nextTab = document.querySelector(`[data-model-tab="${nextId}"]`);
        if (nextTab) nextTab.focus();
      });
    });

    document.querySelectorAll("[data-back-framework]").forEach((button) => {
      button.addEventListener("click", () => showFrameworkHome());
    });

    document.querySelectorAll("[data-deployment]").forEach((button) => {
      button.addEventListener("click", () => {
        const deployment = button.dataset.deployment;
        document.querySelectorAll("[data-deployment]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        const label = document.querySelector("[data-deployment-label]");
        if (label) label.textContent = deployment === "managed" ? "Our managed platform" : "Customer BTP";
      });
    });

    let hashNavigationQueued = false;
    const scheduleOperatingModelHash = () => {
      if (hashNavigationQueued) return;
      hashNavigationQueued = true;
      window.setTimeout(() => {
        hashNavigationQueued = false;
        handleOperatingModelHash({ focus: true });
      }, 0);
    };

    window.addEventListener("popstate", scheduleOperatingModelHash);
    window.addEventListener("hashchange", scheduleOperatingModelHash);

    if (operatingModelIds.includes(window.location.hash.replace(/^#/, ""))) {
      window.requestAnimationFrame(() => handleOperatingModelHash({ focus: false }));
    }
  }

  function initialiseEvidenceDialog() {
    const dialog = document.getElementById("agent-evidence-dialog");
    const scroller = dialog && dialog.querySelector("[data-evidence-scroll]");
    if (!dialog || !scroller) return;

    let returnFocus = null;

    const closeDialog = () => {
      if (dialog.open) dialog.close();
    };

    const openDialog = (trigger) => {
      returnFocus = trigger;
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("evidence-dialog-open");

      const targetId = trigger.dataset.evidenceTarget;
      window.requestAnimationFrame(() => {
        if (targetId) {
          const target = document.getElementById(targetId);
          if (target) {
            const offset = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
            scroller.scrollTo({ top: Math.max(0, offset - 18), behavior: "auto" });
          }
        } else {
          scroller.scrollTo({ top: 0, behavior: "auto" });
        }

        const closeButton = dialog.querySelector("[data-close-evidence]");
        if (closeButton) closeButton.focus({ preventScroll: true });
      });
    };

    document.querySelectorAll("[data-open-evidence]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openDialog(trigger);
      });
    });

    dialog.querySelectorAll("[data-close-evidence]").forEach((button) => {
      button.addEventListener("click", closeDialog);
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("evidence-dialog-open");
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    });
  }

  function initialiseAgentRoutesDialog() {
    const dialog = document.getElementById("agent-routes-dialog");
    const scroller = dialog && dialog.querySelector("[data-agent-routes-scroll]");
    const matrix = document.getElementById("agent-matrix");
    if (!dialog || !scroller || !matrix) return;

    scroller.appendChild(matrix);
    let returnFocus = null;

    const closeDialog = () => {
      if (dialog.open) dialog.close();
    };

    const openDialog = (trigger) => {
      returnFocus = trigger;
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("evidence-dialog-open");

      window.requestAnimationFrame(() => {
        scroller.scrollTo({ top: 0, behavior: "auto" });
        const closeButton = dialog.querySelector("[data-close-agent-routes]");
        if (closeButton) closeButton.focus({ preventScroll: true });
      });
    };

    document.querySelectorAll("[data-open-agent-routes]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        openDialog(trigger);
      });
    });

    dialog.querySelectorAll("[data-close-agent-routes]").forEach((button) => {
      button.addEventListener("click", closeDialog);
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("evidence-dialog-open");
      if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    });
  }

  function initialiseMobileMenu() {
    const button = document.querySelector(".mobile-menu");
    const nav = document.getElementById("adoption-top-nav");
    if (!button || !nav) return;

    const setMenuState = (open) => {
      nav.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));

      const label = button.querySelector(".sr-only");
      if (label) label.textContent = open ? "Close page navigation" : "Open page navigation";

      const currentIcon = button.querySelector("svg, i");
      if (currentIcon) {
        const nextIcon = document.createElement("i");
        nextIcon.setAttribute("data-lucide", open ? "x" : "menu");
        nextIcon.setAttribute("aria-hidden", "true");
        currentIcon.replaceWith(nextIcon);
      }

      if (window.lucide) window.lucide.createIcons();
    };

    button.addEventListener("click", () => {
      const open = !nav.classList.contains("open");
      setMenuState(open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });
  }

  function initialise() {
    if (window.lucide) window.lucide.createIcons();
    initialiseOperatingModels();
    initialiseEvidenceDialog();
    initialiseAgentRoutesDialog();
    initialiseMobileMenu();
    initialiseDecisionAssessment();
    initialiseCalculator();
    initialiseMatrixControls();
    renderFeasibilityCounts();
    renderAgentMatrix();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialise);
  else initialise();
})();
