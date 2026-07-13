const assetItems = [
  {
    id: "inapp-decision-guide",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "SAP Learning",
    title: "Key-User In-App Extensibility Tools",
    useCase: "Small, controlled business changes inside SAP S/4HANA Cloud.",
    whenToUse:
      "Use this first when the business needs fields, page changes, simple validations, custom logic, forms, email templates, or lightweight analytics without building a separate app.",
    summary:
      "This is the safest starting point for many public cloud requirements because the change stays inside SAP's key-user extensibility model.",
    implementation: [
      "Confirm the exact business object, Fiori app, report, form, or process step that needs to change.",
      "Check whether the area is extensible using the target app, Extensibility Cockpit, or the relevant SAP Help page.",
      "Choose the smallest key-user tool that fits: Custom Fields, Custom Logic, UI Adaptation, Custom Analytical Queries, form templates, or email templates.",
      "Build in the customizing tenant, publish the change, test with business roles, and move it using the standard software collection process.",
    ],
    sources: [
      {
        label: "SAP Learning: Key-user in-app extensibility tools",
        url: "https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition/introducing-the-key-user-in-app-extensibility-tools",
      },
      {
        label: "SAP Help: Extensibility overview",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/533228e1e854433ab16d013f161ca509.html",
      },
    ],
  },
  {
    id: "inapp-custom-fields-logic",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "SAP Help",
    title: "Custom Fields and Custom Logic",
    useCase: "Add business fields, validations, derivations, and simple extension logic.",
    whenToUse:
      "Use when a standard screen, report, API, form, or process needs a customer-specific field or a small rule at a released extension point.",
    summary:
      "This pattern is usually the first answer for simple process-specific gaps, especially when users need extra information visible in standard SAP apps.",
    implementation: [
      "Identify the business context for the field or BAdI and confirm the target UI/report/API enablement options.",
      "Create the custom field or custom logic implementation in the key-user app.",
      "Enable the field for the required UIs, reports, forms, OData APIs, or business scenarios.",
      "Publish, test authorization/visibility, and document where the field is used so future changes stay traceable.",
    ],
    sources: [
      {
        label: "SAP Help: Custom fields in procurement extensibility",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0e602d466b99490187fcbb30d1dc897c/23fd61fb5c894159939cf2f9226468dd.html",
      },
      {
        label: "SAP KBA preview: Custom Fields",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3612451",
      },
    ],
  },
  {
    id: "inapp-ui-adaptation",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "SAP Help",
    title: "Fiori UI Adaptation",
    useCase: "Adjust fields and page layout for business users without custom code.",
    whenToUse:
      "Use when the standard Fiori page is close enough, but users need fields moved, hidden, relabeled, grouped, or exposed for a role-specific process.",
    summary:
      "UI adaptation helps reduce noise and place the right SAP data where the business actually works.",
    implementation: [
      "Open the target app in adaptation mode with the correct role and scope.",
      "Apply page changes such as moving, hiding, or adding available fields and sections.",
      "Validate the layout for the target user roles and screen sizes.",
      "Publish the adaptation and keep a note of the affected app, role, and reason for the layout change.",
    ],
    sources: [
      {
        label: "SAP Help: Key User Adaptation",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/8900a9b266b84d05873057d8f323198e/c8a6d805c6f347deae145cf5d825c076.html",
      },
      {
        label: "SAP KBA preview: Wrong tenant and key-user extensibility",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3248190",
      },
    ],
  },
  {
    id: "inapp-analytics",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "SAP Help",
    title: "Custom Analytical Queries",
    useCase: "Create business-friendly operational reporting views.",
    whenToUse:
      "Use when users need a public-cloud safe report based on released data sources, custom fields, and standard analytical tooling.",
    summary:
      "This pattern is useful when the requirement is reporting and insight, not a new transactional process.",
    implementation: [
      "Identify the released data source and reporting fields, including any custom fields already published for analytics.",
      "Create the query with the required dimensions, measures, filters, and labels.",
      "Preview the result with realistic business data and adjust filters/semantics.",
      "Expose the query through the right analytical app or tile and test access with the business role.",
    ],
    sources: [
      {
        label: "SAP Learning: Extensibility tools for customizations",
        url: "https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition/describing-the-extensibility-tools-for-customizations-in-sap-s-4hana-cloud-public-edition",
      },
      {
        label: "SAP Help: Extensibility and Integration",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/7139c1648de84c0bbd7637589ed7c92a.html",
      },
    ],
  },
  {
    id: "inapp-templates-output",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "SAP Help",
    title: "Forms and Email Templates",
    useCase: "Change customer-facing output without changing the core application.",
    whenToUse:
      "Use when purchase orders, invoices, statements, project emails, or other outputs need additional fields, wording, branding, or layout adjustments.",
    summary:
      "Template changes are often the cleanest way to meet communication requirements while keeping transactional logic untouched.",
    implementation: [
      "Find the relevant output item, form template, or email template used by the business process.",
      "Add the required fields or wording and confirm that the field is available in the output context.",
      "Preview the generated output with real examples and check translations or country-specific variants.",
      "Transport/publish the template change and keep before/after examples for business sign-off.",
    ],
    sources: [
      {
        label: "SAP Help: Maintain Form Templates",
        url: "https://help.sap.com/docs/sap_s4hana_cloud/e5d251e6709c49ac8f472779c9f913e3/91c0300e1b0549f1973db4cf86a4e84e.html",
      },
      {
        label: "SAP Help: Maintain Email Templates",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/3ec6d47a97504ecfb95fcf6199e191bf/ef8069c143c54cc1aa6c9f1de97b144a.html",
      },
    ],
  },
  {
    id: "developer-setup",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "SAP Help",
    title: "Set Up Developer Extensibility",
    useCase: "Prepare the ABAP Cloud development tenant for on-stack extensions.",
    whenToUse:
      "Use when key-user tools are not enough and an ABAP developer needs RAP, released APIs, released CDS views, or released BAdIs inside the SAP S/4HANA Cloud ABAP environment.",
    summary:
      "This is the foundation for cloud-ready, upgrade-stable custom ABAP built close to SAP S/4HANA Cloud.",
    implementation: [
      "Confirm the system landscape and development tenant/client used for developer extensibility.",
      "Set up ABAP Development Tools, communication, and IAM access for the developer role.",
      "Create the ABAP Cloud package and keep the implementation restricted to released APIs and released extension points.",
      "Build, test, release, and move changes using the public-cloud lifecycle process.",
    ],
    sources: [
      {
        label: "SAP Help: Developer Extensibility",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/6aa39f1ac05441e5a23f484f31e477e7/e1059ff581854a699f15734049f14293.html",
      },
      {
        label: "SAP Help: Getting started as a developer",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/6aa39f1ac05441e5a23f484f31e477e7/e3527dfa1c5a41f69d4e63691f174f0a.html",
      },
    ],
  },
  {
    id: "developer-rap",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "SAP Learning",
    title: "RAP Business Object or Fiori App",
    useCase: "Build transactional custom apps with ABAP Cloud and RAP.",
    whenToUse:
      "Use when the extension needs custom tables, behavior, validations, determinations, service exposure, or a Fiori elements app that runs on the S/4HANA stack.",
    summary:
      "RAP is the main programming model for clean on-stack transactional extensions.",
    implementation: [
      "Model the custom business object, data model, behavior, and service contract.",
      "Use released APIs/CDS views for SAP data access and avoid direct dependency on unreleased objects.",
      "Create the service binding, preview the Fiori elements UI, and add IAM artifacts for access.",
      "Test behavior, authorization, extensibility contract, and transport readiness.",
    ],
    sources: [
      {
        label: "SAP Learning: Developer extensibility",
        url: "https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-public-edition/using-developer-in-app-extensibility-in-sap-s-4hana-cloud-public-edition",
      },
      {
        label: "SAP Community: Developer extensibility in S/4HANA Cloud ABAP Environment",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/developer-extensibility-in-sap-s-4hana-cloud-abap-environment/ba-p/13558432",
      },
    ],
  },
  {
    id: "developer-released-objects",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "SAP Help",
    title: "Released APIs, CDS Views, and BAdIs",
    useCase: "Use SAP-approved extension contracts instead of modifying standard code.",
    whenToUse:
      "Use whenever ABAP code needs to read SAP data, extend behavior, expose a service, or react to business logic in an upgrade-stable way.",
    summary:
      "The key developer question is not 'which table?' but 'which released object or extension point?'.",
    implementation: [
      "Search the released API, CDS view, BAdI, or RAP extension point that matches the business object.",
      "Check its release state, allowed use, semantics, and lifecycle restrictions.",
      "Implement the extension against that contract and keep references clean.",
      "Record the released objects used so the solution can be reviewed during upgrades.",
    ],
    sources: [
      {
        label: "SAP Help: Released ABAP object types",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/6923f7e5dee04243a8bbe2cc3bac4489.html",
      },
      {
        label: "SAP KBA preview: Developer and key-user custom fields",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3548459",
      },
    ],
  },
  {
    id: "developer-key-user-combination",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "KBA Preview",
    title: "Use Key-User Fields in Developer Objects",
    useCase: "Combine key-user fields with ABAP Cloud extensions.",
    whenToUse:
      "Use when a field is created by key-user extensibility but developer extensibility needs to consume it in classes, interfaces, CDS views, or custom entities.",
    summary:
      "This is a useful bridge pattern, but it needs careful tenant, release-state, and allowed-use checks.",
    implementation: [
      "Create and publish the key-user field in the correct customizing context.",
      "Confirm whether the field/data source extension is available for the target developer extensibility object.",
      "Reference the field through supported released artifacts rather than a direct table dependency.",
      "Test lifecycle movement and document which side owns the field and which side consumes it.",
    ],
    sources: [
      {
        label: "SAP KBA preview: Custom fields and developer extensibility",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3612451",
      },
      {
        label: "SAP KBA preview: Custom table and key-user usage",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3548459",
      },
    ],
  },
  {
    id: "developer-behavior-extension",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "KBA Preview",
    title: "Behavior Extensions for Standard Apps",
    useCase: "Change behavior where key-user field behavior is not enough.",
    whenToUse:
      "Use when a standard process needs developer-level behavior control, such as field properties, validations, or RAP behavior extensions that key-user tools cannot support.",
    summary:
      "This is a stronger option than in-app extension and should be used only where the released RAP extension model supports it.",
    implementation: [
      "Confirm the standard app/business object supports the needed behavior extension.",
      "Identify the released behavior definition or extension point.",
      "Implement the ABAP Cloud behavior extension and keep it inside released contracts.",
      "Test the standard app behavior thoroughly because users will experience it inside the core process.",
    ],
    sources: [
      {
        label: "SAP KBA preview: Sales contract custom field behavior workaround",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3746353",
      },
      {
        label: "SAP Help: Developer Extensibility",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/6aa39f1ac05441e5a23f484f31e477e7/e1059ff581854a699f15734049f14293.html",
      },
    ],
  },
  {
    id: "side-architecture",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Help",
    title: "Side-by-Side Extension Architecture",
    useCase: "Build a separate application or service around SAP S/4HANA Cloud.",
    whenToUse:
      "Use when the requirement is too large or too decoupled for in-app or on-stack ABAP, or when it needs its own UI, workflow, runtime, scalability, or integration landscape.",
    summary:
      "Side-by-side keeps the core clean by putting custom functionality on SAP BTP while consuming SAP S/4HANA Cloud APIs and events.",
    implementation: [
      "Define the boundary: what remains in SAP S/4HANA Cloud and what runs on SAP BTP.",
      "Find the required APIs, events, identity model, destinations, and communication arrangements.",
      "Build the extension with CAP, ABAP environment, SAP Build, Integration Suite, or another BTP runtime.",
      "Secure, deploy, monitor, and document the operational ownership of the extension.",
    ],
    sources: [
      {
        label: "SAP Help: Side-by-side extensibility",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/2a17a3e1525f4f46a9c5156bd2d3bc87.html",
      },
      {
        label: "SAP BTP Guidance: Extension use case patterns",
        url: "https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/extension-use-case-patterns",
      },
    ],
  },
  {
    id: "side-cap-extension",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Learning",
    title: "CAP-Based Extension Application",
    useCase: "Create a custom BTP app that consumes SAP S/4HANA Cloud APIs.",
    whenToUse:
      "Use when you need a custom service, data model, Fiori elements UI, or workflow outside SAP S/4HANA Cloud but still connected to it.",
    summary:
      "CAP is a practical default for many side-by-side business apps because it gives a clean service model and deployment path on BTP.",
    implementation: [
      "Create the CAP project and model the extension's own entities and service API.",
      "Import or configure the SAP S/4HANA Cloud API as an external service through destinations and communication arrangements.",
      "Build the Fiori elements or custom UI and enforce authorization with XSUAA/IAS as required.",
      "Deploy to SAP BTP, connect to the launchpad/work zone if needed, and monitor service/API errors.",
    ],
    sources: [
      {
        label: "SAP Learning: Side-by-side with CAP",
        url: "https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide/identifying-the-need-for-side-by-side-extensibility_f1e838f0-f02a-43b4-8896-cedc25a7d5d0",
      },
      {
        label: "SAP Learning: Develop extensions with CAP",
        url: "https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide",
      },
    ],
  },
  {
    id: "side-api-discovery",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Business Accelerator Hub",
    title: "API Discovery and Communication Setup",
    useCase: "Find the right SAP S/4HANA Cloud API or event before building.",
    whenToUse:
      "Use before any BTP or external integration project, especially where the business asks for create/update/read operations against SAP S/4HANA Cloud.",
    summary:
      "The API and communication scenario normally decide whether the idea is straightforward, needs a workaround, or belongs in a different extensibility lane.",
    implementation: [
      "Search SAP Business Accelerator Hub by product and business object.",
      "Review the API operations, payload, authentication, communication scenario, and test options.",
      "Create the matching communication arrangement in SAP S/4HANA Cloud and destination/connectivity in SAP BTP.",
      "Prototype the call with test data before building the full app or integration.",
    ],
    sources: [
      {
        label: "SAP Help: APIs on SAP Business Accelerator Hub",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/1e60f14bdc224c2c975c8fa8bcfd7f3f.html",
      },
      {
        label: "SAP Business Accelerator Hub: SAP S/4HANA Cloud APIs",
        url: "https://api.sap.com/products/SAPS4HANACloud/apis/all",
      },
    ],
  },
  {
    id: "side-business-events",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Help",
    title: "Business Events and Event-Driven Extensions",
    useCase: "React to SAP S/4HANA Cloud changes without polling.",
    whenToUse:
      "Use when the extension should start after a business event such as create, change, approval, or status update.",
    summary:
      "Event-driven extensions are useful for loosely coupled follow-up processing, notifications, validations, and BTP workflows.",
    implementation: [
      "Identify the business event and confirm it is available for the SAP S/4HANA Cloud process.",
      "Configure event enablement and the receiving BTP service such as Event Mesh or an event-enabled runtime.",
      "Build the subscriber/handler to enrich, validate, or trigger the next process step.",
      "Add retry, monitoring, idempotency, and business error handling because events can arrive asynchronously.",
    ],
    sources: [
      {
        label: "SAP Help: Business Event Handling",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/18658e70de3043cf894e41c38538f488.html",
      },
      {
        label: "SAP Help: Business events integration overview",
        url: "https://help.sap.com/docs/sap-api-business-hub/integration-of-business-events-from-sap-s-4hana-and-sap-s-4hana-cloud/overview",
      },
    ],
  },
  {
    id: "side-build-process-automation",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Help",
    title: "SAP Build Process Automation Extension",
    useCase: "Create workflow, approval, and task automation around SAP S/4HANA Cloud.",
    whenToUse:
      "Use when the requirement is a business workflow, approval, notification, human task, or automation step that should not be coded inside SAP S/4HANA Cloud.",
    summary:
      "This is a strong fit for process gaps where business users need visibility and control more than custom transactional code.",
    implementation: [
      "Identify the S/4HANA process, trigger, event, or API that starts the automation.",
      "Use the extension wizard or build the process automation project manually on SAP BTP.",
      "Map business data, roles, approval rules, and task outcomes back to SAP S/4HANA Cloud where required.",
      "Test exception handling, notifications, authorization, and auditability before rollout.",
    ],
    sources: [
      {
        label: "SAP Help: Process Automation Extension Wizard",
        url: "https://help.sap.com/docs/build-process-automation/sap-build-process-automation/using-sap-build-process-automation-extension-wizard-to-extend-sap-s-4hana-business-processes",
      },
      {
        label: "SAP Help: Enable the extension wizard",
        url: "https://help.sap.com/docs/build-process-automation/sap-build-process-automation/enabling-sap-build-process-automation-extension-wizard",
      },
    ],
  },
  {
    id: "side-integration-suite",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Help",
    title: "SAP Integration Suite",
    useCase: "Connect SAP S/4HANA Cloud with third-party or enterprise systems.",
    whenToUse:
      "Use when the extension is mostly integration: mappings, iFlows, APIs, events, adapters, routing, or enterprise connectivity.",
    summary:
      "Integration Suite is usually the right place when the problem is moving and transforming information between systems.",
    implementation: [
      "Define the source, target, message contract, error handling, and frequency/event trigger.",
      "Choose the Integration Suite capability: Cloud Integration, API Management, Event Mesh, Open Connectors, or another service.",
      "Build and test the integration flow against SAP S/4HANA Cloud communication arrangements and external endpoints.",
      "Add monitoring, alerting, retries, and ownership for production support.",
    ],
    sources: [
      {
        label: "SAP Help: SAP Integration Suite",
        url: "https://help.sap.com/docs/integration-suite",
      },
      {
        label: "SAP Help: Extending existing SAP solutions using SAP BTP",
        url: "https://help.sap.com/docs/btp/btp-developers-guide/extending-existing-sap-solutions-using-sap-btp",
      },
    ],
  },
  {
    id: "side-cloud-sdk",
    laneKey: "side",
    lane: "Side-by-Side",
    sourceType: "SAP Cloud SDK",
    title: "SAP Cloud SDK Application",
    useCase: "Build resilient Java or JavaScript applications that call SAP APIs.",
    whenToUse:
      "Use when custom code outside SAP S/4HANA Cloud needs SAP-aware connectivity, destinations, authentication, resilience, and typed API usage.",
    summary:
      "The Cloud SDK is helpful when a side-by-side application needs more than a raw HTTP client.",
    implementation: [
      "Create the application in Java or JavaScript/TypeScript and configure the SAP BTP destination.",
      "Use SAP Cloud SDK clients or generated clients to call SAP S/4HANA Cloud APIs.",
      "Add authentication, destination handling, retries, timeout policies, and logging.",
      "Deploy to SAP BTP and test against the target S/4HANA Cloud communication arrangement.",
    ],
    sources: [
      {
        label: "SAP Cloud SDK documentation",
        url: "https://sap.github.io/cloud-sdk/",
      },
      {
        label: "SAP Help: SAP Cloud SDK",
        url: "https://help.sap.com/docs/SAP_CLOUD_SDK",
      },
    ],
  },
  {
    id: "community-extensibility-explorer-guide",
    laneKey: "side",
    lane: "Reference",
    sourceType: "SAP Community",
    title: "Original Extensibility Explorer Guide",
    useCase: "Understand how SAP explained sample scenarios and tools in the old explorer.",
    whenToUse:
      "Use as a reference when deciding how to categorize scenarios or when explaining the old Explorer concept to a project team.",
    summary:
      "This is useful context for the website you are rebuilding, especially because the original explorer app has been sunset.",
    implementation: [
      "Use the article to understand the original explorer navigation and scenario intent.",
      "Map each scenario into In-App, Developer, or Side-by-Side based on where the extension runs.",
      "Replace outdated explorer links with SAP Help, SAP Learning, SAP Community, KBA previews, or your own GitHub assets.",
      "Keep the page focused on decision support, then drill down into implementation details.",
    ],
    sources: [
      {
        label: "SAP Community: Extensibility guide and Explorer reference",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-members/extensibility-guide-for-sap-s-4hana-cloud-sap-extensibility-explorer/ba-p/13567850",
      },
      {
        label: "SAP Community topic: Extensibility",
        url: "https://community.sap.com/topics/extensibility",
      },
    ],
  },
  {
    id: "customer-ad-reversal-controls",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Customer Asset",
    category: "Finance Validation",
    title: "Reversal Controls for Doc Type AD",
    shortDescription: "Requires reversal reason and date for AD reversals.",
    useCase: "Make reversal reason and reversal date mandatory for AD document type reversals.",
    whenToUse:
      "Use when the finance process needs stronger controls during reversal posting and the validation cannot be handled by configuration alone.",
    summary:
      "This customer asset enforces reversal governance by checking the accounting document type and requiring the reversal reason and reversal date before posting continues.",
    implementation: [
      "Confirm the posting/reversal process, the exact document type value, and where the reversal reason and reversal date are captured.",
      "Find the released validation or business add-in available for the finance document reversal process in SAP S/4HANA Cloud.",
      "Implement an ABAP Cloud validation that checks document type AD and raises a clear business error if either field is missing.",
      "Test normal reversal, exception reversal, authorization, and transport movement; then link the final GitHub source here.",
    ],
    sources: [
      {
        label: "SAP Learning: Configuring Document Reversal",
        url: "https://learning.sap.com/courses/customizing-core-settings-in-financial-accounting-in-sap-s4hana/configuring-document-reversal",
      },
      {
        label: "SAP Help: Validation BAdIs for Journal Entries",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0fa84c9d9c634132b7c4abb9ffdd8f06/fed79813a60447669f096d9fb0713e16.html",
      },
      {
        label: "SAP Help: Upload General Journal Entries FAQ",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0fa84c9d9c634132b7c4abb9ffdd8f06/583f130d246a4c61ab954580fe21787a.html",
      },
      {
        label: "SAP KBA preview: STODT and STGRD auto-reversal fields",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3591371",
      },
    ],
  },
  {
    id: "customer-restrict-ic-transactions",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Customer Asset",
    category: "Intercompany Control",
    title: "Restrict Intercompany Transactions",
    shortDescription: "Blocks non-approved IC transaction combinations.",
    useCase: "Validate and restrict intercompany transactions using custom business transaction rules.",
    whenToUse:
      "Use when specific intercompany transaction combinations are not allowed and the rule needs to be enforced before users complete posting or processing.",
    summary:
      "This asset applies a customer-defined control so only permitted intercompany transaction types or combinations can proceed.",
    implementation: [
      "Define the restricted intercompany transaction list and who owns the business rule maintenance.",
      "Store the permitted or blocked transaction rules in a supported custom business object, custom table, or released configuration source.",
      "Implement the validation in the released extension point for the target transaction process and compare the transaction against the rule set.",
      "Return a clear error message explaining why the transaction is blocked and test all allowed/blocked combinations.",
    ],
    sources: [
      {
        label: "SAP Help: Create Validation Rules using Custom Business Objects",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/a376cd9ea00d476b96f18dea1247e6a5/2447037c6bd54e7796d11d9743c84996.html",
      },
      {
        label: "SAP Tutorial: Implement Logic for a Custom Business Object",
        url: "https://developers.sap.com/tutorials/abap-extensibility-cbo-logic..html",
      },
      {
        label: "SAP Community: Validation for Intercompany Posting",
        url: "https://community.sap.com/t5/enterprise-resource-planning-q-a/validation-for-intercompany-posting/qaq-p/12462386",
      },
      {
        label: "SAP Help: Configuration for Intercompany Postings",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0fa84c9d9c634132b7c4abb9ffdd8f06/0038101c4b8b4509b82ac24ae9401773.html",
      },
    ],
  },
  {
    id: "customer-miro-partner-bank-mandatory",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Customer Asset",
    category: "Supplier Invoice Control",
    title: "Partner Bank check during Vendor Invoicing",
    shortDescription: "Forces partner bank selection when a supplier has multiple banks.",
    useCase: "Make Partner Bank mandatory in MIRO when a vendor has multiple bank accounts.",
    whenToUse:
      "Use when vendor master data has more than one bank account and invoice processing needs users to choose the correct partner bank explicitly.",
    summary:
      "This asset reduces payment risk by preventing invoice posting when SAP cannot safely infer which vendor bank should be used.",
    implementation: [
      "Identify the invoice entry process and the released source for reading supplier bank details.",
      "During invoice validation, check whether the selected supplier has more than one active bank account.",
      "If multiple banks exist and Partner Bank is blank, raise a mandatory-field style error before posting.",
      "Test single-bank vendors, multi-bank vendors, blocked/deleted bank records, and invoices where Partner Bank is correctly provided.",
    ],
    sources: [
      {
        label: "SAP Community: Partner Bank Type for Multiple Supplier Bank Accounts",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/partner-bank-type-for-multiple-supplier-bank-accounts/ba-p/12830075",
      },
      {
        label: "SAP KBA preview: MIRO and multiple vendor bank details",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/2352158",
      },
      {
        label: "SAP KBA preview: Partner bank not defaulting in Public Cloud invoice UI",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3745007",
      },
      {
        label: "SAP Community: Automate partner bank account determination",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/how-to-automate-the-determination-of-partner-bank-account-when-creating/ba-p/13513746",
      },
    ],
  },
  {
    id: "customer-tax-code-restriction",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Customer Asset",
    category: "Tax Validation",
    title: "Tax Code Restriction Validation",
    shortDescription: "Restricts tax codes by customer rule matrix.",
    useCase: "Restrict which tax codes can be used for selected business scenarios.",
    whenToUse:
      "Use when incorrect tax code selection creates compliance, reporting, or downstream posting issues and standard configuration is not enough.",
    summary:
      "This asset validates tax code usage against customer rules before the transaction is accepted.",
    implementation: [
      "Define the tax code restriction matrix by company code, country, supplier/customer, document type, account, or transaction scenario.",
      "Maintain the rule set in a supported custom business object, custom table, or configuration-backed source.",
      "Implement a released validation that checks the proposed tax code against the rule matrix during save/post.",
      "Return an actionable message that tells users which tax code pattern is expected and test high-volume posting scenarios.",
    ],
    sources: [
      {
        label: "SAP Community: Restrict non-required tax codes discussion",
        url: "https://community.sap.com/t5/enterprise-resource-planning-q-a/can-we-hide-restrict-non-required-tax-codes/qaq-p/12352606",
      },
      {
        label: "SAP KBA preview: Tax code validation with FIN_ACDOC_ITEM_VALIDATION",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3723602",
      },
      {
        label: "SAP Help: Tax Codes configuration",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0fa84c9d9c634132b7c4abb9ffdd8f06/3d7ec2531bb9b44ce10000000a174cb4.html",
      },
      {
        label: "SAP Community: Determine Tax Code in Purchase Documents",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-s-4hana-cloud-determine-tax-code-in-purchase-documents-using-condition/ba-p/13486185",
      },
    ],
  },
  {
    id: "customer-vendor-invoice-payment-bank-report",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Customer Asset",
    category: "Finance Reporting",
    title: "Vendor Payments with ref to Incoming Bank Statements",
    shortDescription: "Combines supplier invoice, payment, and bank confirmation.",
    useCase: "Show vendor invoice, payment document, and bank incoming payment confirmation in one report.",
    whenToUse:
      "Use when finance teams need a single reconciliation view that joins invoice, clearing/payment, and bank confirmation information.",
    summary:
      "This asset provides a consolidated finance report so users do not need to jump across invoice, payment, and bank confirmation apps.",
    implementation: [
      "Define the report grain: invoice line, supplier invoice, payment document, clearing item, or bank confirmation item.",
      "Identify released CDS views/APIs for supplier invoice, accounting document, payment, clearing, and bank statement/confirmation data.",
      "Create a released custom query/service or ABAP Cloud report composition with filters for company code, supplier, date, document, and status.",
      "Validate totals and document links against standard SAP apps, then expose the report through the right Fiori tile or analytical entry point.",
    ],
    sources: [
      {
        label: "SAP KBA preview: Consolidated Vendor Report with payment document",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3657692",
      },
      {
        label: "SAP Help: CDS Views for Invoice Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/67b45ec702fd466782bb94d21a2905b8.html",
      },
      {
        label: "SAP Help: Supplier Invoice CDS view",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/9d726dde11a445f29cb5b705ec6433d4.html",
      },
      {
        label: "SAP Community: CDS view to link supplier invoice and accounting document",
        url: "https://community.sap.com/t5/enterprise-resource-planning-q-a/cds-view-to-link-supplier-invoice-and-corresponding-accounting-document/qaq-p/14007589",
      },
    ],
  },
  {
    id: "customer-copy-po-text-to-gr-text",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Customer Asset",
    category: "Procurement Posting",
    title: "Copy PO Short Text to Goods Receipt Text",
    shortDescription: "Copies the purchase order item short text into the goods receipt item text.",
    useCase: "Derive the goods receipt item text and accounting item text from the purchase order short text.",
    whenToUse:
      "Use when warehouse, procurement, or finance teams need the PO description carried into goods receipt text for easier review and downstream reporting.",
    summary:
      "This in-app custom logic copies meaningful purchase order short text into the goods receipt context so the receiving document and accounting entry carry the same business description.",
    implementation: [
      "Create custom logic YY1_GRDATACHANGE for the goods receipt data-change extension point.",
      "Use extension point MMIM_GR4XY_PROVIDE_DATA, Change Header and Item Data in Goods Receipts, in business context MMIM_GR4XY.",
      "Loop through the goods receipt change items and align each change row with the source goods receipt item row.",
      "Only apply the logic when the goods receipt source is a purchase order and the purchase order item text is available.",
      "Populate DOCUMENTITEMTEXT with PURCHASEORDERITEMTEXT, then test the goods receipt item text and journal entry item text.",
    ],
    technicalNotes: {
      title: "BAdI and Custom Logic Details",
      bullets: [
        "Custom Logic: YY1_GRDATACHANGE, described as GR Data Change.",
        "Extension Point: MMIM_GR4XY_PROVIDE_DATA - Change Header and Item Data in Goods Receipts.",
        "Affected Business Context: MMIM_GR4XY.",
        "Observed result: PO short text test enh is copied to the Goods Receipt Item short text and the accounting entry Item Text.",
      ],
      codeTitle: "Published ABAP logic",
      code: `FIELD-SYMBOLS:
  <ls_gr_item>     LIKE LINE OF gr4xy_item,
  <ls_change_item> LIKE LINE OF change_item.

LOOP AT change_item ASSIGNING <ls_change_item>.
  READ TABLE gr4xy_item ASSIGNING <ls_gr_item> INDEX sy-tabix.
  IF sy-subrc <> 0.
    CONTINUE.
  ENDIF.

  CHECK <ls_gr_item>-sourceofgr = 'PURORD'.
  CHECK <ls_gr_item>-purchaseorderitemtext IS NOT INITIAL.

  <ls_change_item>-documentitemtext = <ls_gr_item>-purchaseorderitemtext.
ENDLOOP.`,
    },
    sources: [
      {
        label: "Customer implementation notes: Copy PO short text to goods receipt text",
        url: "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/copy-po-short-text-to-gr-text.md",
      },
      {
        label: "Reusable public-cloud accelerator playbook",
        url: "https://github.com/sap-cloud-lab/sap-extensibility-explorer/blob/content-updates/docs/customer-accelerators/reusable-public-cloud-accelerator-playbook.md",
      },
      {
        label: "SAP KBA preview: PO short text in Goods Receipt not transferred to FI",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/2921484",
      },
      {
        label: "SAP KBA public: Journal entry item text not copied into goods receipt booking",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3649852",
      },
      {
        label: "SAP Community: PO short text in Goods Receipt not transferred to FI",
        url: "https://community.sap.com/t5/enterprise-resource-planning-q-a/po-short-text-in-goods-receipt-not-transferred-to-fi/qaq-p/12350822",
      },
      {
        label: "SAP Help: Post Goods Receipt for Purchasing Document",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/32da8359c8ee4e8b8e8c5e15cacba5aa/31661de4ee984e4ea7a3a984e6bcca4b.html",
      },
    ],
  },
  {
    id: "online-custom-field-validation",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Field Validation",
    title: "Validate a Custom Field with Developer Extensibility",
    shortDescription: "Adds screen validation to a key-user custom field.",
    useCase: "Validate a custom field created through key-user extensibility using developer extensibility.",
    whenToUse:
      "Use when a key-user field needs stricter logic than simple field enablement, especially where the validation should run inside the standard screen flow.",
    summary:
      "This online example shows the common pattern of combining key-user fields with developer extensibility for stronger validation.",
    implementation: [
      "Create and publish the custom field through key-user extensibility in the required business context.",
      "Find the released developer extension point or RAP/BAdI option that can validate the field during save.",
      "Implement the validation with a clear error message and avoid relying on unreleased tables or objects.",
      "Test field behavior in the standard app, transport lifecycle, and role-specific access.",
    ],
    sources: [
      {
        label: "SAP Community: Add validation to a custom field via developer extensibility",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/add-a-validation-to-a-custom-field-via-developer-extensibility-in-sap-s/ba-p/13522589",
      },
    ],
  },
  {
    id: "online-auto-generate-custom-field",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "Field Derivation",
    title: "Auto-Populate a Custom Field",
    shortDescription: "Generates and fills a custom field value automatically.",
    useCase: "Use key-user custom logic to generate a value and populate a custom field.",
    whenToUse:
      "Use when the business wants a derived value, sequence, or default maintained by system logic instead of manual user entry.",
    summary:
      "This online example is useful for simple in-app derivation where a custom field should be populated by custom business logic.",
    implementation: [
      "Create the custom field in the relevant business context and enable it for the target app/process.",
      "Create a Custom Logic implementation for the available BAdI/extension point.",
      "Generate or derive the field value based on the available importing data and supported APIs.",
      "Publish the logic and test create/change scenarios where the field should be filled automatically.",
    ],
    sources: [
      {
        label: "SAP Community: Adding custom business logic in SAP S/4HANA Cloud",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/key-user-extensibility-on-sap-s-4hana-cloud-adding-custom-business-logic/ba-p/13340947",
      },
    ],
  },
  {
    id: "online-purchase-requisition-field-status",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "Procurement Field Control",
    title: "Purchase Requisition Field Status Control",
    shortDescription: "Sets PR fields as hidden, read-only, mandatory, or optional.",
    useCase: "Change field status for purchase requisition fields using Custom Logic.",
    whenToUse:
      "Use when procurement needs field control that is not available through configuration, such as making a field mandatory only for selected scenarios.",
    summary:
      "This online example shows how Custom Logic can control field properties in purchase requisitions.",
    implementation: [
      "Define the procurement scenario and the exact field status rule.",
      "Implement the relevant field-control BAdI in the Custom Logic app.",
      "Set supported field properties such as mandatory, optional, read-only, or hidden based on context.",
      "Test the PR flow across document types, roles, approval paths, and follow-on documents.",
    ],
    sources: [
      {
        label: "SAP Community: Change field status of purchase requisitions",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/using-custom-logic-in-sap-s-4hana-cloud-to-change-field-status-of-purchase/ba-p/14312488",
      },
      {
        label: "SAP KBA public: Field control in Purchase Orders and Purchase Requisitions",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3268822",
      },
    ],
  },
  {
    id: "online-sales-document-item-checks",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Sales Validation",
    title: "Sales Document and Item Checks",
    shortDescription: "Raises validation messages for sales document conditions.",
    useCase: "Use Cloud BAdIs to check sales document header, item, partner, pricing, or schedule-line data.",
    whenToUse:
      "Use when sales order or sales document processing needs customer-specific checks before save or during document processing.",
    summary:
      "This online example is a sales-side equivalent of the finance/procurement validations in your current asset list.",
    implementation: [
      "Identify whether the validation belongs at sales document header, item, partner, schedule line, or pricing level.",
      "Select the released Cloud BAdI for that sales document entity.",
      "Implement the check and raise a relevant message when the condition is not met.",
      "Test creation, change, copy, rejection, and follow-on billing or delivery scenarios.",
    ],
    sources: [
      {
        label: "SAP Community: Cloud BAdIs to Check Sales Document and Items",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/cloud-badis-to-check-sales-document-and-items/ba-p/14299492",
      },
      {
        label: "SAP Community: Sales Document BAdI Overview",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sales-document-badi-overview-in-sap-s-4hana-public-cloud/ba-p/14187206",
      },
    ],
  },
  {
    id: "online-enterprise-project-id-validation",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Project Validation",
    title: "Enterprise Project ID Validation",
    shortDescription: "Validates project IDs before project data is accepted.",
    useCase: "Use a project validation BAdI to enforce customer rules for Enterprise Project IDs.",
    whenToUse:
      "Use when project identifiers need a naming convention, prefix, length, or business-rule validation in SAP S/4HANA Cloud.",
    summary:
      "This online example is a clean validation asset for project systems and professional services scenarios.",
    implementation: [
      "Define the project ID rule and examples of allowed and blocked values.",
      "Implement the released project validation BAdI for the relevant project object.",
      "Raise a clear validation message when the ID does not meet the rule.",
      "Test project creation/change, templates, imports, and role-specific project maintenance.",
    ],
    sources: [
      {
        label: "SAP Community: Enterprise Project ID validation via BAdI",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/enterprise-project-id-validation-via-badi-s4ppm-project-validation/ba-p/14073936",
      },
    ],
  },
  {
    id: "online-edocument-currency-change",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "eDocument Extension",
    title: "Change eDocument Currency",
    shortDescription: "Uses custom logic to adjust eDocument currency output.",
    useCase: "Change eDocument currency behavior using key-user in-app Custom Logic extensibility.",
    whenToUse:
      "Use when country/localization-specific electronic document output needs a value adjustment that standard configuration does not cover.",
    summary:
      "This online example is a localization-style extension asset using Custom Logic.",
    implementation: [
      "Identify the eDocument process, country/localization requirement, and field/value to adjust.",
      "Open the relevant Custom Logic BAdI for eDocument processing.",
      "Implement the currency/value change using supported context data and test generated XML/output.",
      "Validate with the localization process owner before production rollout.",
    ],
    sources: [
      {
        label: "SAP Community: Change eDocument currency using Custom Logic",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/how-to-use-key-user-in-app-custom-logic-extensibility-to-change-edocument/ba-p/14206358",
      },
    ],
  },
  {
    id: "online-gr-bill-of-lading-mandatory",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "Goods Receipt Control",
    title: "Bill of Lading Mandatory at Goods Receipt",
    shortDescription: "Requires Bill of Lading for selected goods receipts.",
    useCase: "Make Bill of Lading mandatory during goods receipt processing using custom logic.",
    whenToUse:
      "Use when receiving needs transport/import references captured before the goods receipt can be posted.",
    summary:
      "This online example is close to your PO-to-GR text asset: it is a goods receipt control implemented through public cloud custom logic.",
    implementation: [
      "Define the purchasing/import scenario where Bill of Lading must be provided.",
      "Implement the goods receipt item check BAdI and identify the available input fields.",
      "Raise a blocking message if the required field is missing for the selected scenario.",
      "Test MIGO or goods receipt apps, import purchase orders, and edge cases where the field is not passed into the backend.",
    ],
    sources: [
      {
        label: "SAP KBA public: Goods Receipt Bill of Lading value not captured",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3610497",
      },
      {
        label: "SAP Community: MIGO BAdI in SAP S/4HANA Public Cloud",
        url: "https://community.sap.com/t5/technology-q-a/migo-badi-in-sap-s-4hana-public-cloud/qaq-p/14154477",
      },
    ],
  },
  {
    id: "online-profit-center-substitution",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Finance Substitution",
    title: "Profit Center Substitution During Posting",
    shortDescription: "Substitutes profit center during journal entry posting.",
    useCase: "Use a finance substitution BAdI to derive or replace profit center during posting.",
    whenToUse:
      "Use when finance coding should be derived automatically from business rules rather than relying on manual entry.",
    summary:
      "This online example is a finance substitution asset that complements validation-style finance assets.",
    implementation: [
      "Define the profit center derivation rule and source fields used to decide the value.",
      "Implement the released coding block substitution BAdI or substitution rule approach.",
      "Trace whether the substitution is called and whether the final journal entry reflects the derived value.",
      "Test manual journal entry, integrated postings, document splitting, and reporting impact.",
    ],
    sources: [
      {
        label: "SAP KBA public: Profit Center Substitution BAdI",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3730374",
      },
      {
        label: "SAP Help: Substitutions and validations using Business Add-Ins",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/90c07e91c7a64f328be3fd6b48955b13/fa6635f0f3ef468a87a4004dbbb2a812.html",
      },
    ],
  },
  {
    id: "online-billing-header-mandatory-fields",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Billing Validation",
    title: "Mandatory Billing Header Fields",
    shortDescription: "Makes selected billing header fields mandatory.",
    useCase: "Make fields mandatory in preliminary billing document header data.",
    whenToUse:
      "Use when billing governance requires fields to be filled before preliminary billing can move forward.",
    summary:
      "This online example is a billing-side mandatory-field asset, similar in shape to your MIRO Partner Bank mandatory check.",
    implementation: [
      "Identify the preliminary billing process and the header fields that must become mandatory.",
      "Implement the billing header BAdI or validation hook available for the process.",
      "Raise a business message if required values are missing.",
      "Test preliminary billing document creation, change, conversion to invoice, and follow-on effects.",
    ],
    sources: [
      {
        label: "SAP KBA preview: Mandatory fields in Billing Header data",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3599594",
      },
    ],
  },
  {
    id: "online-billing-custom-fields-email-output",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Billing Output",
    title: "Populate Billing Custom Fields for Email Templates",
    shortDescription: "Fills billing custom fields so output templates can use them.",
    useCase: "Populate billing custom fields during billing document creation so email templates can read the values.",
    whenToUse:
      "Use when a custom billing field appears blank in email/output because the value has not persisted to the billing document database.",
    summary:
      "This online example is an output enablement asset for billing documents and email templates.",
    implementation: [
      "Identify which custom billing fields are required in the email or form template.",
      "Implement the billing data transfer BAdI to populate and persist those fields.",
      "Update the email/form template to consume the persisted custom field.",
      "Test document creation, output generation, resend, and cases where the field is manually filled.",
    ],
    sources: [
      {
        label: "SAP KBA public: Custom Fields in Email Template not Populated",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3762927",
      },
      {
        label: "SAP KBA public: Inconsistent behavior with SD_BIL_DATA_TRANSFER",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/3710704",
      },
    ],
  },
  {
    id: "online-purchase-order-output-recipients",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "Purchase Order Output",
    title: "Purchase Order Output Recipients",
    shortDescription: "Adds custom logic for PO output recipient handling.",
    useCase: "Use Purchase Order Output Management BAdIs to influence email/output behavior.",
    whenToUse:
      "Use when PO output needs multiple recipients or custom recipient determination beyond standard setup.",
    summary:
      "This online example is an output-management asset for purchase order communication.",
    implementation: [
      "Define recipient determination rules for purchase order output.",
      "Implement the relevant Purchase Order Output Management BAdI in Custom Logic.",
      "Return the required recipient data while respecting standard output channel rules.",
      "Test PO create/change, output preview, email generation, and supplier-specific exceptions.",
    ],
    sources: [
      {
        label: "SAP Community: Custom Logic/BAdIs in Purchase Order Output Management",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/custom-logic-badis-extensibility-in-purchase-order-output-management/ba-p/13658149",
      },
    ],
  },
  {
    id: "online-sales-contract-custom-field-copy",
    laneKey: "inapp",
    lane: "In-App",
    sourceType: "Online Example",
    category: "Sales Field Copy",
    title: "Sales Contract Custom Field Copy",
    shortDescription: "Controls copying of custom fields in sales contract assignment.",
    useCase: "Control field copy behavior when assigning or copying sales contract data.",
    whenToUse:
      "Use when sales custom fields need to flow, or not flow, between contract-related documents based on business rules.",
    summary:
      "This online example is a sales data-flow asset for custom field propagation.",
    implementation: [
      "Identify the source and target sales document objects and the custom fields to copy.",
      "Enable custom fields in the required business contexts.",
      "Implement the Custom Logic BAdI that controls sales contract assignment or copy behavior.",
      "Test create-with-reference, assignment, change, and downstream billing/delivery scenarios.",
    ],
    sources: [
      {
        label: "SAP Community: Controlling Field Copy Behavior in Sales Contract Assignment",
        url: "https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/controlling-field-copy-behavior-in-sales-contract-assignment/ba-p/14410988",
      },
    ],
  },
  {
    id: "online-one-invoice-per-solution-order",
    laneKey: "developer",
    lane: "Developer",
    sourceType: "Online Example",
    category: "Billing Split Control",
    title: "One Invoice per Solution Order",
    shortDescription: "Uses custom logic to influence billing split behavior.",
    useCase: "Implement custom logic so billing documents are grouped according to solution order requirements.",
    whenToUse:
      "Use when standard billing split behavior does not match the business requirement for solution-order-driven invoicing.",
    summary:
      "This online example is a billing control asset for invoice grouping and split behavior.",
    implementation: [
      "Confirm the invoice grouping requirement and the source field that identifies the solution order.",
      "Add or use a custom field where needed and populate it through billing data transfer logic.",
      "Use the billing BAdI/custom logic to influence split-relevant data.",
      "Test multiple solution orders, mixed billing items, cancellations, and rebilling.",
    ],
    sources: [
      {
        label: "SAP KBA public: One invoice per Solution Order using custom logic",
        url: "https://userapps.support.sap.com/sap/support/knowledge/en/2927115",
      },
    ],
  },
];
