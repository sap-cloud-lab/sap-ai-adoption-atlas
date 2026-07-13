# SAP Extensibility Decision Guide

## One-Screen Choice

| Question | Best fit | Why |
| --- | --- | --- |
| Can a business expert or functional consultant make the change using SAP Fiori extensibility apps? | In-app / key user extensibility | Lowest friction, closest to standard SAP, no separate runtime. |
| Do we need custom ABAP code close to S/4HANA data and transactions, while staying upgrade-stable? | Developer extensibility | Uses ABAP Cloud, released APIs, CDS views, BAdIs, and RAP extension points. |
| Do we need a separate app, workflow, integration, mobile experience, automation, event consumer, or multi-system process? | Side-by-side extensibility | Runs outside the core, commonly on SAP BTP, and integrates through APIs and events. |

## What Is Possible

| Capability | In-app / key user | Developer extensibility | Side-by-side extensibility |
| --- | --- | --- | --- |
| Adapt Fiori UI fields, labels, layouts | Yes | Sometimes, through developer-built apps or annotations | Yes, in external apps or launchpad-integrated apps |
| Add custom fields | Yes | Yes, when released extensibility points allow it | Usually consumed through APIs, not owned in core |
| Add simple validations or calculations | Yes, through Custom Fields and Logic where available | Yes, through released BAdIs, RAP behavior, and ABAP Cloud | Yes, if the logic can run externally through API/event integration |
| Create custom business objects | Yes, for key-user-sized objects | Yes, with RAP custom BOs | Yes, in CAP, ABAP BTP, HANA Cloud, or another BTP runtime |
| Extend RAP business objects | No | Yes, this is a main developer extensibility path | Indirectly, by integrating with exposed APIs/events |
| Build a full custom transactional app | Limited | Yes, on-stack with ABAP Cloud and RAP | Yes, commonly with CAP, SAP Build, ABAP BTP, Kyma, Java, Node.js, or mobile SDKs |
| Add approval workflows or process automation | Limited to available in-app options | Possible if close to S/4HANA logic | Strong fit with SAP Build Process Automation, CAP, and event-driven extensions |
| Consume S/4HANA events | No | Sometimes, depending on exposed event model | Yes, a core side-by-side pattern |
| Integrate third-party systems | Limited | Possible for tightly governed scenarios | Strong fit through SAP Integration Suite, APIs, events, and destinations |
| Build mobile/native apps | No | Not usually | Strong fit |
| Advanced analytics or ML | Limited custom analytical queries | Possible if on-stack and released data is enough | Strong fit when using BTP, Datasphere, HANA Cloud, AI, or external services |
| Keep S/4HANA clean core | Yes, if using released in-app tools | Yes, if restricted to ABAP Cloud and released objects | Yes, if integration uses stable APIs/events and avoids core modification |

## In-App / Key User Extensibility

Best for:

- Custom fields and field enablement in supported business contexts.
- Simple logic through the Custom Fields and Logic app.
- UI adaptation, variants, launchpad content, forms, and email templates.
- Custom analytical queries and reports.
- Custom business objects and reusable elements where the standard in-app tooling supports the use case.

Watch-outs:

- It is not meant for large application development teams or full applications from scratch.
- Logic is intentionally restricted for lifecycle stability.
- Availability depends heavily on the business context and released extension points.

Useful sample/scenario anchors:

- Historical Extensibility Explorer in-app scenarios in `SAP-archive/cloud-s4-sample-ext`.
- `SAP-samples/localization-toolkit-s4hana-cloud-tax-id-validation` for a Custom Fields and Logic validation pattern.

## Developer Extensibility

Best for:

- ABAP developers building on the SAP S/4HANA Cloud ABAP Environment.
- Custom code that needs to sit close to SAP data and transactions.
- Extending released RAP business objects.
- Creating custom RAP business objects, behavior, actions, validations, determinations, and Fiori elements apps.
- Using released SAP APIs, CDS views, BAdIs, and ABAP Cloud language rules.

Watch-outs:

- Only released SAP objects should be used.
- The model is upgrade-stable by design, but less free than classic ABAP modification.
- It is different from side-by-side ABAP in the SAP BTP ABAP Environment.

Useful sample anchors:

- `SAP-samples/abap-platform-rap-workshops`
- `SAP-samples/abap-platform-rap630`
- `SAP-samples/teched2024-DT280`
- `SAP-samples/teched2025-DT261`
- `SAP-samples/cross-stack-partner-reference-extension`

## Side-by-Side Extensibility

Best for:

- New standalone applications or UIs.
- Event-driven extensions.
- Cross-system workflows and integrations.
- Complex process automation.
- Mobile apps and external portals.
- Extensions that should scale, deploy, and evolve independently from S/4HANA.
- CAP, SAP Build, SAP Integration Suite, SAP Event Mesh / Advanced Event Mesh, Kyma, Java, Node.js, SAP BTP ABAP Environment, HANA Cloud, and third-party services.

Watch-outs:

- The integration is only as good as the released APIs, events, and communication arrangements available.
- Production solutions need proper authentication, authorization, monitoring, error handling, testing, transactional design, and support processes. Several historical samples intentionally omit these topics for simplicity.
- Data duplication and latency need explicit design.

Useful sample anchors:

- `SAP-samples/cloud-extension-s4hana-business-process`
- `SAP-samples/btp-s4hana-nocode-extension`
- `SAP-samples/s4hana-cloud-extension-process-automation`
- `SAP-samples/btp-s4hana-kyma-business-process-extension`
- `SAP-samples/s4hana-cloud-ext-timesheet`
- `SAP-samples/partner-reference-application-extension`
- `SAP-samples/abap-platform-rap620`

## Practical Rule

Start with the smallest clean-core option that can meet the requirement:

1. Try in-app if the need is a supported field, UI, form, report, or simple logic change.
2. Move to developer extensibility if the logic needs ABAP, RAP, or deeper on-stack behavior but can use released objects.
3. Move to side-by-side if the solution is a separate app, integration, event consumer, workflow, mobile experience, or cross-system process.
