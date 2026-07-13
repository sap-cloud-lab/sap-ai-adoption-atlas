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

  const routeLabels = {
    custom: "Managed custom",
    hybrid: "Hybrid",
    sap: "SAP Business AI first"
  };

  const routeReasons = {
    custom: "The portable outcome is mainly read, explain, classify, or draft. Confirm the exact supported interfaces before treating it as a custom build candidate.",
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
    if (level === "partial") return "sap";
    if (level === "medium" || hasConsequentialAction(agent)) return "hybrid";
    return "custom";
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

    return `
      <tr class="agent-detail-row">
        <td colspan="7">
          <div class="agent-detail-panel">
            <section><h4>Portable business outcome</h4><p>${escapeHtml(process)}</p></section>
            <section><h4>External build pattern</h4><p>${escapeHtml(externalPattern(agent, level))}</p><p>${escapeHtml(feasibilityReasons[level])}</p></section>
            <section><h4>Why this route</h4><p>${escapeHtml(routeReasons[route])}</p></section>
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

    return `
      <tr>
        <td>
          <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(agent.displayName || agent.name)}</a>
          <span class="agent-id">${escapeHtml(agent.id)} · ${escapeHtml(agent.typeLabel || agent.type)}</span>
        </td>
        <td><span class="agent-products">${escapeHtml(products)}</span><span class="agent-category">${escapeHtml(agent.category || "Category not published")}</span></td>
        <td><span class="status-label ${availabilityClass(agent.availability)}">${escapeHtml(agent.availability || "Validate")}</span></td>
        <td><span class="feasibility-label ${level}">${escapeHtml(feasibilityLabels[level])}</span></td>
        <td><span class="route-label ${route}">${escapeHtml(routeLabels[route])}</span></td>
        <td>${escapeHtml(integrationBoundary(agent))}</td>
        <td><button class="agent-detail-button" type="button" data-agent-toggle="${escapeHtml(agent.id)}" aria-expanded="${isOpen}" aria-label="${isOpen ? "Hide" : "Show"} implementation detail for ${escapeHtml(agent.name)}"><i data-lucide="${isOpen ? "chevron-up" : "chevron-down"}" aria-hidden="true"></i></button></td>
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
        ...(agent.products || [])
      ].join(" "));
      return (!search || haystack.includes(search)) && (!feasibility || level === feasibility) && (!availability || agent.availability === availability);
    });

    tableBody.innerHTML = filtered.map(rowMarkup).join("");
    empty.hidden = filtered.length > 0;
    evidence.textContent = `Showing ${filtered.length} of ${catalog.agents.length} records · SAP Discovery Center snapshot ${catalog.snapshotLabel || catalog.snapshotDate || "date not published"} · Feasibility and route are independent architecture assessments; validate interfaces, entitlements, and tenant availability.`;

    document.querySelectorAll("[data-agent-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.agentToggle;
        if (openAgentIds.has(id)) openAgentIds.delete(id);
        else openAgentIds.add(id);
        renderAgentMatrix();
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

  function formatCurrency(value, currency) {
    const maximumFractionDigits = value < 100 ? 2 : 0;
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits
    }).format(value);
  }

  function formatTokenCount(value) {
    if (value >= 1_000_000) return `${formatNumber(value / 1_000_000, 1)}M`;
    if (value >= 1_000) return `${formatNumber(value / 1_000, 1)}K`;
    return formatNumber(value, 0);
  }

  function updateCostCalculator() {
    const tasks = Math.max(0, Number(document.getElementById("tasks-per-year").value) || 0);
    const actions = Math.max(0, Number(document.getElementById("actions-per-task").value) || 0);
    const inputTokens = Math.max(0, Number(document.getElementById("input-tokens").value) || 0);
    const outputTokens = Math.max(0, Number(document.getElementById("output-tokens").value) || 0);
    const [inputRate, outputRate] = document.getElementById("model-rate").value.split(",").map(Number);

    const sapUnits = tasks * actions * 0.02;
    const sapCost = sapUnits * 7;
    const externalTokens = tasks * (inputTokens + outputTokens);
    const externalCost = tasks * ((inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate);

    document.getElementById("sap-runtime-cost").textContent = formatCurrency(sapCost, "EUR");
    document.getElementById("sap-ai-units").textContent = formatNumber(sapUnits, sapUnits < 10 ? 2 : 0);
    document.getElementById("external-runtime-cost").textContent = formatCurrency(externalCost, "USD");
    document.getElementById("external-token-count").textContent = formatTokenCount(externalTokens);
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
