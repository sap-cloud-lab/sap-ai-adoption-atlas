# Visual generation notes

## Authoritative implementation diagram

`servicenow-cost-object-provisioning-architecture.png` is the authoritative architecture diagram for this requirements pack. It is rendered deterministically by `render-architecture.ps1` so that SAP API names, approval boundaries and status semantics can be maintained exactly.

## Supplementary AI-generated concept

Mode: OpenAI built-in image generation.

Workspace output: `servicenow-cost-object-provisioning-architecture-ai-concept.png`.

Final prompt:

> Create one landscape 16:9 SAP-style enterprise architecture infographic concept for the user's ServiceNow-to-SAP cost center/WBS provisioning scenario. Use case: infographic-diagram / productivity-visual. Exact title: "Governed AI Provisioning for Cost Centers & WBS Elements". Show clearly separated visual lanes: 1) Microsoft 365 email and ServiceNow request, 2) SAP Integration Suite, 3) SAP Business AI with Joule and Joule Studio, 4) SAP Build Process Automation with a large HUMAN APPROVAL gate, 5) SAP Business Data Cloud and Knowledge Graph, 6) SAP S/4HANA Cloud Finance with Cost Center, Enterprise Project/WBS, Plan & Budget, 7) monitoring/audit. Use concise readable labels only; human approval before any create/release; no implication that ChatGPT/Codex directly writes SAP. Palette navy #062b5e, SAP blue #086ad8, cyan #22b9de, lavender #7056ff, teal #2aa7a1, white. Clean vector-like, high contrast, no logos/trademarks, no decorative clutter, no watermark.

The AI-generated concept is included for presentation inspiration only. Its “Blocked / Draft” label is not an authoritative SAP status statement. For implementation decisions, use the deterministic diagram and the requirements document: cost-center proposals remain staged outside S/4HANA until approval; enterprise projects and WBS elements use documented Created (`00`) and Released (`10`) processing statuses with the required blocking controls.
