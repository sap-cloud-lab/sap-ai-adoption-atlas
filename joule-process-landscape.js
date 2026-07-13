(function () {
  const portfolioUrl = "https://www.sap.com/use-cases/joule-assistant/financial-closing-ai";

  const portfolioProcesses = {
    "Analytical Business Insights": {
      description: "Surfaces contextual financial insights and explanations for close and reporting work.",
      officialUrl: portfolioUrl
    },
    "Financial Consistency Analysis": {
      description: "Analyzes financial data for consistency issues and supports investigation.",
      officialUrl: portfolioUrl
    },
    "Journal Entry": {
      description: "Supports the preparation and review of journal entries during financial close.",
      officialUrl: portfolioUrl
    },
    "Intercompany Matching and Reconciliation": {
      description: "Supports matching and reconciliation of intercompany transactions.",
      officialUrl: portfolioUrl
    },
    "Asset Accounting Anomaly Detection": {
      description: "Flags unusual asset-accounting patterns for focused human review.",
      officialUrl: portfolioUrl
    }
  };

  const catalogProcesses = {
    "Accounting Accruals": ["J787"]
  };

  const labelsByRow = [
    [
      "Promotions Personalization",
      "Material Supplier Recommendation",
      "Goal Progress",
      "Buy-for-Me",
      "Warehouse Internal Replenishment",
      "Dunning Insights",
      "Performance Intelligence",
      "Payment Risk",
      "Talent Scout"
    ],
    [
      "Dynamic Invoice Insights",
      "Learning Journey",
      "Accounting Accruals",
      "Quote Creation",
      "Revenue Reconciliation",
      "Invoice Capture & Extraction",
      "Audit",
      "Analytical Business Insights",
      "Production Master Data"
    ],
    [
      "Supplier Risk Monitoring & Alert",
      "Receipt Analysis",
      "Supplier Onboarding",
      "Material Spend Advisory",
      "Timesheet Reminder",
      "Feedback Discovery",
      "Compensation Guidance",
      "Deal Manager",
      "Sales Pricing"
    ],
    [
      "Procurement Contract Compliance Monitoring",
      "Audience Intelligence",
      "Payroll Alert Resolution",
      "Case Processing",
      "Custom Form",
      "Invoice Contract Leakage",
      "Supply Chain Collaboration Exception Management",
      "Tax Configuration"
    ],
    [
      "E-Invoicing Setup",
      "SOW Creation",
      "Configuration Transport",
      "Learning Skills",
      "Financial Consistency Analysis",
      "Recruiting Q&A",
      "Sourcing Event",
      "Transport Dispatching",
      "Billing Block Resolution"
    ],
    [
      "Supplier Identification & Optimization",
      "Campaign Orchestration",
      "Billing Posting",
      "Product Recommendation",
      "Billing Creation",
      "Invoice Automation",
      "Invoice Tax Validation",
      "Customer Relationship Management"
    ],
    [
      "Workforce Orchestration",
      "Case Preparation",
      "Payment Terms Invoicing",
      "Analytics Reasoning",
      "Mentoring",
      "Fixed Bin Maintenance",
      "Interview",
      "Lead Routing",
      "Procurement Contract Renewal Optimization"
    ],
    [
      "Sales Lead Qualification",
      "Mentoring",
      "Bank Relationship",
      "Deployment Order Confirmation",
      "Invoice Execution",
      "Journal Entry",
      "Supplier Classification",
      "Campaign Configuration"
    ],
    [
      "Delivery Issues Resolution",
      "Intercompany Matching and Reconciliation",
      "Timesheet Service",
      "Succession Health Check",
      "Galileo",
      "Asset Accounting Anomaly Detection",
      "Service Entry Sheet Automation"
    ],
    [
      "Calibration Equity",
      "Task Management",
      "Sales Lead Qualification",
      "Content Personalization",
      "Taxonomy Classification",
      "Product Attribute Enrichment",
      "Dispute Resolution",
      "Stalled Workflow"
    ]
  ];

  function slugify(value) {
    return value
      .toLocaleLowerCase()
      .replaceAll("&", "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const rows = labelsByRow.map((labels, rowIndex) =>
    labels.map((label, columnIndex) => {
      const portfolio = portfolioProcesses[label];
      const agentIds = catalogProcesses[label] || [];
      const source = agentIds.length ? "catalog" : portfolio ? "portfolio" : "process-only";

      return {
        agentIds,
        columnIndex,
        description: portfolio?.description || "",
        id: `${slugify(label)}-${rowIndex + 1}-${columnIndex + 1}`,
        label,
        officialUrl: portfolio?.officialUrl || "",
        rowIndex,
        source
      };
    })
  );

  const processes = rows.flat();
  const enabled = processes.filter((process) => process.source !== "process-only");

  window.jouleProcessLandscape = {
    counts: {
      all: processes.length,
      enabled: enabled.length,
      processOnly: processes.length - enabled.length,
      rows: rows.length
    },
    processes,
    rows,
    snapshotLabel: "SAP presentation landscape"
  };
})();
