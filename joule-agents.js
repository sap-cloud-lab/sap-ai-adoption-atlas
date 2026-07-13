(function () {
  const catalog = window.jouleAgentCatalog;
  const landscape = window.jouleProcessLandscape;
  const grid = document.querySelector("[data-process-grid]");
  const preview = document.querySelector("[data-process-preview]");

  if (!catalog || !landscape || !grid || !preview) return;

  const agentsById = new Map(catalog.agents.map((agent) => [agent.id, agent]));
  const search = document.querySelector("[data-process-search]");
  const empty = document.querySelector("[data-agent-empty]");
  const resultSummary = document.querySelector("[data-result-summary]");
  const statusButtons = [...document.querySelectorAll("[data-status-filter]")];
  const resetButtons = [...document.querySelectorAll("[data-reset-filters]")];

  const state = {
    query: "",
    selectedId: "",
    status: "all"
  };
  let lastPreviewTrigger = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function linkedAgents(process) {
    return process.agentIds.map((id) => agentsById.get(id)).filter(Boolean);
  }

  function isEnabled(process) {
    return process.source !== "process-only";
  }

  function searchableText(process) {
    const agents = linkedAgents(process);
    return [
      process.label,
      process.description,
      ...agents.flatMap((agent) => [agent.id, agent.displayName, agent.description, agent.category, ...agent.products])
    ]
      .join(" ")
      .toLocaleLowerCase();
  }

  function matches(process) {
    const query = state.query.trim().toLocaleLowerCase();
    if (query && !searchableText(process).includes(query)) return false;
    if (state.status === "agent-enabled" && !isEnabled(process)) return false;
    if (state.status === "process-only" && isEnabled(process)) return false;
    return true;
  }

  function processWeight(label) {
    if (label.length <= 13) return 0.8;
    if (label.length <= 22) return 1;
    if (label.length <= 30) return 1.45;
    if (label.length <= 40) return 1.9;
    return 2.3;
  }

  function inactiveMarkup(process) {
    return `
      <div
        class="process-tile process-only"
        aria-label="${escapeHtml(process.label)} — no mapped agent in this SAP presentation landscape"
      >
        <span>${escapeHtml(process.label)}</span>
      </div>
    `;
  }

  function activeAccessibleName(process) {
    const agents = linkedAgents(process);
    if (agents.length) {
      return `${process.label} — agent available: ${agents.map((agent) => agent.displayName).join(", ")}`;
    }
    return `${process.label} — highlighted in the SAP presentation; no standalone current Discovery Center agent record is mapped`;
  }

  function activeMarkup(process) {
    const isSelected = process.id === state.selectedId;
    return `
      <button
        class="process-tile agent-enabled ${process.source === "portfolio" ? "portfolio-agent" : "catalog-agent"} ${isSelected ? "active" : ""}"
        type="button"
        data-process-id="${escapeHtml(process.id)}"
        aria-label="${escapeHtml(activeAccessibleName(process))}"
        aria-pressed="${isSelected ? "true" : "false"}"
      >
        <span>${escapeHtml(process.label)}</span>
        <small>${process.source === "catalog" ? "Agent" : "SAP"}</small>
      </button>
    `;
  }

  function rowMarkup(processes, rowIndex) {
    return `
      <ul class="process-row" aria-label="Business process row ${rowIndex + 1}">
        ${processes
          .map(
            (process) => `
              <li style="--process-weight: ${processWeight(process.label)}">
                ${isEnabled(process) ? activeMarkup(process) : inactiveMarkup(process)}
              </li>
            `
          )
          .join("")}
      </ul>
    `;
  }

  function highlightedResultsMarkup(processes) {
    return `
      <ul class="process-row filtered-process-grid" aria-label="Highlighted business processes">
        ${processes
          .map(
            (process) => `
              <li>
                ${activeMarkup(process)}
              </li>
            `
          )
          .join("")}
      </ul>
    `;
  }

  function previewMarkup(process) {
    const agents = linkedAgents(process);
    const isCatalogProcess = agents.length > 0;
    const primaryAgent = agents[0];
    const products = [...new Set(agents.flatMap((agent) => agent.products))];
    const title = primaryAgent?.displayName || "SAP presentation-highlighted capability";
    const description = primaryAgent?.description || process.description;
    const url = primaryAgent?.catalogUrl || process.officialUrl;
    const status = primaryAgent?.availability || "No standalone current agent record mapped";
    const source = isCatalogProcess ? "SAP Discovery Center" : "SAP presentation and Financial Closing Assistant portfolio";

    return `
      <div class="process-drawer-heading">
        <div>
          <span class="process-drawer-source">${escapeHtml(source)}</span>
          <h2>${escapeHtml(process.label)}</h2>
        </div>
        <button type="button" class="process-drawer-close" data-close-process-preview aria-label="Close process preview">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
      </div>
      <p class="process-drawer-agent">${escapeHtml(title)}</p>
      <p class="process-drawer-description">${escapeHtml(description)}</p>
      <dl>
        <div><dt>Status</dt><dd>${escapeHtml(status)}</dd></div>
        <div><dt>Source</dt><dd>${escapeHtml(source)}</dd></div>
        <div><dt>Product</dt><dd>${escapeHtml(products.length ? products.join(", ") : "Financial Closing Assistant portfolio")}</dd></div>
        <div><dt>Record</dt><dd>${escapeHtml(primaryAgent?.id || "Not a standalone Discovery Center record")}</dd></div>
      </dl>
      <a class="agent-preview-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">
        <span>${isCatalogProcess ? "Open official SAP record" : "Open SAP portfolio source"}</span>
        <i data-lucide="external-link" aria-hidden="true"></i>
      </a>
    `;
  }

  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
  }

  function closePreview({ restoreFocus = false } = {}) {
    state.selectedId = "";
    preview.hidden = true;
    preview.classList.remove("open");
    grid.querySelectorAll("[data-process-id]").forEach((tile) => {
      tile.classList.remove("active");
      tile.setAttribute("aria-pressed", "false");
    });
    if (restoreFocus && lastPreviewTrigger?.isConnected) {
      lastPreviewTrigger.focus({ preventScroll: true });
    }
    lastPreviewTrigger = null;
  }

  function openPreview(processId, trigger) {
    const process = landscape.processes.find((item) => item.id === processId);
    if (!process || !isEnabled(process)) return;

    state.selectedId = processId;
    lastPreviewTrigger = trigger instanceof HTMLElement ? trigger : lastPreviewTrigger;
    preview.innerHTML = previewMarkup(process);
    preview.hidden = false;
    preview.classList.add("open");

    grid.querySelectorAll("[data-process-id]").forEach((tile) => {
      const selected = tile.dataset.processId === processId;
      tile.classList.toggle("active", selected);
      tile.setAttribute("aria-pressed", String(selected));
    });

    const close = preview.querySelector("[data-close-process-preview]");
    close?.addEventListener("click", () => closePreview({ restoreFocus: true }));
    refreshIcons();
  }

  function bindActiveTiles() {
    grid.querySelectorAll("[data-process-id]").forEach((tile) => {
      const activate = () => openPreview(tile.dataset.processId, tile);
      tile.addEventListener("mouseenter", activate);
      tile.addEventListener("focus", activate);
      tile.addEventListener("click", activate);
    });
  }

  function render() {
    const visibleRows = landscape.rows
      .map((row) => row.filter(matches))
      .filter((row) => row.length > 0);
    const visible = visibleRows.flat();
    const enabledVisible = visible.filter(isEnabled).length;

    grid.innerHTML = state.status === "agent-enabled"
      ? highlightedResultsMarkup(visible)
      : visibleRows.map(rowMarkup).join("");
    grid.hidden = visible.length === 0;
    empty.hidden = visible.length !== 0;

    const processNoun = visible.length === 1 ? "process tile" : "process tiles";
    if (visible.length === landscape.counts.all) {
      resultSummary.textContent = `Showing all ${visible.length} ${processNoun} · ${enabledVisible} highlighted`;
    } else {
      resultSummary.textContent = `Showing ${visible.length} ${processNoun} · ${enabledVisible} highlighted`;
    }

    if (state.selectedId && !visible.some((process) => process.id === state.selectedId)) closePreview();

    bindActiveTiles();
    refreshIcons();
  }

  function setStatus(status) {
    state.status = status;
    statusButtons.forEach((button) => {
      const active = button.dataset.statusFilter === status;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    render();
  }

  function resetFilters() {
    state.query = "";
    search.value = "";
    closePreview();
    setStatus("all");
    search.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-process-count="all"]').forEach((node) => {
    node.textContent = landscape.counts.all;
  });
  document.querySelectorAll('[data-process-count="agent-enabled"]').forEach((node) => {
    node.textContent = landscape.counts.enabled;
  });
  document.querySelectorAll('[data-process-count="process-only"]').forEach((node) => {
    node.textContent = landscape.counts.processOnly;
  });
  document.querySelectorAll("[data-snapshot-label]").forEach((node) => {
    node.textContent = catalog.snapshotLabel;
  });

  search.addEventListener("input", () => {
    state.query = search.value;
    render();
  });
  statusButtons.forEach((button) => {
    button.addEventListener("click", () => setStatus(button.dataset.statusFilter));
  });
  resetButtons.forEach((button) => button.addEventListener("click", resetFilters));

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      search.focus();
    }

    if (event.key === "Escape") {
      if (document.activeElement === search && search.value) {
        search.value = "";
        state.query = "";
        render();
      } else if (!preview.hidden) {
        closePreview({ restoreFocus: true });
      }
    }
  });

  render();
})();
