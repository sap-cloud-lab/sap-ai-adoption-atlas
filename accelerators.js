const acceleratorStorageKey = "sap-extensibility-accelerator-selection";
const acceleratorCategoryStorageKey = "sap-extensibility-accelerator-categories";
const acceleratorLaneStorageKey = "sap-extensibility-accelerator-lanes";

const acceleratorState = {
  query: "",
  module: "",
  selectedOnly: false,
  selected: new Set(JSON.parse(localStorage.getItem(acceleratorStorageKey) || "[]")),
  categoryOverrides: JSON.parse(localStorage.getItem(acceleratorCategoryStorageKey) || "{}"),
  laneOverrides: JSON.parse(localStorage.getItem(acceleratorLaneStorageKey) || "{}"),
};

function acceleratorEscapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveAcceleratorSelection() {
  localStorage.setItem(acceleratorStorageKey, JSON.stringify([...acceleratorState.selected]));
}

function saveAcceleratorCategories() {
  localStorage.setItem(acceleratorCategoryStorageKey, JSON.stringify(acceleratorState.categoryOverrides));
}

function saveAcceleratorLanes() {
  localStorage.setItem(acceleratorLaneStorageKey, JSON.stringify(acceleratorState.laneOverrides));
}

function defaultCategoriesForRow(row) {
  return {
    asset: Boolean(String(row.asset || "").trim()),
    accelerator: Boolean(String(row.accelerator || "").trim()),
  };
}

function categoriesForRow(row) {
  return {
    ...defaultCategoriesForRow(row),
    ...(acceleratorState.categoryOverrides[row.id] || {}),
  };
}

function countCategories() {
  return acceleratorRows.reduce(
    (totals, row) => {
      const categories = categoriesForRow(row);
      if (categories.asset) totals.assets += 1;
      if (categories.accelerator) totals.accelerators += 1;
      return totals;
    },
    { assets: 0, accelerators: 0 },
  );
}

function defaultLanesForRow() {
  return {
    inapp: false,
    developer: false,
    side: false,
  };
}

function lanesForRow(row) {
  return {
    ...defaultLanesForRow(row),
    ...(acceleratorState.laneOverrides[row.id] || {}),
  };
}

function countLaneMappedRows() {
  return acceleratorRows.filter((row) => {
    const lanes = lanesForRow(row);
    return lanes.inapp || lanes.developer || lanes.side;
  }).length;
}

function bestAssetTitle(row) {
  return row.asset || row.accelerator || row.assetBusiness || row.gapDetails || "Untitled accelerator";
}

function rowMatches(row) {
  const query = acceleratorState.query.trim().toLowerCase();
  const text = [
    row.module,
    row.productArea,
    row.functionality,
    row.gapType,
    row.gapDetails,
    row.businessGap,
    row.accelerator,
    row.asset,
    row.assetBusiness,
    row.solution,
    row.testScript,
  ]
    .join(" ")
    .toLowerCase();

  if (acceleratorState.module && row.module !== acceleratorState.module) return false;
  if (acceleratorState.selectedOnly && !acceleratorState.selected.has(row.id)) return false;
  return !query || text.includes(query);
}

function detailBlock(label, value) {
  if (!value) return "";
  return `
    <dt>${acceleratorEscapeHtml(label)}</dt>
    <dd>${acceleratorEscapeHtml(value)}</dd>
  `;
}

function renderModuleFilter() {
  const filter = document.getElementById("moduleFilter");
  const modules = [...new Set(acceleratorRows.map((row) => row.module).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );

  filter.innerHTML = `
    <option value="">All modules</option>
    ${modules.map((module) => `<option value="${acceleratorEscapeHtml(module)}">${acceleratorEscapeHtml(module)}</option>`).join("")}
  `;
}

function renderAcceleratorTable() {
  const rows = acceleratorRows.filter(rowMatches);
  const tableBody = document.getElementById("acceleratorTableBody");
  const emptyState = document.getElementById("acceleratorEmptyState");
  const selectedCount = document.getElementById("selectedCount");
  const totalCount = document.getElementById("acceleratorTotal");
  const assetCount = document.getElementById("assetCount");
  const acceleratorCategoryCount = document.getElementById("acceleratorCategoryCount");
  const laneCount = document.getElementById("laneCount");
  const categoryTotals = countCategories();

  selectedCount.textContent = `${acceleratorState.selected.size} selected`;
  totalCount.textContent = `${acceleratorRows.length} rows`;
  assetCount.textContent = `${categoryTotals.assets} assets`;
  acceleratorCategoryCount.textContent = `${categoryTotals.accelerators} accelerators`;
  laneCount.textContent = `${countLaneMappedRows()} lane mapped`;
  emptyState.hidden = rows.length > 0;

  tableBody.innerHTML = rows
    .map((row) => {
      const checked = acceleratorState.selected.has(row.id) ? "checked" : "";
      const categories = categoriesForRow(row);
      const lanes = lanesForRow(row);
      const assetChecked = categories.asset ? "checked" : "";
      const acceleratorChecked = categories.accelerator ? "checked" : "";
      const inappChecked = lanes.inapp ? "checked" : "";
      const developerChecked = lanes.developer ? "checked" : "";
      const sideChecked = lanes.side ? "checked" : "";
      return `
        <tr data-row-id="${acceleratorEscapeHtml(row.id)}">
          <td>
            <label class="include-check">
              <input type="checkbox" data-accelerator-id="${acceleratorEscapeHtml(row.id)}" ${checked} />
              <span>Include</span>
            </label>
          </td>
          <td>
            <div class="category-checks" aria-label="Category">
              <label class="include-check category-check">
                <input type="checkbox" data-category-id="${acceleratorEscapeHtml(row.id)}" data-category-type="asset" ${assetChecked} />
                <span>Asset</span>
              </label>
              <label class="include-check category-check">
                <input type="checkbox" data-category-id="${acceleratorEscapeHtml(row.id)}" data-category-type="accelerator" ${acceleratorChecked} />
                <span>Accelerator</span>
              </label>
            </div>
          </td>
          <td>
            <div class="category-checks lane-checks" aria-label="Extensibility type">
              <label class="include-check category-check lane-check">
                <input type="checkbox" data-lane-id="${acceleratorEscapeHtml(row.id)}" data-lane-type="inapp" ${inappChecked} />
                <span>In-App</span>
              </label>
              <label class="include-check category-check lane-check">
                <input type="checkbox" data-lane-id="${acceleratorEscapeHtml(row.id)}" data-lane-type="developer" ${developerChecked} />
                <span>Dev</span>
              </label>
              <label class="include-check category-check lane-check">
                <input type="checkbox" data-lane-id="${acceleratorEscapeHtml(row.id)}" data-lane-type="side" ${sideChecked} />
                <span>Side-by-Side</span>
              </label>
            </div>
          </td>
          <td>${acceleratorEscapeHtml(row.module)}</td>
          <td>${acceleratorEscapeHtml(row.productArea)}</td>
          <td>${acceleratorEscapeHtml(row.functionality || row.gapType || "Review")}</td>
          <td>
            <strong>${acceleratorEscapeHtml(bestAssetTitle(row))}</strong>
            ${row.assetBusiness ? `<p>${acceleratorEscapeHtml(row.assetBusiness)}</p>` : ""}
          </td>
          <td>
            <details class="row-details">
              <summary>View</summary>
              <dl>
                ${detailBlock("Gap Type", row.gapType)}
                ${detailBlock("Gap Details", row.gapDetails)}
                ${detailBlock("Business Gap", row.businessGap)}
                ${detailBlock("Accelerator", row.accelerator)}
                ${detailBlock("Solution", row.solution)}
                ${detailBlock("Test Script", row.testScript)}
              </dl>
            </details>
          </td>
        </tr>
      `;
    })
    .join("");

  tableBody.querySelectorAll("[data-accelerator-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        acceleratorState.selected.add(checkbox.dataset.acceleratorId);
      } else {
        acceleratorState.selected.delete(checkbox.dataset.acceleratorId);
      }
      saveAcceleratorSelection();
      renderAcceleratorTable();
    });
  });

  tableBody.querySelectorAll("[data-category-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const row = acceleratorRows.find((item) => item.id === checkbox.dataset.categoryId);
      if (!row) return;

      const current = categoriesForRow(row);
      const next = {
        ...current,
        [checkbox.dataset.categoryType]: checkbox.checked,
      };
      const defaults = defaultCategoriesForRow(row);

      if (next.asset === defaults.asset && next.accelerator === defaults.accelerator) {
        delete acceleratorState.categoryOverrides[row.id];
      } else {
        acceleratorState.categoryOverrides[row.id] = next;
      }

      saveAcceleratorCategories();
      renderAcceleratorTable();
    });
  });

  tableBody.querySelectorAll("[data-lane-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const row = acceleratorRows.find((item) => item.id === checkbox.dataset.laneId);
      if (!row) return;

      const next = {
        ...lanesForRow(row),
        [checkbox.dataset.laneType]: checkbox.checked,
      };

      if (!next.inapp && !next.developer && !next.side) {
        delete acceleratorState.laneOverrides[row.id];
      } else {
        acceleratorState.laneOverrides[row.id] = next;
      }

      saveAcceleratorLanes();
      renderAcceleratorTable();
    });
  });
}

function bindAcceleratorControls() {
  document.getElementById("acceleratorSearch")?.addEventListener("input", (event) => {
    acceleratorState.query = event.target.value;
    renderAcceleratorTable();
  });

  document.getElementById("moduleFilter")?.addEventListener("change", (event) => {
    acceleratorState.module = event.target.value;
    renderAcceleratorTable();
  });

  document.getElementById("selectedOnlyToggle")?.addEventListener("click", (event) => {
    acceleratorState.selectedOnly = !acceleratorState.selectedOnly;
    event.currentTarget.setAttribute("aria-pressed", String(acceleratorState.selectedOnly));
    event.currentTarget.textContent = acceleratorState.selectedOnly ? "Show all rows" : "Show selected only";
    renderAcceleratorTable();
  });
}

function renderAcceleratorsPage() {
  renderModuleFilter();
  renderAcceleratorTable();
  bindAcceleratorControls();
}

if (document.body.dataset.page === "checklist") {
  renderAcceleratorsPage();
}
