# SAP Business AI architecture 2026 — placement notes

Snapshot date: 13 July 2026

The image uses SAP's post-Sapphire 2026 structure:

1. **Joule / Joule Work** — the engagement layer for people.
2. **SAP Autonomous Suite** — the business applications and processes where work runs.
3. **SAP Business AI Platform** — the unified foundation for building, contextualising, reasoning, governing, and running AI.

## Where the requested items sit

| Item | Correct placement |
|---|---|
| SAP Business AI | Umbrella portfolio and value proposition; not one technical runtime. |
| Joule Work | User experience and engagement layer. |
| Joule Assistants | Role- and process-aware coordinators of agents. |
| Joule Agents | SAP-delivered, custom, or third-party agents that reason and execute work. |
| Joule Skills | Bounded, deterministic actions used by Joule and agents. |
| SAP Autonomous Suite | Finance, Spend, SCM, HCM, and CX domains, with Industry AI across them. |
| Joule Studio | Build pillar; design time for agents, applications, skills, extensions, and workflows. |
| SAP Integration Suite | Build and integration pillar; connects SAP and non-SAP systems through APIs, events, adapters, Graph, MCP, and A2A patterns. |
| AI Foundation | Cross-cutting technical and AI operating-system view on SAP BTP, integrated into SAP Business AI Platform. |
| Unified AI Portal | Central access/interface term within AI Foundation, not a separate 2026 platform or runtime. |
| generative AI hub | Multi-provider model access, prompts, orchestration, evaluation, and grounding capabilities delivered with SAP AI Core and SAP AI Launchpad. It is not an LLM. |
| SAP AI Core | AI workload execution and lifecycle foundation on SAP BTP. |
| SAP AI Launchpad | Management and operations interface for AI scenarios and generative AI hub capabilities. |
| SAP Document AI | Reusable SAP AI service for structured and unstructured business documents. |
| SAP Business Data Cloud | Governed data products and business data fabric across SAP and third-party sources. |
| SAP Knowledge Graph | SAP-managed semantic map of business entities, processes, policies, APIs, and relationships; it does not replace the live transaction-data store. |
| SAP AI Services and Models | SAP Domain Models, SAP-ABAP-1, SAP-RPT-1.5, SAP Document AI, and governed third-party models. |
| SAP AI Agent Hub | Vendor-agnostic discovery, inventory, evaluation, and governance for agents, LLMs, and MCP servers; it does not execute agents. |
| Joule Studio runtime | Managed production execution environment for custom agents, apps, and workflows; separate from SAP AI Core. |
| SAP LeanIX / SAP Signavio / SAP Cloud ALM | Architecture, process/value, and operational observability controls. |
| Salesforce / Agentforce | Non-SAP endpoint connected through Integration Suite, APIs, MCP/A2A, and governed through SAP AI Agent Hub where applicable. |

## SAP Business Data Cloud components shown

- SAP Datasphere
- SAP Analytics Cloud
- SAP HANA Cloud
- SAP Business Warehouse
- SAP Master Data Governance
- SAP Databricks
- SAP Business Data Cloud Connect
- Governed data products and SAP/third-party data sharing

## Important naming corrections

- Use **Joule**, not "Journey."
- Use **AI Foundation**, not "SAP Foundation," for the BTP technical capability set.
- **SAP Foundation Model** is a broad course/architecture term; current product-level naming is more specific, including SAP Domain Models, SAP-ABAP-1, and SAP-RPT-1.5.
- **Salesforce** is not part of SAP Business AI Platform. SAP Sales Cloud belongs under Autonomous CX; SAP SuccessFactors belongs under Autonomous HCM.
- The 2026 SAP Business AI Platform view supersedes the older flat list of unrelated product boxes. AI Foundation remains valid as a nested technical view.

## Availability caveat

Some 2026 capabilities are announced, Early Adopter, or in phased rollout. In particular, the new Joule Studio and Joule Studio runtime were announced with Q3 2026 general-availability targets. Always verify edition, region, entitlement, and release before making a customer commitment.

## Primary official SAP sources

- [SAP Business AI Platform](https://www.sap.com/products/ai-platform.html)
- [SAP Sapphire 2026 Innovation News Guide](https://www.sap.com/topics/events/sapphire/innovation-news-guide-2026)
- [Joule Work](https://www.sap.com/products/artificial-intelligence/joule-work.html)
- [Joule Agents and Joule Assistants](https://www.sap.com/products/artificial-intelligence/ai-agents.html)
- [SAP Business Data Cloud](https://www.sap.com/products/data-cloud.html)
- [SAP AI Services and Models](https://www.sap.com/products/artificial-intelligence/ai-models.html)
- [SAP Knowledge Graph](https://www.sap.com/products/artificial-intelligence/knowledge-graph.html)
- [SAP AI Agent Hub](https://www.sap.com/products/artificial-intelligence/ai-agent-hub.html)
- [Exploring AI Foundation](https://learning.sap.com/courses/becoming-an-sap-btp-solution-architect/exploring-ai-foundation)
- [Generative AI hub](https://help.sap.com/docs/sap-ai-core/generative-ai/generative-ai-hub)
- [SAP AI-native North Star architecture](https://architecture.learning.sap.com/docs/ai-native-north-star-architecture/executive-summary)

