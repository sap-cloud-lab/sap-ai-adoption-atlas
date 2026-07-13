(function () {
  const sourceRecords = Array.isArray(window.EMBEDDED_AI_RECORDS) ? window.EMBEDDED_AI_RECORDS : [];
  const BATCH_SIZE = 18;

  const moduleDefinitions = [
    { key: "finance", label: "Finance & Accounting" },
    { key: "controlling", label: "Controlling & Performance" },
    { key: "sales", label: "Sales & Customer Service" },
    { key: "procurement", label: "Procurement & Suppliers" },
    { key: "travel", label: "Travel & Expense" },
    { key: "supply-chain", label: "Supply Chain & Manufacturing" },
    { key: "asset-service", label: "Asset & Field Service" },
    { key: "hr", label: "Human Resources" },
    { key: "technology", label: "Technology & Analytics" },
    { key: "transformation", label: "Business Transformation" },
    { key: "product", label: "Product Lifecycle" },
    { key: "sustainability", label: "Sustainability" },
    { key: "cloud-erp", label: "Cross-functional Cloud ERP" },
    { key: "other", label: "Other SAP Applications" }
  ];

  const selectors = {
    catalogue: document.querySelector("[data-embedded-catalogue]"),
    moduleSelect: document.querySelector("[data-embedded-module]"),
    search: document.querySelector("[data-embedded-search]"),
    availability: document.querySelector("[data-embedded-availability]"),
    commercial: document.querySelector("[data-embedded-commercial]"),
    clear: document.querySelector("[data-embedded-clear]"),
    summary: document.querySelector("[data-embedded-summary]"),
    sentinel: document.querySelector("[data-embedded-sentinel]"),
    loadMore: document.querySelector("[data-embedded-load-more]"),
    complete: document.querySelector("[data-embedded-complete]")
  };

  if (!selectors.catalogue || !selectors.moduleSelect || !sourceRecords.length) {
    if (selectors.catalogue) {
      selectors.catalogue.innerHTML = '<div class="embedded-empty-state">The embedded AI catalogue could not be loaded.</div>';
    }
    return;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizedText(record) {
    return `${record.name} ${record.description} ${record.product} ${record.domain}`.toLowerCase();
  }

  function includesAny(text, terms) {
    return terms.some((term) => text.includes(term));
  }

  function classifyModule(record) {
    const text = normalizedText(record);
    const domain = String(record.domain || "").toLowerCase();

    const performancePlanning = includesAny(text, ["cost center", "profit center", "controlling", "management accounting", "product cost", "overhead", "margin analysis", "allocation", "financial planning", "enterprise performance", "predictive planning", "budget", "variance"]);
    const financialForecasting = domain.includes("financial management") && includesAny(text, ["forecast", "planning", "scenario", "performance"]);

    if (performancePlanning || financialForecasting) {
      return "controlling";
    }
    if (includesAny(text, ["concur", "travel", "expense report", "expense management", "corporate card"])) {
      return "travel";
    }
    if (includesAny(text, ["procurement", "purchase order", "purchase requisition", "requisition", "sourcing", "supplier", "guided buying", "spend management", "sap ariba", "invoice management"]) || domain.includes("spend management") || domain.includes("supplier management")) {
      return "procurement";
    }
    if (includesAny(text, ["sales cloud", "service cloud", "sales order", "sales quote", "opportunity", "customer service", "customer relationship", "commerce", "marketing", "account synopsis", "service agent"]) || domain.includes("customer relationship")) {
      return "sales";
    }
    if (includesAny(text, ["field service", "asset management", "maintenance", "equipment", "service technician", "work order"])) {
      return "asset-service";
    }
    if (includesAny(text, ["successfactors", "employee", "workforce", "recruit", "talent", "skills", "payroll", "human capital"]) || domain.includes("human capital")) {
      return "hr";
    }
    if (includesAny(text, ["product lifecycle", "product development", "product design", "engineering", "specification management"]) || domain.includes("product lifecycle")) {
      return "product";
    }
    if (includesAny(text, ["sustainability", "carbon", "green ledger", "emission"]) || domain.includes("sustainability")) {
      return "sustainability";
    }
    if (domain.includes("financial management") || includesAny(text, ["accounting", "accounts payable", "accounts receivable", "cash application", "treasury", "tax", "financial close", "journal", "invoice", "bank statement", "credit management"])) {
      return "finance";
    }
    if (domain.includes("supply chain") || includesAny(text, ["supply chain", "manufacturing", "warehouse", "inventory", "logistics", "production", "demand planning", "integrated business planning", "quality management"])) {
      return "supply-chain";
    }
    if (domain.includes("technology platform") || includesAny(text, ["analytics cloud", "datasphere", "business data cloud", "data intelligence", "walkme", "business technology platform"])) {
      return "technology";
    }
    if (domain.includes("business transformation") || includesAny(text, ["signavio", "leanix", "business transformation"])) {
      return "transformation";
    }
    if (domain.includes("cloud erp")) {
      return "cloud-erp";
    }
    return "other";
  }

  function moduleLabel(key) {
    return moduleDefinitions.find((module) => module.key === key)?.label || "Other SAP Applications";
  }

  function editionEvidence(record) {
    const product = String(record.product || "").trim();
    const normalizedProduct = product.toLowerCase().replace(/[‚‘’]/g, ",");
    const publicEdition = normalizedProduct.includes("s/4hana cloud public edition");
    const privateEdition = normalizedProduct.includes("s/4hana cloud private edition") || normalizedProduct.includes("s/4hana cloud, private edition");
    const s4hana = normalizedProduct.includes("s/4hana");

    if (publicEdition) {
      return {
        publicCloud: { tone: "confirmed", label: "Confirmed", detail: "SAP source explicitly lists S/4HANA Cloud Public Edition." },
        privateCloud: { tone: "not-confirmed", label: "Not confirmed", detail: "This record does not establish Private Edition availability." }
      };
    }

    if (privateEdition) {
      return {
        publicCloud: { tone: "not-confirmed", label: "Not confirmed", detail: "This record does not establish Public Edition availability." },
        privateCloud: { tone: "confirmed", label: "Confirmed", detail: "SAP source explicitly lists S/4HANA Cloud Private Edition." }
      };
    }

    if (s4hana) {
      return {
        publicCloud: { tone: "verify", label: "Verify edition", detail: "The record names S/4HANA but not Public Edition." },
        privateCloud: { tone: "verify", label: "Verify edition", detail: "The record names S/4HANA but not Private Edition." }
      };
    }

    return {
      publicCloud: {
        tone: "separate-product",
        label: "Separate SAP product",
        detail: product ? `Delivered in ${product}; this record does not assert Public Edition.` : "No S/4HANA cloud edition is stated."
      },
      privateCloud: {
        tone: "separate-product",
        label: "Separate SAP product",
        detail: product ? `Delivered in ${product}; this record does not assert Private Edition.` : "No S/4HANA cloud edition is stated."
      }
    };
  }

  const moduleOrder = new Map(moduleDefinitions.map((module, index) => [module.key, index]));
  const records = sourceRecords
    .map((record, index) => ({
      ...record,
      key: record.source || record.identifier || `${record.name}-${record.product}-${index}`,
      moduleKey: classifyModule(record),
      searchText: normalizedText(record) + ` ${record.identifier} ${record.availability} ${record.commercialType}`.toLowerCase()
    }))
    .sort((a, b) => {
      const moduleDifference = moduleOrder.get(a.moduleKey) - moduleOrder.get(b.moduleKey);
      return moduleDifference || a.name.localeCompare(b.name) || a.product.localeCompare(b.product);
    });

  const state = {
    moduleKey: "",
    search: "",
    availability: "",
    commercial: "",
    visibleLimit: BATCH_SIZE
  };

  const moduleCounts = records.reduce((counts, record) => {
    counts.set(record.moduleKey, (counts.get(record.moduleKey) || 0) + 1);
    return counts;
  }, new Map());

  function filteredRecords() {
    return records.filter((record) => {
      if (state.moduleKey && record.moduleKey !== state.moduleKey) return false;
      if (state.search && !record.searchText.includes(state.search)) return false;
      if (state.availability && record.availabilityGroup !== state.availability) return false;
      const commercial = record.commercialType || "Unspecified";
      if (state.commercial && commercial !== state.commercial) return false;
      return true;
    });
  }

  function editionMarkup(label, evidence) {
    return `
      <div class="embedded-edition-row">
        <span class="embedded-edition-label">${escapeHtml(label)}</span>
        <div class="embedded-edition-copy">
          <strong class="${escapeHtml(evidence.tone)}">${escapeHtml(evidence.label)}</strong>
          <small>${escapeHtml(evidence.detail)}</small>
        </div>
      </div>
    `;
  }

  function availabilityTone(record) {
    if (record.availabilityGroup === "Generally Available") return "ga";
    if (record.availabilityGroup === "Beta") return "beta";
    return "eac";
  }

  function cardMarkup(record) {
    const editions = editionEvidence(record);
    const commercial = record.commercialType || "Unspecified";
    const version = record.minimumRequiredVersion || "Not stated in source record";
    const identifier = record.identifier || "Not stated";
    const availability = record.availabilityGroup || record.availability || "Not stated";

    return `
      <article class="embedded-card">
        <div class="embedded-card-top">
          <span class="embedded-card-icon"><i data-lucide="sparkles" aria-hidden="true"></i></span>
          <span class="embedded-status ${availabilityTone(record)}">${escapeHtml(availability)}</span>
        </div>
        <h4>${escapeHtml(record.name)}</h4>
        <p class="embedded-domain">${escapeHtml(moduleLabel(record.moduleKey))} <span aria-hidden="true">&middot;</span> ${escapeHtml(record.domain || "Domain not stated")}</p>
        <p class="embedded-card-description">${escapeHtml(record.description || "No description is stated in the source record.")}</p>
        <div class="embedded-product-line">
          <div><span>SAP product</span><strong>${escapeHtml(record.product || "Not stated")}</strong></div>
          <span class="embedded-commercial">${escapeHtml(commercial)}</span>
        </div>
        <div class="embedded-editions" aria-label="Public Cloud and Private Cloud evidence">
          ${editionMarkup("Public Cloud", editions.publicCloud)}
          ${editionMarkup("Private Cloud", editions.privateCloud)}
        </div>
        <p class="embedded-availability-note"><i data-lucide="calendar-clock" aria-hidden="true"></i><span>Minimum version: ${escapeHtml(version)}</span></p>
        <div class="embedded-card-actions">
          <a class="embedded-source-link" href="${escapeHtml(record.source)}" target="_blank" rel="noreferrer">
            <span>Open SAP source</span><i data-lucide="external-link" aria-hidden="true"></i>
          </a>
          <span class="embedded-record-id">${escapeHtml(identifier)}</span>
        </div>
      </article>
    `;
  }

  function populateModuleSelect() {
    selectors.moduleSelect.innerHTML = [
      '<option value="">All modules</option>',
      ...moduleDefinitions
        .filter((module) => moduleCounts.get(module.key))
        .map((module) => `<option value="${module.key}">${escapeHtml(module.label)} (${moduleCounts.get(module.key)})</option>`)
    ].join("");
    selectors.moduleSelect.value = state.moduleKey;
  }

  function renderCatalogue() {
    const filtered = filteredRecords();
    const visible = filtered.slice(0, state.visibleLimit);

    if (!visible.length) {
      selectors.catalogue.innerHTML = '<div class="embedded-empty-state"><strong>No embedded AI record matches these filters.</strong><br />Try a broader search or clear one of the filters.</div>';
    } else {
      const grouped = visible.reduce((groups, record) => {
        if (!groups.has(record.moduleKey)) groups.set(record.moduleKey, []);
        groups.get(record.moduleKey).push(record);
        return groups;
      }, new Map());

      selectors.catalogue.innerHTML = moduleDefinitions
        .filter((module) => grouped.has(module.key))
        .map((module) => {
          const visibleInModule = grouped.get(module.key);
          const matchingInModule = filtered.filter((record) => record.moduleKey === module.key).length;
          const countText = visibleInModule.length === matchingInModule ? `${matchingInModule} records` : `${visibleInModule.length} of ${matchingInModule}`;
          return `
            <section class="embedded-module-section" aria-labelledby="embedded-module-${module.key}">
              <div class="embedded-module-heading">
                <h3 id="embedded-module-${module.key}">${escapeHtml(module.label)}</h3>
                <span>${countText}</span>
              </div>
              <div class="embedded-card-grid">${visibleInModule.map(cardMarkup).join("")}</div>
            </section>
          `;
        })
        .join("");
    }

    const shown = Math.min(visible.length, filtered.length);
    selectors.summary.textContent = `Showing ${shown} of ${filtered.length} matching records \u00b7 ${records.length} total`;
    const complete = shown >= filtered.length;
    selectors.loadMore.hidden = complete || !filtered.length;
    selectors.complete.hidden = !complete || !filtered.length;

    document.querySelectorAll("[data-embedded-total]").forEach((node) => {
      node.textContent = String(records.length);
    });

    if (window.lucide) {
      window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
    }
  }

  function resetVisibleAndRender() {
    state.visibleLimit = BATCH_SIZE;
    renderCatalogue();
  }

  function loadMore() {
    const filtered = filteredRecords();
    if (state.visibleLimit >= filtered.length) return;
    state.visibleLimit = Math.min(state.visibleLimit + BATCH_SIZE, filtered.length);
    renderCatalogue();
  }

  selectors.moduleSelect.addEventListener("change", () => {
    state.moduleKey = selectors.moduleSelect.value;
    resetVisibleAndRender();
  });

  selectors.search.addEventListener("input", () => {
    state.search = selectors.search.value.trim().toLowerCase();
    resetVisibleAndRender();
  });

  selectors.availability.addEventListener("change", () => {
    state.availability = selectors.availability.value;
    resetVisibleAndRender();
  });

  selectors.commercial.addEventListener("change", () => {
    state.commercial = selectors.commercial.value;
    resetVisibleAndRender();
  });

  selectors.clear.addEventListener("click", () => {
    state.moduleKey = "";
    state.search = "";
    state.availability = "";
    state.commercial = "";
    selectors.search.value = "";
    selectors.moduleSelect.value = "";
    selectors.availability.value = "";
    selectors.commercial.value = "";
    resetVisibleAndRender();
  });

  selectors.loadMore.addEventListener("click", loadMore);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMore();
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(selectors.sentinel);
  }

  populateModuleSelect();
  renderCatalogue();
})();
