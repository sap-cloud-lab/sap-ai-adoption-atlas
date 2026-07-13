const assetFilterState = {
  query: "",
  lanes: new Set(),
  categories: new Set(),
};

function getVisibleAssets() {
  return window.customerAssetItems || [];
}

function assetEscapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function assetDetailUrl(asset) {
  return `detail.html?type=asset&id=${encodeURIComponent(asset.id)}`;
}

function assetUniqueValues(key) {
  return [...new Set(getVisibleAssets().map((asset) => asset[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );
}

function assetMatches(asset) {
  const query = assetFilterState.query.trim().toLowerCase();
  const haystack = [
    asset.title,
    asset.lane,
    asset.sourceType,
    asset.category,
    asset.sourceType,
    asset.useCase,
    asset.shortDescription,
    asset.whenToUse,
    asset.summary,
    asset.implementation.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  if (query && !haystack.includes(query)) return false;
  if (assetFilterState.lanes.size && !assetFilterState.lanes.has(asset.lane)) return false;
  if (assetFilterState.categories.size && !assetFilterState.categories.has(asset.category || asset.sourceType)) return false;
  return true;
}

function renderAssetFilterOptions() {
  const laneFilters = document.getElementById("assetLaneFilters");
  const sourceFilters = document.getElementById("assetSourceFilters");
  if (!laneFilters || !sourceFilters) return;

  laneFilters.innerHTML = assetUniqueValues("lane")
    .map(
      (lane) => `
        <button class="filter-option" type="button" data-asset-filter-group="lane" data-asset-filter-value="${assetEscapeHtml(lane)}">
          ${assetEscapeHtml(lane)}
        </button>
      `,
    )
    .join("");

  sourceFilters.innerHTML = assetUniqueValues("category")
    .map(
      (category) => `
        <button class="filter-option" type="button" data-asset-filter-group="category" data-asset-filter-value="${assetEscapeHtml(category)}">
          ${assetEscapeHtml(category)}
        </button>
      `,
    )
    .join("");
}

function renderAssetFilterStates() {
  document.querySelectorAll("[data-asset-filter-group]").forEach((button) => {
    const targetSet = button.dataset.assetFilterGroup === "lane" ? assetFilterState.lanes : assetFilterState.categories;
    button.classList.toggle("selected", targetSet.has(button.dataset.assetFilterValue));
  });
}

function renderAssetCards() {
  const visibleAssets = getVisibleAssets();
  const filteredAssets = visibleAssets.filter(assetMatches);
  const countText =
    filteredAssets.length === visibleAssets.length
      ? `${visibleAssets.length} assets`
      : `${filteredAssets.length} of ${visibleAssets.length} assets`;

  document.getElementById("assetCount").textContent = countText;
  document.getElementById("assetEmptyState").hidden = filteredAssets.length > 0;

  document.getElementById("assetGrid").innerHTML = filteredAssets
    .map(
      (asset) => `
        <a class="asset-card card-link" href="${assetEscapeHtml(assetDetailUrl(asset))}" aria-label="View implementation guide for ${assetEscapeHtml(asset.title)}">
          <span class="asset-lane" data-lane="${assetEscapeHtml(asset.laneKey)}">${assetEscapeHtml(asset.lane)}</span>
          <h3>${assetEscapeHtml(asset.title)}</h3>
          <p>${assetEscapeHtml(asset.shortDescription || asset.useCase)}</p>
          <div class="meta-row">
            <span class="pill">${assetEscapeHtml(asset.category || asset.sourceType)}</span>
            <span class="pill">${asset.sources.length} ref${asset.sources.length === 1 ? "" : "s"}</span>
          </div>
          <span class="sample-link setup-link">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3h7l4 4v14H7z" />
              <path d="M14 3v5h5" />
            </svg>
            View implementation
          </span>
        </a>
      `,
    )
    .join("");
}

function bindAssetControls() {
  const searchInput = document.getElementById("assetSearch");
  searchInput?.addEventListener("input", () => {
    assetFilterState.query = searchInput.value;
    renderAssetCards();
  });

  document.querySelectorAll("[data-asset-filter-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetSet = button.dataset.assetFilterGroup === "lane" ? assetFilterState.lanes : assetFilterState.categories;
      if (targetSet.has(button.dataset.assetFilterValue)) {
        targetSet.delete(button.dataset.assetFilterValue);
      } else {
        targetSet.add(button.dataset.assetFilterValue);
      }
      renderAssetFilterStates();
      renderAssetCards();
    });
  });

  document.querySelectorAll("[data-filter-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(`${button.dataset.filterToggle}Filters`);
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      target.hidden = expanded;
    });
  });

  const filterToggle = document.getElementById("assetFilterToggle");
  const assetBrowser = document.querySelector(".asset-browser");
  filterToggle?.addEventListener("click", () => {
    const collapsed = assetBrowser.classList.toggle("filters-collapsed");
    filterToggle.setAttribute("aria-expanded", String(!collapsed));
    filterToggle.textContent = collapsed ? "Show filters" : "Hide filters";
  });
}

function renderAssetsPage() {
  renderAssetFilterOptions();
  renderAssetFilterStates();
  renderAssetCards();
  bindAssetControls();
}

if (document.body.dataset.page === "assets") {
  renderAssetsPage();
}
