(function () {
  "use strict";

  const records = Array.isArray(window.JOULE_CAPABILITY_RECORDS)
    ? window.JOULE_CAPABILITY_RECORDS
    : [];

  const state = {
    query: "",
    type: "all",
    product: "all",
    domain: "all",
    availability: "all"
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function clean(value, fallback = "Not specified") {
    const normalized = String(value ?? "")
      .replace(/\u201a/g, ",")
      .replace(/\u00a0/g, " ")
      .trim();
    return normalized || fallback;
  }

  function typeLabel(subtype) {
    return subtype === "Named task / general capability"
      ? "Named capability"
      : "Integration / experience";
  }

  function availabilityClass(availability) {
    if (availability === "Beta") return " beta";
    if (availability.includes("Early Adopter")) return " eac";
    return "";
  }

  function renderRecord(record) {
    const availability = clean(record.availability);
    const version = clean(record.minimumRequiredVersion, "No minimum version listed");
    const source = clean(record.source, "https://discovery-center.cloud.sap/ai-catalog/");

    return `
      <article class="capability-record">
        <div class="capability-record-primary">
          <div class="capability-record-tags">
            <span class="capability-record-tag type">${escapeHtml(typeLabel(record.subtype))}</span>
            <span class="capability-record-tag${availabilityClass(availability)}">${escapeHtml(availability)}</span>
          </div>
          <h3>${escapeHtml(clean(record.name))}</h3>
          <p class="capability-record-description">${escapeHtml(clean(record.description))}</p>
          <a class="capability-record-source" href="${escapeHtml(source)}" target="_blank" rel="noreferrer">
            Open SAP catalogue record <i data-lucide="external-link" aria-hidden="true"></i>
          </a>
        </div>
        <div class="capability-record-detail">
          <dl class="capability-record-meta">
            <div><dt>Product</dt><dd>${escapeHtml(clean(record.product))}</dd></div>
            <div><dt>Business domain</dt><dd>${escapeHtml(clean(record.domain))}</dd></div>
            <div><dt>Commercial type</dt><dd>${escapeHtml(clean(record.commercialType))}</dd></div>
            <div><dt>SAP identifier</dt><dd>${escapeHtml(clean(record.identifier))}</dd></div>
            <div><dt>Availability</dt><dd>${escapeHtml(availability)}</dd></div>
            <div><dt>Minimum version</dt><dd>${escapeHtml(version)}</dd></div>
          </dl>
        </div>
      </article>`;
  }

  function normalizedSearch(record) {
    return [record.name, record.description, record.product, record.domain, record.identifier]
      .join(" ")
      .toLocaleLowerCase();
  }

  function filteredRecords() {
    const query = state.query.trim().toLocaleLowerCase();
    return records.filter((record) => {
      if (state.type !== "all" && record.subtype !== state.type) return false;
      if (state.product !== "all" && record.product !== state.product) return false;
      if (state.domain !== "all" && record.domain !== state.domain) return false;
      if (state.availability !== "all" && record.availability !== state.availability) return false;
      return !query || normalizedSearch(record).includes(query);
    });
  }

  function fillSelect(select, values, allLabel) {
    if (!select) return;
    const options = [`<option value="all">${escapeHtml(allLabel)}</option>`]
      .concat(values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`));
    select.innerHTML = options.join("");
  }

  function uniqueSorted(field) {
    return [...new Set(records.map((record) => clean(record[field], "")).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
  }

  function render() {
    const list = document.querySelector("[data-capability-record-list]");
    const empty = document.querySelector("[data-capability-empty]");
    const summary = document.querySelector("[data-capability-result-summary]");
    const matches = filteredRecords();

    if (list) list.innerHTML = matches.map(renderRecord).join("");
    if (empty) empty.hidden = matches.length !== 0;
    if (summary) {
      summary.textContent = matches.length === records.length
        ? `Showing all ${records.length} records`
        : `Showing ${matches.length} of ${records.length} records`;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function reset() {
    state.query = "";
    state.type = "all";
    state.product = "all";
    state.domain = "all";
    state.availability = "all";

    const search = document.querySelector("[data-capability-search]");
    const product = document.querySelector("[data-product-filter]");
    const domain = document.querySelector("[data-domain-filter]");
    const availability = document.querySelector("[data-availability-filter]");

    if (search) search.value = "";
    if (product) product.value = "all";
    if (domain) domain.value = "all";
    if (availability) availability.value = "all";

    document.querySelectorAll("[data-type-filter]").forEach((button) => {
      const active = button.dataset.typeFilter === "all";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    render();
  }

  function initialise() {
    if (records.length !== 81) {
      console.error(`Expected 81 Joule capability records, received ${records.length}.`);
    }

    fillSelect(document.querySelector("[data-product-filter]"), uniqueSorted("product"), "All products");
    fillSelect(document.querySelector("[data-domain-filter]"), uniqueSorted("domain"), "All domains");
    fillSelect(document.querySelector("[data-availability-filter]"), uniqueSorted("availability"), "All availability");

    document.querySelector("[data-capability-search]")?.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
    });

    document.querySelectorAll("[data-type-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.type = button.dataset.typeFilter;
        document.querySelectorAll("[data-type-filter]").forEach((candidate) => {
          const active = candidate === button;
          candidate.classList.toggle("active", active);
          candidate.setAttribute("aria-pressed", String(active));
        });
        render();
      });
    });

    document.querySelector("[data-product-filter]")?.addEventListener("change", (event) => {
      state.product = event.target.value;
      render();
    });

    document.querySelector("[data-domain-filter]")?.addEventListener("change", (event) => {
      state.domain = event.target.value;
      render();
    });

    document.querySelector("[data-availability-filter]")?.addEventListener("change", (event) => {
      state.availability = event.target.value;
      render();
    });

    document.querySelectorAll("[data-reset-capability-filters]").forEach((button) => {
      button.addEventListener("click", reset);
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
