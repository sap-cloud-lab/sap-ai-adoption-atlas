# Aging Report With Specific Key Date

## Accelerator Summary

This accelerator creates a custom AP aging reporting experience that allows finance users to select a specific key date. It was created because the original SAP app path did not meet the customer's key-date requirement.

## Extensibility Classification

- Extensibility option: In-App extensibility
- SAP capability: Custom analytical/reporting app
- Business process: Accounts Payable aging
- Primary requirement: User-selected key date
- Customer source type: Customer accelerator

## Business Problem

Finance users needed to run AP aging for a specific key date. The original app and linked analysis options did not provide the required user experience or parameter behavior. A custom reporting app was therefore required to make the key date explicit and controllable.

## SAP Apps And Objects Reviewed

| Reference | Notes |
| --- | --- |
| `F4401` | Aging Report for Accounts Payable. Original app reviewed and found not suitable for the required key-date behavior. |
| `C_F5240` | Analyze KPI Details. Reviewed as a linked analytical option. |
| `F1733` | Aging Analysis for S/4HANA. Reviewed as an alternate aging analysis path. |
| `C_APFLEXIBLEAGING` | CDS reference visible from the F1733 app context in the working notes. |

## Requirement Details

The custom app should support:

- A mandatory key-date parameter.
- Net due interval 1.
- Net due interval 2.
- Net due interval 3.
- Display currency.
- Exchange rate type.
- Aging output suitable for Accounts Payable review.

The screenshot evidence showed an example key date of `11/07/2025`, net due intervals `30`, `60`, and `90`, display currency `AUD`, and exchange rate type `M`.

## Implementation Steps

1. Reproduce the limitation in SAP app `F4401`.
2. Capture screenshots of the original app and explain why the standard key-date behavior does not meet the customer need.
3. Review linked app `C_F5240`.
4. Review aging analysis app `F1733`.
5. Confirm whether `C_APFLEXIBLEAGING` or related released analytical content can be used as the reporting basis.
6. Design the custom app parameter set:
   - Key date
   - Net due interval 1
   - Net due interval 2
   - Net due interval 3
   - Display currency
   - Exchange rate type
7. Build the custom analytical app/report using the customer's approved S/4HANA Cloud reporting extensibility approach.
8. Set key date as visible and mandatory.
9. Set sensible defaults for intervals and currency if the business wants them.
10. Test current-date aging and compare with the standard app.
11. Test historical key-date aging and confirm the output with finance.
12. Validate currency display and exchange-rate type behavior.
13. Publish the tile/app to the required business catalog or role.
14. Document support ownership and future release regression checks.

## Test Script

| Test ID | Scenario | Expected Result |
| --- | --- | --- |
| AGE-001 | Run report for today's date | Output reconciles to the standard app or agreed baseline |
| AGE-002 | Run report for a historical key date | Output reflects the selected historical key date |
| AGE-003 | Change interval buckets to 30/60/90 | Aging buckets update correctly |
| AGE-004 | Change display currency | Amounts display in the selected currency |
| AGE-005 | Change exchange rate type | Conversion follows the selected exchange rate type |
| AGE-006 | Leave key date blank | App prevents execution or shows a clear validation message |
| AGE-007 | Run with finance end-user role | User can access and execute the tile/app |
| AGE-008 | Run after a quarterly release | Key-date behavior still works |

## Evidence To Capture

- Screenshot of `F4401` showing why the requirement is not met.
- Screenshot of linked app review for `C_F5240`.
- Screenshot or notes for `F1733` and `C_APFLEXIBLEAGING`.
- Custom app parameter screen.
- Output for current date.
- Output for historical key date.
- Finance validation sign-off.

## Customer-Specific Inputs To Confirm Before Reuse

- Which company codes are in scope?
- Is the key date always mandatory?
- What are the default aging intervals?
- Which display currencies are allowed?
- Which exchange rate types are allowed?
- Should users be allowed to adapt filters?
- Is supplier, reconciliation account, payment block, or document type filtering required?
- Should the result link back to supplier line items or documents?

## Rollback Plan

1. Remove the custom app/tile from the affected business catalog or role.
2. Keep the custom report object inactive for audit and comparison.
3. Direct users back to the standard SAP app while the custom app is corrected.
