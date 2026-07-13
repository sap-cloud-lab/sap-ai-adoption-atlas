(function () {
  const content = window.atlasContent;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function layerLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function releaseLabel(value) {
    return { available: "Current", release: "Release dependent", watch: "Watch" }[value] || value;
  }

  function commercialLabel(value) {
    return {
      base: "Base entitlement candidate",
      "ai-units": "AI Units / metered",
      license: "License or subscription",
      validate: "Validate per tenant"
    }[value] || value;
  }

  function listMarkup(items) {
    return `<ul class="atlas-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function capabilityMarkup(item) {
    return `
      <article class="atlas-capability">
        <div class="atlas-tag-row">
          <span class="atlas-tag layer">${escapeHtml(layerLabel(item.layer))}</span>
          <span class="atlas-tag">${escapeHtml(item.category)}</span>
          <span class="atlas-tag">${escapeHtml(releaseLabel(item.release))}</span>
        </div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <dl class="atlas-capability-meta">
          <div><dt>Access</dt><dd>${escapeHtml(item.access)}</dd></div>
          <div><dt>Public Cloud</dt><dd>${escapeHtml(item.publicCloud)}</dd></div>
          <div><dt>Private Cloud</dt><dd>${escapeHtml(item.privateCloud)}</dd></div>
          <div><dt>Commercial</dt><dd>${escapeHtml(commercialLabel(item.commercial))}</dd></div>
        </dl>
        <details>
          <summary>Adoption and readiness</summary>
          <div class="atlas-check-grid">
            <div><h4>Adoption path</h4>${listMarkup(item.adoption)}</div>
            <div><h4>Readiness checks</h4>${listMarkup(item.checks)}</div>
          </div>
        </details>
        <a class="atlas-source-link" href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">
          Open SAP source <i data-lucide="external-link" aria-hidden="true"></i>
        </a>
      </article>
    `;
  }

  function renderCapabilities() {
    if (!content) return;

    document.querySelectorAll("[data-capability-list]").forEach((container) => {
      const categories = (container.dataset.categories || "")
        .split("|")
        .map((value) => value.trim())
        .filter(Boolean);
      const items = categories.length
        ? content.capabilities.filter((item) => categories.includes(item.category))
        : content.capabilities;

      container.innerHTML = items.map(capabilityMarkup).join("");
      document.querySelectorAll("[data-capability-count]").forEach((node) => {
        if (node.dataset.capabilityCount === container.dataset.capabilityList) {
          node.textContent = String(items.length);
        }
      });
    });
  }

  function renderReleaseItems() {
    if (!content) return;
    document.querySelectorAll("[data-release-list]").forEach((container) => {
      container.innerHTML = content.releaseItems
        .map(
          (item) => `
            <article class="atlas-release-item">
              <strong>${escapeHtml(item.status)}: ${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.text)}</p>
            </article>
          `
        )
        .join("");
    });
  }

  function renderSources() {
    if (!content) return;
    document.querySelectorAll("[data-source-registry]").forEach((container) => {
      const types = (container.dataset.sourceTypes || "")
        .split("|")
        .map((value) => value.trim())
        .filter(Boolean);
      const items = types.length ? content.sources.filter((item) => types.includes(item.type)) : content.sources;

      container.innerHTML = items
        .map(
          (item) => `
            <a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.type)}</span>
            </a>
          `
        )
        .join("");
    });
  }

  renderCapabilities();
  renderReleaseItems();
  renderSources();

  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }
})();
