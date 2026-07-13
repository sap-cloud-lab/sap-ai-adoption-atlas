# Copy PO Short Text to Goods Receipt Text

## Accelerator Summary

This accelerator copies the purchase order item short text into the goods receipt item text. The same text then appears in the follow-on accounting entry item text, making the receiving document and finance posting easier to understand.

## Extensibility Classification

- Extensibility option: In-App extensibility
- SAP capability: Custom Logic
- Business process: Procurement goods receipt for purchasing documents
- Source object: Purchase Order item short text
- Target object: Goods Receipt item document text
- Downstream impact: Accounting entry item text
- Customer source type: Customer accelerator

## Business Problem

The standard process did not carry the purchase order item short text into the goods receipt and accounting entry in the way required by the customer. Business users wanted the PO item description visible at receipt and downstream finance review, without manually retyping it during goods receipt.

## When To Use This Accelerator

Use this when:

- Goods receipt users need the PO item short text copied automatically.
- Finance users need a meaningful item text in the accounting entry.
- The goods receipt is created with reference to a purchase order.
- The requirement can be solved inside S/4HANA Cloud using released in-app custom logic.

Do not use this unchanged when:

- Goods receipt text must always remain manually entered by the receiving team.
- The business wants different target text by plant, movement type, supplier, or purchasing group and those rules have not been designed.
- The required source or target fields are not available in the released extension point for the customer's release.

## Objects And Technical Details

| Area | Value |
| --- | --- |
| Custom Logic implementation | `YY1_GRDATACHANGE` |
| Custom Logic description | `GR Data Change` |
| Extension point | `MMIM_GR4XY_PROVIDE_DATA` |
| Extension point description | `Change Header and Item Data in Goods Receipts` |
| Affected business context | `MMIM_GR4XY` |
| Source field | `PURCHASEORDERITEMTEXT` |
| Target field | `DOCUMENTITEMTEXT` |
| Source filter | `SOURCEOFGR = 'PURORD'` |

## Implementation Steps

1. Open the SAP Fiori app for Custom Logic.
2. Create a new custom logic implementation named `YY1_GRDATACHANGE`.
3. Set the description to `GR Data Change`.
4. Choose extension point `MMIM_GR4XY_PROVIDE_DATA`.
5. Confirm the extension point description is `Change Header and Item Data in Goods Receipts`.
6. Confirm affected business context `MMIM_GR4XY`.
7. In the implementation, loop over `CHANGE_ITEM`.
8. Read the matching row from `GR4XY_ITEM` using the same row index.
9. Skip the row if no matching source item is found.
10. Continue only when the goods receipt source is purchase order, using `SOURCEOFGR = 'PURORD'`.
11. Continue only when `PURCHASEORDERITEMTEXT` is not initial.
12. Copy `PURCHASEORDERITEMTEXT` to `DOCUMENTITEMTEXT`.
13. Publish the custom logic.
14. Create a test purchase order with a clear item short text, for example `test enh`.
15. Post the goods receipt.
16. Confirm the Goods Receipt Item short text is copied.
17. Open the accounting entry and confirm Item Text is copied.
18. Save screenshots for the PO item, GR item, accounting entry, and custom logic code.

## Published ABAP Logic

```abap
FIELD-SYMBOLS:
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
ENDLOOP.
```

## Test Script

| Test ID | Scenario | Expected Result |
| --- | --- | --- |
| GR-001 | PO item has short text and GR is posted for PO | GR item text equals PO item short text |
| GR-002 | Accounting entry is generated after GR | Accounting item text equals PO item short text |
| GR-003 | PO item short text is blank | Logic does not overwrite target text |
| GR-004 | GR source is not purchase order | Logic does not update item text |
| GR-005 | Multiple PO items are received together | Each GR item receives the matching PO item text |
| GR-006 | Partial receipt | Text is copied for the partial GR item |
| GR-007 | Reversal or cancellation | Confirm no unexpected text update or posting issue |
| GR-008 | Manual text already exists before custom logic | Confirm overwrite behavior is acceptable to the business |

## Evidence To Capture

- Purchase order number and item.
- Purchase order item short text before posting.
- Goods Receipt Item short text after posting.
- Accounting entry Item Text after posting.
- Custom Logic header showing status as Published.
- Extension point ID and business context.
- Published code screenshot.
- Test case results and tester sign-off.

## Customer-Specific Inputs To Confirm Before Reuse

- Should the text overwrite an existing goods receipt item text, or only populate blank text?
- Should the rule apply to all plants?
- Should the rule apply to all document types?
- Should the rule apply to all suppliers?
- Should the rule apply to all PO item categories?
- Should the text be truncated or transformed if the PO text is longer than the target field?
- Is the same text needed in finance reporting, output forms, or analytics?

## Transport And Release Notes

- Build and test in the configuration/development tenant first.
- Confirm the custom logic object is published.
- Move through the customer's normal public-cloud transport process.
- Retest after import, because released extension point availability and field behavior can differ by release or tenant scope.

## Rollback Plan

1. Unpublish or deactivate the custom logic implementation.
2. Repost a controlled test goods receipt to confirm the text is no longer copied.
3. Keep the object and documentation for audit if the change has already been used in a business posting.
