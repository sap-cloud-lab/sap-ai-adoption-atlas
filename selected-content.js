// Generated from the Website Inclusion Checklist selections.
// SAP-provided sample cards live in app.js and render with a SAP tag; these customer items intentionally render without that tag.
window.customerAssetItems = [
    {
        "id":  "checklist-acc-001",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Scoping",
        "title":  "Public Cloud Pre-requisites",
        "shortDescription":  "Capture the public-cloud decisions that must be locked before activation, including scope items, ledgers, group valuation, and profit center valuation.",
        "useCase":  "Develop a centralized pre-requisites checklist mapping required scope items, ledger decisions, valuation choices, and business processes before initial activation.",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "If we have parallel ledgers, the Scope items are to be finalised in the DDA stage itself. Once scope items are deployed and the config is moved to DEV, there is no chance of adding new scope items.",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Parallel Ledgers in Public Cloud: decide IFRS, Local GAAP, US GAAP, and non-leading ledger requirements before the scope and provisioning path is locked.",
                               "Group Valuation in Public Cloud: confirm whether additional parallel ledger or Universal Parallel Accounting choices are required before activation.",
                               "Profit Center Valuation in Public Cloud: confirm whether profit center valuation is required and record the dependency before scope items and configuration are frozen.",
                               "Additional Depreciation Area in AA using 5HG \u0026 6KF: confirm the additional depreciation area requirement before initial scoping, because the related scope decision cannot be added later without re-provisioning.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-001",
                            "url":  ""
                        },
                        {
                            "label":  "Merged notes from checklist row acc-003: Parallel Ledgers in Public Cloud",
                            "url":  ""
                        },
                        {
                            "label":  "Merged notes from checklist row acc-004: Group Valuation in Public Cloud",
                            "url":  ""
                        },
                        {
                            "label":  "Merged notes from checklist row acc-027: Additional Depreciation Area in AA using 5HG \u0026 6KF",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-005",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Data Migration using Staging Tables approach",
        "title":  "Data Migration",
        "shortDescription":  "Leverage knowledge gained from recent data migration and create a comprehensive document \"General Data Migration Design\" helps accelerating future im...",
        "useCase":  "Leverage knowledge gained from recent data migration and  create a comprehensive document \"General Data Migration Design\" helps accelerating future implementations across different data  migrations. \nEx..\nGL Balances \u0026 Open Item  \nHistorical Balances \u0026 Movements \nAsset Master \u0026 Transactions\nMaterial Inventory Balances\nTax GL Balances\nForex Balances\nAUC Assets \u0026 Transactions\nCash Balances at Liquidity \u0026 Forecasting Level",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Data Migration Design for S4H PC",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-005",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-006",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Data Migration using Staging Tables approach",
        "title":  "Data Migration - REFX",
        "shortDescription":  "A Document with comprehensive REFX Data Migration approach, including product bug fixes \u0026 best practices which ensure accurate, efficient lease data...",
        "useCase":  "A Document with comprehensive REFX Data Migration approach, including product bug fixes \u0026 best practices which ensure accurate, efficient lease data transfer in future implementations",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Lease Data Migration by SAP has no relevant details required to support Data Mig",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-006",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-010",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "FI-GL",
        "title":  "Standard Hierarchies vs Global Hierarchies",
        "shortDescription":  "Create detailed documentation on Global Hierarchies and Standard Hierarchy setup options in the Cloud, highlighting how to leverage Global Hierarchie...",
        "useCase":  "Create detailed documentation on Global Hierarchies and Standard Hierarchy setup options in the Cloud, highlighting how to leverage Global Hierarchies to support reporting requirements effectively",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Lack of Documentation on Usage of Global Hierarchies in GL, PCA, CCA \u0026 how Global hierarchies work in Tandem with Standard Hierarchies",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-010",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-012",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "FI-GL",
        "title":  "Reset Transaction Data",
        "shortDescription":  "Detailed documentation on how to Reset Transaction Data in cloud \u0026 overcome the Bugs for subsequent system use",
        "useCase":  "Detailed documentation on how to Reset Transaction Data in cloud \u0026 overcome the Bugs for subsequent system use",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Product GAP on using Transaction Reset in Cloud \u0026 bugs",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-012",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-013",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Taxation",
        "title":  "Tax Engine setup for Brazil using 43D",
        "shortDescription":  "S/4HANA Cloud’s native tax engine has limited capabilities for complex, multi-jurisdiction tax scenarios, creating a gap for automated calculation, e...",
        "useCase":  "S/4HANA Cloud’s native tax engine has limited capabilities for complex, multi-jurisdiction tax scenarios, creating a gap for automated calculation, e‑invoicing, and real-time compliance.",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Product GAP on Implementation of Tax Engine",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-013",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-019",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Taxation",
        "title":  "Tax Engine setup for USA using 4Q2",
        "shortDescription":  "Product GAP on Implementation of Tax Engine",
        "useCase":  "Product GAP on Implementation of Tax Engine",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Product GAP on Implementation of Tax Engine",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-019",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-014",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Taxation",
        "title":  "Tax Localisation - Brazil",
        "shortDescription":  "Product GAP on Implementation of Tax Engine",
        "useCase":  "Product GAP on Implementation of Tax Engine",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Product GAP on Implementation of Tax Engine",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-014",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-020",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "Taxation",
        "title":  "Tax Localisation USA",
        "shortDescription":  "Product GAP on Implementation of Tax Engine",
        "useCase":  "Product GAP on Implementation of Tax Engine",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Product GAP on Implementation of Tax Engine",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-020",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-030",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "FI-BAM",
        "title":  "Posting Rules vs Processing Rules",
        "shortDescription":  "Incoming Bank Statements (OT83) is replaced by new Processing rules in SAP which includes deprecation of Posting rules (restricted) \u0026 unavailable fun...",
        "useCase":  "Incoming Bank Statements (OT83) is replaced by new Processing rules in SAP which includes deprecation of Posting rules (restricted) \u0026 unavailable functionality - Search Strings",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Incoming Bank Statements (OT83) is replaced by new Processing rules in SAP which includes deprecation of Posting rules (restricted) \u0026 unavailable functionality - Search Strings",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-030",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-037",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "FI-BAM",
        "title":  "Automate Payment Reversal using Pain Files \u0026 BCM Rejections",
        "shortDescription":  "SAP has disabled the option to auto reverse the payment files up on BCM rejection of Bank Rejections (PAIN.002 files).",
        "useCase":  "SAP has disabled the option to auto reverse the payment files up on BCM rejection of Bank Rejections (PAIN.002 files).",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "SAP has disabled the option to auto reverse the payment files up on BCM rejection of Bank Rejections (PAIN.002 files).",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-037",
                            "url":  ""
                        }
                    ]
    },
    {
        "id":  "checklist-acc-048",
        "laneKey":  "asset",
        "lane":  "Asset",
        "sourceType":  "Customer Asset",
        "category":  "GR",
        "title":  "GRDC Implementation",
        "shortDescription":  "Missing Documentation required for Implementation",
        "useCase":  "Missing Documentation required for Implementation",
        "whenToUse":  "Use this as a design and readiness checkpoint before SAP S/4HANA Cloud scope, configuration, migration, or activation decisions are locked in.",
        "summary":  "Missing Documentation required for Implementation",
        "implementation":  [
                               "Confirm the decision point with the process owner during discovery or fit-to-standard workshops.",
                               "Document the scope item, configuration, migration, or reporting dependency and the consequence of choosing incorrectly.",
                               "Validate the decision in the customer tenant before activation, provisioning, or transport movement makes it difficult to change.",
                               "Store the final recommendation, screenshots, and sign-off notes with the implementation evidence."
                           ],
        "sources":  [
                        {
                            "label":  "Internal accelerator notes from checklist row acc-048",
                            "url":  ""
                        }
                    ]
    }
];

window.customerSampleItems = [
    {
        "id":  "checklist-acc-016-developer",
        "laneKey":  "developer",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Brazil NFe Integration with SEFAZ \u0026 E-Document Cockpit",
        "status":  "Customer accelerator",
        "pattern":  "Taxation",
        "description":  "Product GAP for Inbound Nota Fiscal (Electronic)",
        "function":  "Product GAP for Inbound Nota Fiscal (Electronic)",
        "summary":  "Product GAP for Inbound Nota Fiscal (Electronic)",
        "useCase":  "Product GAP for Inbound Nota Fiscal (Electronic)",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Developer extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Developer lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-016",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-021-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Custom Layout for Review Booklets using Manage KPI \u0026 Reports app",
        "status":  "Customer accelerator",
        "pattern":  "CAP",
        "description":  "GAP on how to utilise this to Enhance Customer reporting requirements",
        "function":  "GAP on how to utilise this to Enhance Customer reporting requirements",
        "summary":  "GAP on how to utilise this to Enhance Customer reporting requirements",
        "useCase":  "GAP on how to utilise this to Enhance Customer reporting requirements",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-021",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-023-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Journal Upload for Currencies \u0026 Taxes",
        "status":  "Customer accelerator",
        "pattern":  "CAP",
        "description":  "Upload Journal Entries",
        "function":  "Upload Journal Entries",
        "summary":  "Upload Journal Entries",
        "useCase":  "Upload Journal Entries",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Side-by-Side extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Side-by-Side lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-023",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-026-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Asset History Sheet for Multiple Company Codes",
        "status":  "Customer accelerator",
        "pattern":  "FI-AA",
        "description":  "Asset history Sheet - There is no app that allows us to run the report for multiple company codes. Allows only single company code.",
        "function":  "Asset history Sheet - There is no app that allows us to run the report for multiple company codes. Allows only single company code.",
        "summary":  "Asset history Sheet - There is no app that allows us to run the report for multiple company codes. Allows only single company code.",
        "useCase":  "Asset history Sheet - There is no app that allows us to run the report for multiple company codes. Allows only single company code.",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-026",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-032-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Outgoing Bank Statement - SWIFT/FILE/API Integration using 2YM",
        "status":  "Customer accelerator",
        "pattern":  "Integration",
        "description":  "Missing documentation from SAP as well as misleading documentation about the use of MBC for every customer as it carries a hefty licensing \u0026 Maintenance costs",
        "function":  "Missing documentation from SAP as well as misleading documentation about the use of MBC for every customer as it carries a hefty licensing \u0026 Maintenance costs",
        "summary":  "Missing documentation from SAP as well as misleading documentation about the use of MBC for every customer as it carries a hefty licensing \u0026 Maintenance costs",
        "useCase":  "Missing documentation from SAP as well as misleading documentation about the use of MBC for every customer as it carries a hefty licensing \u0026 Maintenance costs",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Side-by-Side extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Side-by-Side lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-032",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-033-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Incoming Bank Statement - SWIFT/FILE/API",
        "status":  "Customer accelerator",
        "pattern":  "Integration",
        "description":  "Enable Custom Fiori which will use the IFLOWS to connect to the BANK API\u0027s to pull the required information",
        "function":  "Enable Custom Fiori which will use the IFLOWS to connect to the BANK API\u0027s to pull the required information",
        "summary":  "Enable Custom Fiori which will use the IFLOWS to connect to the BANK API\u0027s to pull the required information",
        "useCase":  "Enable Custom Fiori which will use the IFLOWS to connect to the BANK API\u0027s to pull the required information",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Side-by-Side extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Side-by-Side lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-033",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-038-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Lease Contracts - reporting requirements",
        "status":  "Customer accelerator",
        "pattern":  "REFX",
        "description":  "No Sunch functionality exists in Cloud",
        "function":  "No Sunch functionality exists in Cloud",
        "summary":  "No Sunch functionality exists in Cloud",
        "useCase":  "No Sunch functionality exists in Cloud",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-038",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-040-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Lease liability movement reports - multiple contracts",
        "status":  "Customer accelerator",
        "pattern":  "REFX",
        "description":  "Leasing Liabilities Movement Report fr multiple leasing contracts",
        "function":  "Leasing Liabilities Movement Report  fr multiple leasing contracts",
        "summary":  "Leasing Liabilities Movement Report  fr multiple leasing contracts",
        "useCase":  "Leasing Liabilities Movement Report  fr multiple leasing contracts",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-040",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-041-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "FAGL3KEH for PC Defaults in Public Cloud",
        "status":  "Customer accelerator",
        "pattern":  "CO-PCA",
        "description":  "Using, FAGL3KEH we can only do bank accounts and bank clearing accounts",
        "function":  "Using, FAGL3KEH we can only do bank accounts and bank clearing accounts",
        "summary":  "Using, FAGL3KEH we can only do bank accounts and bank clearing accounts",
        "useCase":  "Using, FAGL3KEH we can only do bank accounts and bank clearing accounts",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-041",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-049-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "GRDC API - GL_LINEITEMSREAD extended with WBS fields to support GR requirements",
        "status":  "Customer accelerator",
        "pattern":  "GR",
        "description":  "Missing fields in API GL Line Item Read required for Consolidations in GR",
        "function":  "Missing fields in API GL Line Item Read required for Consolidations in GR",
        "summary":  "Missing fields in API GL Line Item Read required for Consolidations in GR",
        "useCase":  "Missing fields in API GL Line Item Read required for Consolidations in GR",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through In-App extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected In-App lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-049",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-050-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Market Rates Management",
        "status":  "Customer accelerator",
        "pattern":  "Integration",
        "description":  "Missing Documentation required for Implementation",
        "function":  "Missing Documentation required for Implementation",
        "summary":  "Missing Documentation required for Implementation",
        "useCase":  "Missing Documentation required for Implementation",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Side-by-Side extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Side-by-Side lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-050",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "checklist-acc-051-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Blackline",
        "status":  "Customer accelerator",
        "pattern":  "Integration",
        "description":  "Missing Documentation required for Implementation",
        "function":  "Missing Documentation required for Implementation",
        "summary":  "Missing Documentation required for Implementation",
        "useCase":  "Missing Documentation required for Implementation",
        "whenToUse":  "Choose this when the requirement matches the listed public-cloud gap and should be solved through Side-by-Side extensibility.",
        "implementation":  [
                               "Confirm the exact SAP business object, app, API, BAdI, workflow, or reporting surface involved.",
                               "Map the required extension approach to the selected Side-by-Side lane and document why this lane is the right fit.",
                               "Build the accelerator with released public-cloud extension points, APIs, or BTP services only.",
                               "Test happy path, exceptions, authorizations, transport/release movement, and any downstream finance/procurement/reporting impact.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Internal accelerator notes from checklist row acc-051",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "additional-mass-goods-movement-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Mass Goods Movement",
        "status":  "Customer accelerator",
        "pattern":  "CAP",
        "description":  "Mass goods movement processing through a custom accelerator.",
        "function":  "Supports high-volume goods movement scenarios where users need a controlled upload or processing layer.",
        "summary":  "A BTP/CAP accelerator concept for mass goods movement execution and validation.",
        "useCase":  "Use this when business users need to process many goods movements with validation, controlled upload, and clear processing feedback.",
        "whenToUse":  "Choose this when the requirement needs a custom BTP/CAP app or service around SAP S/4HANA goods movement APIs.",
        "implementation":  [
                               "Confirm the goods movement types, plants, storage locations, materials, and validation rules.",
                               "Design a CAP service or app to upload, validate, and stage mass goods movement records.",
                               "Connect to released SAP S/4HANA Cloud APIs or integration services for posting and status feedback.",
                               "Test successful postings, rejected records, authorization, error logging, and reconciliation back to SAP.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Additional scenario requested for the accelerator library",
                            "url":  ""
                        }
                    ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "additional-mass-upload-po-sto-side",
        "laneKey":  "side",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Mass Upload - PO \u0026 STO",
        "status":  "Customer accelerator",
        "pattern":  "CAP",
        "description":  "Mass upload accelerator for Purchase Orders and Stock Transport Orders.",
        "function":  "Provides a controlled upload and validation layer for high-volume PO and STO creation or changes.",
        "summary":  "A BTP/CAP accelerator concept for uploading, validating, and processing PO and STO records.",
        "useCase":  "Use this when procurement teams need structured mass upload capability for Purchase Orders or Stock Transport Orders with clear validation and posting feedback.",
        "whenToUse":  "Choose this when the requirement needs a custom BTP/CAP app or service around SAP S/4HANA Cloud PO and STO APIs.",
        "implementation":  [
                               "Confirm the PO and STO business scenarios, required fields, document types, plants, suppliers, and validation rules.",
                               "Design a CAP upload service with templates, staging, validation status, and correction workflow.",
                               "Connect to released SAP S/4HANA Cloud APIs for PO/STO creation or updates.",
                               "Test successful creation, rejected rows, duplicate checks, authorization, error logging, and reconciliation back to SAP.",
                               "Link the GitHub source code and final setup notes when your implementation repository is ready."
                           ],
        "sources":  [
                        {
                            "label":  "Source code pending in your GitHub accelerator repository",
                            "url":  ""
                        },
                        {
                            "label":  "Additional scenario requested for the accelerator library",
                            "url":  ""
                        }
        ],
        "url":  "",
        "linkLabel":  "Source code pending"
    },
    {
        "id":  "customer-aging-report-key-date-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Aging Report with Specific Key Date",
        "status":  "Customer accelerator",
        "pattern":  "Finance Reporting",
        "description":  "Custom AP aging app that allows users to select a specific key date where the standard app flow did not meet the requirement.",
        "function":  "Provides a controlled key-date parameter for accounts payable aging so finance users can run the report for the exact date they need.",
        "summary":  "A custom in-app reporting accelerator for AP aging where the original SAP app and linked analysis options did not provide the required key-date behavior.",
        "useCase":  "Use this when Accounts Payable aging must be reviewed for a specific historical or business key date and the standard app flow does not give users enough control.",
        "whenToUse":  "Choose this when the requirement is reporting-focused, can be solved with released analytical content/custom app configuration, and should stay inside SAP S/4HANA Cloud.",
        "implementation":  [
                               "Confirm the reporting gap against SAP app F4401, Aging Report for Accounts Payable, and document the missing key-date behavior.",
                               "Review linked analysis options such as C_F5240 Analyze KPI Details and F1733 Aging Analysis with CDS C_APFLEXIBLEAGING to confirm they do not solve the required key-date selection.",
                               "Create a custom analytical app or report variant that exposes a clear key-date parameter for the AP aging logic.",
                               "Validate the output against the standard report for current-date scenarios, then test historical key dates, currency display, interval buckets, and exchange-rate type.",
                               "Publish the custom app tile with role access, final filter defaults, and implementation notes for finance users."
                           ],
        "technicalNotes":  {
                               "title":  "App References and Design Notes",
                               "bullets":  [
                                               "Standard app reviewed: F4401 - Aging Report for Accounts Payable.",
                                               "Linked app reviewed: C_F5240 - Analyze KPI Details.",
                                               "Related SAP app/CDS reviewed: F1733 - Aging Analysis (S/4HANA), CDS C_APFLEXIBLEAGING.",
                                               "Design decision: create a new custom app because the standard/linked app path did not provide the required specific key-date selection."
                                           ]
                           },
        "sources":  [
                        {
                            "label":  "Customer implementation notes: Aging report key date custom app",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/aging-report-key-date-custom-app.md"
                        },
                        {
                            "label":  "Reusable public-cloud accelerator playbook",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/reusable-public-cloud-accelerator-playbook.md"
                        },
                        {
                            "label":  "SAP Fiori Apps Library: F4401 Aging Report for Accounts Payable",
                            "url":  "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F4401')"
                        },
                        {
                            "label":  "SAP Fiori Apps Library: F1733 Aging Analysis",
                            "url":  "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1733')"
                        }
                    ],
        "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/aging-report-key-date-custom-app.md",
        "linkLabel":  "Open implementation notes"
    },
    {
        "id":  "customer-inventory-consumption-sto-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "Inventory vs Consumption Indicator for STO",
        "status":  "Customer accelerator",
        "pattern":  "Procurement Control",
        "description":  "Plant-level material master custom field used to control whether STO processing should allow cost object entry for consumption.",
        "function":  "Introduces a consumption indicator on the material master so the STO flow can distinguish inventory and consumable materials after the system is already live.",
        "summary":  "An in-app extensibility workaround for a live customer system where material group design could no longer be used cleanly to identify consumption materials.",
        "useCase":  "Use this when material master data needs an explicit inventory/consumption indicator by plant or district, and STO account assignment behavior should follow that indicator.",
        "whenToUse":  "Choose this when the customer has already implemented the system and a clean master-data redesign, such as material group classification, is no longer practical.",
        "implementation":  [
                               "Create a material master custom field for Consumption Indicator and enable it for the relevant CDS/API usage so custom logic can read it.",
                               "Maintain the indicator as Yes/No at material plant level for the relevant district plants, excluding SLC or plant 2000 where the logic does not apply.",
                               "Enable the field for API_PRODUCT_SRV, A_ProductPlantType, and I_PRODUCTPLANT so the BAdI can read the product plant value.",
                               "Confirm configuration for item category U and allowed Cost Centre/WBS combinations for Stock Transport Orders.",
                               "Implement the check through BAdI MM_PUR_S4_PO_MODIFY_ACCOUNT because it allows the logic to read material information and control the account-assignment fields.",
                               "Document the caveat that the logic triggers after users enter all required screen parameters, including account assignment values.",
                               "Test inventory materials, consumable materials, cost centre entry, WBS entry, excluded plants, mass maintenance, and transport movement."
                           ],
        "technicalNotes":  {
                               "title":  "BAdI Selection Notes",
                               "bullets":  [
                                               "Chosen BAdI: MM_PUR_S4_PO_MODIFY_ACCOUNT - Modify Purchase Order Account Assignment Data.",
                                               "Implementation name from source PDF: YY1_MM_PUR_S4_PO_MODIFY_ACC.",
                                               "Custom field: Consumption Indicator, checkbox, Product Plant business context, generated field YY1_CONSUMPTIONINDICAT_PLT.",
                                               "Enabled access shown in the source PDF: API_PRODUCT_SRV / A_ProductPlantType and CDS view I_PRODUCTPLANT.",
                                               "Rejected option: MM_PUR_S4_PO_MODIFY_ITEM exposes Account Assignment Indicator but does not allow messages and could not access I_PRODUCTPLANT in this scenario.",
                                               "Rejected option: MM_PUR_S4_PO_CHECK_ALL_ITEMS did not expose the fields required for the validation.",
                                               "Transport reference from the working notes: N2OK901863 - Inventory vs Consumption.",
                                               "Related configuration references from the notes: 101655 Allow Cost Centre/WBS combination with Item Category U for STO, and 102909 Purchase Order Types.",
                                               "Runtime rule from the PDF: for PO types UB, UD, or ZUD, plant not equal to 2000, and account assignment K or P, read I_PRODUCTPLANT and block if the consumption indicator is initial."
                                           ],
                               "codeTitle":  "Published customer logic from source PDF",
                               "code":  `* This enhancement is to check if the Material is Consumption or Inventory
* & throw an error if Account Assignment K or P is selected for Material Marked as
* Inventory at the districts

DATA ls_message     LIKE LINE OF messages.
DATA lv_consumption TYPE abap_boolean.

READ TABLE purchaseorderitem_table
  WITH KEY purchaseorder     = purchaseordaccountchange-purchaseorder
           purchaseorderitem = purchaseordaccountchange-purchaseorderitem
  ASSIGNING FIELD-SYMBOL(<ls_pur_item>).

IF <ls_pur_item> IS ASSIGNED.

  IF ( purchaseorder-purchaseordertype = 'UB'
    OR purchaseorder-purchaseordertype = 'UD'
    OR purchaseorder-purchaseordertype = 'ZUD' )
  AND <ls_pur_item>-plant <> '2000'
  AND ( <ls_pur_item>-accountassignmentcategory = 'K'
     OR <ls_pur_item>-accountassignmentcategory = 'P' ).

    CLEAR lv_consumption.

    SELECT SINGLE yy1_consumptionindicat_plt
      FROM i_productplant
      WHERE product = @<ls_pur_item>-material
        AND plant   = @<ls_pur_item>-plant
      INTO @lv_consumption.

    IF lv_consumption IS INITIAL.

      CLEAR ls_message.
      ls_message-messagetype = 'E'.
      ls_message-messageid = '00'.
      ls_message-messagenumber = '001'.
      ls_message-messagevariable1 =
        'K/P Acc Asgmt not allowed for Inv. Mat at District'.

      APPEND ls_message TO messages.

    ENDIF.

  ENDIF.

ENDIF.`
                           },
        "sources":  [
                        {
                            "label":  "Customer implementation notes: Inventory vs consumption STO control",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/inventory-vs-consumption-sto.md"
                        },
                        {
                            "label":  "Reusable public-cloud accelerator playbook",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/reusable-public-cloud-accelerator-playbook.md"
                        },
                        {
                            "label":  "Source document: inv vs consumption.pdf",
                            "url":  ""
                        }
                    ],
        "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/inventory-vs-consumption-sto.md",
        "linkLabel":  "Open implementation notes"
    },
    {
        "id":  "customer-po-budget-period-validation-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "PO Budget Period Validation for Public Sector",
        "status":  "Customer accelerator",
        "pattern":  "Procurement Control",
        "description":  "Line-aware purchase order change validation that blocks public-sector PO saves when Budget Period is earlier than the current fiscal year.",
        "function":  "Uses Custom Logic in the purchase order final-check BAdI to enforce CFA's July-to-June fiscal-year Budget Period rule for relevant open PO line items.",
        "summary":  "An in-app public-sector procurement control for customers using Fund, Grant, Functional Area, and Budget Period on PO account assignments.",
        "useCase":  "Use this when a public-sector customer must stop users progressing or changing open PO items with a prior-year Budget Period while avoiding false blocks on unrelated historical lines.",
        "whenToUse":  "Choose this when the Budget Period is available in PO account assignment context and the requirement is a hard save-time validation rather than a defaulting or substitution rule.",
        "implementation":  [
                               "Confirm the customer's fiscal-year rule. For CFA, July to June means 5 July 2026 belongs to FY2027.",
                               "Implement the PO change check in Custom Logic using BAdI BD_MMPUR_FINAL_CHECK_PO.",
                               "Derive the current fiscal year from the system date at save time, not from document date or delivery date.",
                               "Loop through PO items and mark only relevant items for validation: newly present items, changed items, or items where the account assignment Budget Period changed.",
                               "Skip operationally closed PO items using ISCOMPLETELYDELIVERED and ISFINALLYINVOICED.",
                               "Skip deleted account assignment rows using PURCHASEORDERACCOUNTING-ISDELETED.",
                               "For unchanged items, compare the current Budget Period with the saved account assignment value from released CDS view I_PurOrdAccountAssignmentAPI01.",
                               "Raise an error message for each relevant active account assignment where Budget Period is less than the current fiscal year.",
                               "Prefix the custom message with CFA custom check so users can distinguish it from SAP standard budget consumption date messages.",
                               "Treat PO create as a separate follow-up because testing showed the BAdI fires during create but PURCHASEORDERACCOUNTING had zero rows in the tested create path."
                           ],
        "technicalNotes":  {
                               "title":  "BAdI And Runtime Notes",
                               "bullets":  [
                                               "Custom Logic implementation: YY1_BD_MMPUR_FINAL_CHECK_PO.",
                                               "BAdI used for completed phase: BD_MMPUR_FINAL_CHECK_PO.",
                                               "Completed scope: purchase order change only.",
                                               "Deferred scope: purchase order create and purchase requisition.",
                                               "Budget Period field was confirmed under PURCHASEORDERACCOUNTING.",
                                               "PO item context exposed ISCOMPLETELYDELIVERED and ISFINALLYINVOICED, but did not expose ISDELETED.",
                                               "The BAdI did not expose PURCHASEORDERACCOUNTING_DB, so saved account assignment comparison uses I_PurOrdAccountAssignmentAPI01.",
                                               "Create-path diagnostic proved the BAdI is triggered during PO create, but PURCHASEORDERACCOUNTING had ItemRows=1 and AccRows=0 in the tested path.",
                                               "SAP standard message Budget period 2026 is not valid for the consumption date 07/05/2026 can still appear separately and is not suppressed by this enhancement."
                                           ],
                               "codeTitle":  "PO change Budget Period validation",
                               "code":  `DATA: ls_message LIKE LINE OF messages.
DATA: lv_db_budgetperiod TYPE c LENGTH 10.

* Change-only logic. PO create will be handled separately.
IF purchaseorder_db-purchaseorder IS INITIAL.
  RETURN.
ENDIF.

DATA(lv_today) = cl_abap_context_info=>get_system_date( ).
DATA(lv_current_fy) = CONV i( lv_today(4) ).

* CFA fiscal year: July to June.
IF lv_today+4(2) >= '07'.
  lv_current_fy = lv_current_fy + 1.
ENDIF.

LOOP AT purchaseorderitems INTO DATA(ls_po_item).

  DATA(lv_item_relevant) = ''.

  * Do not check operationally closed PO items.
  IF ls_po_item-iscompletelydelivered = 'X'
     OR ls_po_item-isfinallyinvoiced = 'X'.
    CONTINUE.
  ENDIF.

  READ TABLE purchaseorderitems_db INTO DATA(ls_po_item_db)
    WITH KEY purchaseorderitem = ls_po_item-purchaseorderitem.

  IF sy-subrc <> 0.
    lv_item_relevant = 'X'.
  ELSEIF ls_po_item <> ls_po_item_db.
    lv_item_relevant = 'X'.
  ENDIF.

  * If item itself did not change, check whether its Budget Period changed.
  IF lv_item_relevant IS INITIAL.

    LOOP AT purchaseorderaccounting INTO DATA(ls_acc_check)
      WHERE purchaseorderitem = ls_po_item-purchaseorderitem.

      IF ls_acc_check-isdeleted = 'X'.
        CONTINUE.
      ENDIF.

      CLEAR lv_db_budgetperiod.

      SELECT SINGLE FROM i_purordaccountassignmentapi01
        FIELDS budgetperiod
        WHERE purchaseorder = @ls_acc_check-purchaseorder
          AND purchaseorderitem = @ls_acc_check-purchaseorderitem
          AND accountassignmentnumber = @ls_acc_check-accountassignmentnumber
        INTO @lv_db_budgetperiod.

      IF sy-subrc <> 0
         OR ls_acc_check-budgetperiod <> lv_db_budgetperiod.
        lv_item_relevant = 'X'.
        EXIT.
      ENDIF.

    ENDLOOP.

  ENDIF.

  IF lv_item_relevant IS INITIAL.
    CONTINUE.
  ENDIF.

  LOOP AT purchaseorderaccounting INTO DATA(ls_po_accounting)
    WHERE purchaseorderitem = ls_po_item-purchaseorderitem.

    IF ls_po_accounting-isdeleted = 'X'
       OR ls_po_accounting-budgetperiod IS INITIAL.
      CONTINUE.
    ENDIF.

    IF CONV i( ls_po_accounting-budgetperiod ) < lv_current_fy.

      CLEAR ls_message.
      ls_message-messagetype = 'E'.
      ls_message-messagevariable1 =
        |CFA custom check: PO item { ls_po_accounting-purchaseorderitem } Budget Period { ls_po_accounting-budgetperiod } < FY { lv_current_fy }|.

      APPEND ls_message TO messages.

    ENDIF.

  ENDLOOP.

ENDLOOP.`
                           },
        "sources":  [
                        {
                            "label":  "Customer implementation notes: PO Budget Period validation",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/po-budget-period-validation.md"
                        },
                        {
                            "label":  "Released CDS view used for saved account assignment comparison: I_PurOrdAccountAssignmentAPI01",
                            "url":  "https://api.sap.com/cdsviews/I_PurOrdAccountAssignmentAPI01"
                        }
                    ],
        "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/po-budget-period-validation.md",
        "linkLabel":  "Open implementation notes"
    },
    {
        "id":  "customer-pr-budget-period-validation-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "PR Budget Period Validation for Public Sector",
        "status":  "Customer accelerator",
        "pattern":  "Procurement Control",
        "description":  "Purchase requisition create/change validation that blocks public-sector PR account assignments when Budget Period is earlier than the current fiscal year.",
        "function":  "Uses Custom Logic in the PR check BAdI to enforce CFA's July-to-June fiscal-year Budget Period rule for PR account assignments.",
        "summary":  "An in-app public-sector procurement control for customers using Fund, Grant, Functional Area, and Budget Period on purchase requisitions.",
        "useCase":  "Use this when a public-sector customer must stop PR create or change where Budget Period is earlier than the current fiscal year.",
        "whenToUse":  "Choose this when Budget Period is available in the purchase requisition account assignment table and the requirement is a hard validation at check/save time.",
        "implementation":  [
                               "Confirm the customer's fiscal-year rule. For CFA, July to June means 5 July 2026 belongs to FY2027.",
                               "Implement the PR check in Custom Logic using BAdI MM_PUR_S4_PR_CHECK.",
                               "Confirm PURCHASEREQACCASSGNMT_TABLE is available in the BAdI parameter list.",
                               "Confirm BUDGETPERIOD is available in PURCHASEREQACCASSGNMT_TABLE together with public-sector account assignment fields such as Grant and Functional Area.",
                               "Derive the current fiscal year from the system date at check/save time, not from delivery date.",
                               "Loop through PR account assignment rows, skip deleted rows and blank Budget Period values, then compare Budget Period with the calculated fiscal year.",
                               "Move Budget Period into a string and condense it before numeric validation because the field is exposed as fixed-length character text.",
                               "Raise a short error message such as CFA PR item 00010: BP 2026 < FY 2027 so it remains readable in the SAP message list.",
                               "Test both PR create and PR change; in the CFA tenant this BAdI triggered for both paths."
                           ],
        "technicalNotes":  {
                               "title":  "BAdI And Runtime Notes",
                               "bullets":  [
                                               "BAdI used: MM_PUR_S4_PR_CHECK.",
                                               "Validated table: PURCHASEREQACCASSGNMT_TABLE.",
                                               "Validated Budget Period field: BUDGETPERIOD.",
                                               "Additional account assignment fields visible in the tenant include Grant, Functional Area, WBS Element, Project Network, Cost Center, Profit Center, and Fund-related fields.",
                                               "PR create test blocked Budget Period 2026 during FY2027.",
                                               "PR change test blocked Budget Period 2026 during FY2027.",
                                               "Message was shortened after the first test because the longer text was cut off in the SAP message popup.",
                                               "Budget Period is moved to a string and condensed before numeric validation to avoid fixed-length trailing-blank false invalid errors.",
                                               "SAP standard budget consumption date validation can still appear separately and is not suppressed by this enhancement."
                                           ],
                               "codeTitle":  "PR Budget Period validation",
                               "code":  `************************************************************************
* Business Requirement:
* CFA is a public-sector customer and uses Budget Period on Purchase
* Requisition account assignment.
*
* During PR create/change/check, the Budget Period must not be earlier
* than the current CFA fiscal year.
*
* CFA fiscal year runs from July to June.
* Example: July 2026 belongs to FY2027.
*
* Therefore, if a PR is created or changed in FY2027:
* - Budget Period 2026 must be blocked with a hard error.
* - Budget Period 2027 or later must be allowed.
************************************************************************

DATA: ls_message LIKE LINE OF messages.
DATA: lv_budgetperiod_text TYPE string.

DATA(lv_today) = cl_abap_context_info=>get_system_date( ).
DATA(lv_current_fy) = CONV i( lv_today(4) ).

* CFA fiscal year: July to June.
IF lv_today+4(2) >= '07'.
  lv_current_fy = lv_current_fy + 1.
ENDIF.

LOOP AT purchasereqaccassgnmt_table INTO DATA(ls_pr_account).

  IF ls_pr_account-isdeleted = 'X'
     OR ls_pr_account-budgetperiod IS INITIAL.
    CONTINUE.
  ENDIF.

  CLEAR lv_budgetperiod_text.
  lv_budgetperiod_text = ls_pr_account-budgetperiod.
  CONDENSE lv_budgetperiod_text NO-GAPS.

  IF lv_budgetperiod_text CN '0123456789'.

    CLEAR ls_message.
    ls_message-messagetype = 'E'.
    ls_message-messageid = '00'.
    ls_message-messagenumber = '001'.
    ls_message-messagevariable1 =
      |CFA PR item { ls_pr_account-purchaserequisitionitem }: BP invalid|.

    APPEND ls_message TO messages.
    CONTINUE.

  ENDIF.

  IF CONV i( lv_budgetperiod_text ) < lv_current_fy.

    CLEAR ls_message.
    ls_message-messagetype = 'E'.
    ls_message-messageid = '00'.
    ls_message-messagenumber = '001'.
    ls_message-messagevariable1 =
      |CFA PR item { ls_pr_account-purchaserequisitionitem }: BP { lv_budgetperiod_text } < FY { lv_current_fy }|.

    APPEND ls_message TO messages.

  ENDIF.

ENDLOOP.`
                           },
        "sources":  [
                        {
                            "label":  "Customer implementation notes: PR Budget Period validation",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/pr-budget-period-validation.md"
                        },
                        {
                            "label":  "SAP Help: Purchase Requisition extensibility",
                            "url":  "https://help.sap.com/docs/SAP_S4HANA_CLOUD"
                        }
                    ],
        "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/pr-budget-period-validation.md",
        "linkLabel":  "Open implementation notes"
    },
    {
        "id":  "customer-ip19-maintenance-report-inapp",
        "laneKey":  "inapp",
        "source":  "Customer",
        "sourceType":  "Customer Accelerator",
        "title":  "IP19 Maintenance Report Requirement",
        "status":  "Customer accelerator",
        "pattern":  "EAM Reporting",
        "description":  "IP19-equivalent maintenance planning report built with Custom CDS, Custom Analytical Query, and Manage KPIs and Reports.",
        "function":  "Creates a planner-friendly maintenance schedule report for SAP S/4HANA Cloud Public Edition and documents the remaining Due Packages release blocker for SAP escalation.",
        "summary":  "A clean-core in-app reporting accelerator that replaces the ECC IP19 planning view with an embedded analytics report and a documented escalation path for Due Packages.",
        "useCase":  "Use this when maintenance planners need a single operational report combining maintenance plan, item, equipment, functional location, work center, planned dates, completion dates, orders, call status, planner group, operation text, and due package context.",
        "whenToUse":  "Choose this when the reporting requirement is read-only, planner-facing, and can be delivered through embedded analytics before moving to developer extensibility for any unreleased SAP data gaps.",
        "implementation":  [
                               "Start from the SAP-delivered Maintenance Plan Scheduling Overview analytical content and confirm the mandatory IP19-equivalent fields with maintenance planners.",
                               "Create analytical cube YY1_IP19_MAINTPLAN_CUBE using I_MaintPlanSchedgOverviewCube as the primary datasource.",
                               "Add associations for equipment text, functional location text, and maintenance order operation text so the report contains planner-friendly descriptions, not only IDs.",
                               "Add NumberOfMaintenancePlanCalls as a measure with SUM aggregation because an analytical cube requires at least one measure.",
                               "Use analytical association cardinalities that can publish in Custom CDS Views; validate the operation text result because I_MaintOrderOperationBasic can have multiple operations.",
                               "Create Custom Analytical Query YY1_Q_IP19_MAINT_SCHED after the cube is fully published, then configure filters for maintenance plan, equipment, functional location, work center, planner group, call status, planned date, maintenance order, and completion date.",
                               "Publish the query through Manage KPIs and Reports as a Web Dynpro Grid Application because it gives planners a cleaner operational report than raw multidimensional analysis.",
                               "Document the Due Packages gap separately: the required package data is visible in Customer Data Browser through I_MAINTTSKLISTSTRGYPACKAGETP, but the CDS object is not available for Custom CDS Views and returned HTTP 403 in ADT.",
                               "Use C_MAINTENANCEITEMDEX_2 to map maintenance item to task list type, task list group, and group counter, then use I_MAINTTSKLISTSTRGYPACKAGETP as the requested released source for Maintenance Package Number and Cycle Text.",
                               "Raise the SAP escalation requesting release of I_MAINTTSKLISTSTRGYPACKAGETP, an equivalent released CDS/API, or direct exposure of Due Packages in I_MaintPlanSchedgOverviewCube."
                           ],
        "technicalNotes":  {
                               "title":  "Technical Design And Escalation Notes",
                               "bullets":  [
                                               "Primary delivered objects: YY1_IP19_MAINTPLAN_CUBE and YY1_Q_IP19_MAINT_SCHED.",
                                               "Delivery surface: Manage KPIs and Reports, Web Dynpro Grid Application artifact.",
                                               "Base analytical provider: I_MaintPlanSchedgOverviewCube.",
                                               "Mandatory delivered fields include maintenance plan, maintenance item, item description, equipment, equipment description, functional location, functional location description, main work center, planned date, completion date, maintenance order, call status, planner group, and operation short text.",
                                               "Business-critical remaining gap: Due Packages. Business confirmed go-live cannot proceed without a supported solution for this field.",
                                               "Due Packages derivation path identified: report maintenance item -> C_MAINTENANCEITEMDEX_2 -> task list type/group/group counter -> I_MAINTTSKLISTSTRGYPACKAGETP -> Maintenance Package Number / Cycle Text / Operation Short Text.",
                                               "Customer Data Browser evidence confirms I_MAINTTSKLISTSTRGYPACKAGETP contains the package data required for the derivation.",
                                               "Extensibility blocker: I_MAINTTSKLISTSTRGYPACKAGETP is visible in Customer Data Browser and searchable in ADT, but unavailable in Custom CDS Views and blocked by HTTP 403 when opened as ADT DDL source.",
                                               "SAP request: release I_MAINTTSKLISTSTRGYPACKAGETP, provide an equivalent released CDS/API, or add Due Packages to I_MaintPlanSchedgOverviewCube / standard maintenance scheduling analytics."
                                           ],
                               "codeTitle":  "Due Packages derivation blueprint",
                               "code":  `Delivered report layer:
- YY1_IP19_MAINTPLAN_CUBE
- YY1_Q_IP19_MAINT_SCHED
- Manage KPIs and Reports Web Dynpro Grid Application

Base cube:
- I_MaintPlanSchedgOverviewCube

Due Packages target derivation:
1. Start with Maintenance Plan and Maintenance Item from the custom report.
2. Use C_MAINTENANCEITEMDEX_2 to obtain:
   - Task List Type
   - Task List Group
   - Group Counter
3. Use I_MAINTTSKLISTSTRGYPACKAGETP to obtain:
   - Maintenance Package Number
   - Cycle Text
   - Operation Short Text
4. Use Cycle Text / package data as the supported basis for Due Packages.

Current blocker:
- I_MAINTTSKLISTSTRGYPACKAGETP is visible in Customer Data Browser.
- It is not available in Custom CDS Views.
- ADT DDL source access returned HTTP 403 Forbidden.

SAP escalation request:
- Release I_MAINTTSKLISTSTRGYPACKAGETP for customer extensibility, or
- provide an equivalent released CDS/API, or
- expose Due Packages directly in I_MaintPlanSchedgOverviewCube.`
                           },
        "sources":  [
                        {
                            "label":  "Customer implementation notes: IP19 maintenance report requirement",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/ip19-maintenance-report-requirement.md"
                        },
                        {
                            "label":  "Architecture evidence: delivered IP19 report flow",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/ip19_tdd_assets/architecture_flow.png"
                        },
                        {
                            "label":  "Due package derivation evidence",
                            "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/ip19_tdd_assets/due_package_derivation_flow.png"
                        },
                        {
                            "label":  "Source attachments: IP19 markdown pack and technical design Word document",
                            "url":  ""
                        }
                    ],
        "url":  "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/ip19-maintenance-report-requirement.md",
        "linkLabel":  "Open implementation notes"
    }
];

window.unmappedCustomerAccelerators = {
    "id":  "acc-028",
    "title":  "Asset History Sheet for Multiple Company Codes"
};
