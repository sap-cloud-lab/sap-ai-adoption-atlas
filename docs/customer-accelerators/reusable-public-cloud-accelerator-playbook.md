# Reusable Public Cloud Accelerator Playbook

## Purpose

Use this checklist when implementing one of these accelerators for another SAP S/4HANA Cloud Public Edition customer. The goal is to capture enough detail so Codex and the delivery team can reproduce the solution without relying on memory, screenshots, or informal notes.

## Mandatory Capture Checklist

For every accelerator, capture:

1. Business requirement in plain language.
2. Process area and business owner.
3. Extensibility option: In-App, Developer, or Side-by-Side/BTP.
4. SAP app IDs reviewed.
5. Standard SAP limitation or gap.
6. Chosen extension point, BAdI, API, CDS view, event, or app.
7. Rejected options and why they were rejected.
8. Custom field names and technical names.
9. Configuration dependencies.
10. Role/catalog dependencies.
11. Transport and lifecycle path.
12. Exact code or implementation configuration.
13. Test script with positive, negative, and regression tests.
14. Screenshots before and after.
15. Rollback plan.

## Customer Intake Questions

Ask these before building:

- Which company codes, plants, purchasing organizations, ledgers, or countries are in scope?
- Is this a global rule or a local/site-specific rule?
- Is there an existing standard field that can be used instead of a custom field?
- Is this a pre-go-live design decision or a post-go-live retrofit?
- Does the requirement need validation, substitution, derivation, reporting, integration, or a new app?
- Should the system block the user, warn the user, default a value, or only report an exception?
- What exact message should the user see?
- Who owns maintenance of custom fields, rules, and test evidence?
- What release regression checks are required after SAP quarterly upgrades?

## Extensibility Decision Rules

Use In-App extensibility when:

- The requirement can be met with Custom Fields, Custom Logic, UI adaptation, forms/templates, custom analytical queries, or custom CDS/reporting.
- No separate runtime is needed.
- The solution can remain clean-core and release-stable inside SAP S/4HANA Cloud.

Use Developer extensibility when:

- ABAP Cloud, RAP, released BAdIs, released APIs, or released CDS views are required.
- The solution needs more complex backend behavior than key-user tooling can provide.
- The customer has an approved developer extensibility setup and lifecycle.

Use Side-by-Side/BTP when:

- The solution needs a separate app, workflow, integration, CAP service, event processing, or orchestration layer.
- The requirement spans systems or external services.
- SAP S/4HANA Cloud should remain the system of record while the extension runs outside the core.

## Implementation Pack Structure

Each accelerator should have:

- One website card.
- One GitHub markdown implementation playbook.
- One source-code folder when code is available.
- One test evidence folder when screenshots or exports are available.
- One README section explaining how to adapt it for another customer.

Recommended folder pattern:

```text
docs/customer-accelerators/<accelerator-name>.md
src/customer-accelerators/<accelerator-name>/
evidence/customer-accelerators/<accelerator-name>/
```

## Definition Of Done

An accelerator is implementation-ready when:

- The business requirement is clear.
- The chosen extensibility option is justified.
- The SAP objects are named.
- The code or configuration is included.
- The fields and APIs/CDS dependencies are listed.
- The test script covers happy path, negative path, and regression.
- The rollback plan is documented.
- The customer-specific variables are separated from reusable logic.

## Automation Notes For Codex

When asking Codex to implement the same accelerator for another customer, provide:

1. The GitHub markdown playbook link.
2. The target customer scope values.
3. The exact SAP release if known.
4. Any changed field names, app IDs, plants, company codes, or business rules.
5. Whether code should be copied exactly or adapted.
6. Whether the output should be website content, GitHub source code, test script, or all three.
