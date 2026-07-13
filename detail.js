function detailEscapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function detailSlugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferInAppTool(sample) {
  const text = `${sample.title} ${sample.description} ${sample.pattern}`.toLowerCase();
  if (text.includes("email")) return "Maintain Email Templates and the relevant output management configuration";
  if (text.includes("custom field") || text.includes("purchasing")) return "Custom Fields and Logic, with UI/report/API enablement";
  if (text.includes("logic") || text.includes("validation") || text.includes("time")) return "Custom Logic at the released business context or BAdI";
  if (text.includes("report") || text.includes("analy")) return "Custom Analytical Queries, Custom CDS Views, or released analytical data sources";
  if (text.includes("edi") || text.includes("integration")) return "Custom Fields and integration mapping through the supported business scenario";
  return "the smallest available key-user extensibility app for the target business context";
}

function sampleImplementation(laneKey, sample) {
  if (laneKey === "inapp") {
    const tool = inferInAppTool(sample);
    return [
      `Confirm the SAP S/4HANA business process and the exact place where "${sample.title}" should appear or behave differently.`,
      `Use ${tool}; check the target app, business context, output, report, or API is actually extensible.`,
      "Build the change in the customizing tenant, publish it, and test with the business role that will use it.",
      "Use the GitHub drill-down/source as a scenario reference, then document the final field, logic, template, report, or mapping used in your tenant.",
    ];
  }

  if (laneKey === "developer") {
    return [
      `Review the sample repository to understand the ABAP Cloud/RAP pattern behind "${sample.title}".`,
      "Set up the SAP S/4HANA Cloud ABAP development tenant, ADT access, package, IAM app, and transport/lifecycle path.",
      "Implement only with released APIs, released CDS views, released BAdIs, RAP behavior, and ABAP Cloud language rules.",
      "Preview or expose the service/UI, test authorization and behavior, then move it through the public-cloud development lifecycle.",
    ];
  }

  return [
    `Review the repository architecture for "${sample.title}" and identify which part runs on SAP BTP versus SAP S/4HANA Cloud.`,
    "Find the required SAP S/4HANA Cloud APIs, events, communication scenarios, and authentication/destination setup.",
    "Provision the needed BTP services, deploy the app or workflow, and connect it securely to the S/4HANA Cloud tenant.",
    "Test business data flow end to end, including retries, errors, monitoring, and the final user entry point.",
  ];
}

function findSampleDetail(params) {
  const laneKey = params.get("lane") || "inapp";
  const sampleId = params.get("id") || "";
  const from = params.get("from") || "";
  const lane = lanes[laneKey];
  if (!lane) return null;

  const sample = lane.samples.find((candidate) => candidate.id === sampleId || detailSlugify(candidate.title) === sampleId);
  if (!sample) return null;

  return {
    kind: "sample",
    title: sample.title,
    lane: lane.label,
    laneKey,
    sourceType:
      sample.sourceType || (sample.status === "Historical scenario" ? "GitHub Drill-down" : "GitHub Repo"),
    summary: sample.summary || sample.function || sample.description,
    useCase: sample.useCase || sample.description,
    whenToUse:
      sample.whenToUse ||
      (laneKey === "inapp"
        ? "Choose this when the requirement can stay inside SAP S/4HANA key-user tooling and does not need a separate app or deep custom ABAP."
        : laneKey === "developer"
          ? "Choose this when the extension needs ABAP Cloud, RAP, released APIs, released CDS views, or released BAdIs on the S/4HANA stack."
          : "Choose this when the solution should run separately on SAP BTP or another side runtime while consuming S/4HANA Cloud APIs or events."),
    implementation: sample.implementation || sampleImplementation(laneKey, sample),
    technicalNotes: sample.technicalNotes || null,
    sources: sample.sources || [
      {
        label: sample.linkLabel || "Open GitHub source",
        url: sample.url,
      },
    ],
    backUrl: from === "accelerators" ? "accelerators.html" : `samples.html?lane=${encodeURIComponent(laneKey)}`,
    backLabel: from === "accelerators" ? "Back to accelerators" : `Back to ${lane.label} samples`,
  };
}

function findAssetDetail(params) {
  const assetId = params.get("id") || "";
  const asset = (window.customerAssetItems || []).find((candidate) => candidate.id === assetId);
  if (!asset) return null;

  return {
    kind: "asset",
    title: asset.title,
    lane: asset.lane,
    laneKey: asset.laneKey,
    sourceType: asset.sourceType,
    summary: asset.summary,
    useCase: asset.useCase,
    whenToUse: asset.whenToUse,
    implementation: asset.implementation,
    technicalNotes: asset.technicalNotes || null,
    sources: asset.sources,
    backUrl: "assets.html",
    backLabel: "Back to assets",
  };
}

function getDetailItem() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type") || "sample";
  return type === "asset" ? findAssetDetail(params) : findSampleDetail(params);
}

function renderSourceLinks(item) {
  const sourceList = document.getElementById("sourceList");
  sourceList.innerHTML = item.sources
    .map(
      (source) =>
        source.url
          ? `
            <a class="source-link" href="${detailEscapeHtml(source.url)}" target="_blank" rel="noreferrer">
              <span>${detailEscapeHtml(source.label)}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          `
          : `
            <div class="source-link source-placeholder">
              <span>${detailEscapeHtml(source.label)}</span>
              <small>To be linked later</small>
            </div>
          `,
    )
    .join("");

  const linkedSources = item.sources.filter((source) => source.url);
  document.getElementById("detailPrimaryActions").innerHTML = linkedSources.length
    ? linkedSources
        .slice(0, 2)
    .map(
      (source, index) => `
        <a class="${index === 0 ? "primary-action" : "secondary-action"}" href="${detailEscapeHtml(source.url)}" target="_blank" rel="noreferrer">
          ${index === 0 ? "Open source" : "Open reference"}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
      `,
    )
        .join("")
    : `
        <span class="secondary-action disabled-action">
          Source code pending
        </span>
      `;
}

function renderDetailPage() {
  const item = getDetailItem();
  if (!item) {
    document.title = "Not Found - Extensibility Explorer";
    document.querySelector(".detail-page").innerHTML = `
      <a class="back-link" href="index.html">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
        Back home
      </a>
      <section class="detail-hero">
        <div>
          <div class="detail-tags"><span class="asset-lane">Not found</span></div>
          <h1>Implementation guide not found</h1>
          <p>The selected card could not be matched. Please go back and choose the card again.</p>
        </div>
      </section>
    `;
    return;
  }

  document.title = `${item.title} - Implementation Guide`;
  const backLink = document.getElementById("detailBack");
  backLink.href = item.backUrl;
  backLink.lastChild.textContent = item.backLabel;

  document.getElementById("detailLane").textContent = item.lane;
  document.getElementById("detailLane").dataset.lane = item.laneKey;
  document.getElementById("detailSourceType").textContent = item.sourceType;
  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailSummary").textContent = item.summary;
  document.getElementById("detailUseCase").textContent = item.useCase;
  document.getElementById("detailWhenToUse").textContent = item.whenToUse;
  document.getElementById("implementationSteps").innerHTML = item.implementation
    .map((step) => `<li>${detailEscapeHtml(step)}</li>`)
    .join("");

  const technicalPanel = document.getElementById("technicalPanel");
  const technicalNotes = item.technicalNotes;
  if (technicalPanel && technicalNotes) {
    technicalPanel.hidden = false;
    document.getElementById("technicalTitle").textContent = technicalNotes.title || "Technical Notes";
    document.getElementById("technicalBullets").innerHTML = (technicalNotes.bullets || [])
      .map((bullet) => `<li>${detailEscapeHtml(bullet)}</li>`)
      .join("");

    const codeWrap = document.getElementById("technicalCodeWrap");
    if (technicalNotes.code) {
      codeWrap.hidden = false;
      document.getElementById("technicalCodeTitle").textContent = technicalNotes.codeTitle || "Code";
      document.getElementById("technicalCode").textContent = technicalNotes.code;
    } else {
      codeWrap.hidden = true;
      document.getElementById("technicalCode").textContent = "";
    }
  } else if (technicalPanel) {
    technicalPanel.hidden = true;
  }

  renderSourceLinks(item);

  document.querySelectorAll(".top-nav a").forEach((link) => {
    link.classList.remove("active");
    if (item.kind === "asset" && link.getAttribute("href") === "assets.html") link.classList.add("active");
    if (item.kind === "sample" && link.getAttribute("href") === "accelerators.html") link.classList.add("active");
  });
}

if (document.body.dataset.page === "detail") {
  renderDetailPage();
}
