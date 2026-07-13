# PO Budget Period Validation for Public Sector

## Accelerator Summary

This accelerator implements a public-sector purchase order change validation where Budget Period must not be earlier than the current fiscal year.

For CFA, the fiscal year runs July to June. For example, 5 July 2026 belongs to FY2027, so Budget Period `2026` must be blocked and Budget Period `2027` or later is allowed.

## Extensibility Classification

- Extensibility option: In-App extensibility
- SAP capability: Custom Fields and Custom Logic
- Business process: Purchase Order processing
- Primary object: Purchase Order
- Process object: Purchase Order account assignment
- Customer source type: Customer accelerator
- Implemented phase: PO change validation
- Deferred phase: PO create and purchase requisition

## Business Problem

Public-sector purchase orders can carry Fund, Grant, Functional Area, and Budget Period in addition to common account assignment values such as company code, cost center, profit center, WBS, and fiscal-year related fields.

The business requirement is to stop users changing or progressing open PO line items where the account assignment Budget Period is earlier than the current fiscal year. The check must not blindly fail an entire historical PO just because other untouched line items still carry an older Budget Period.

## Business Requirement

The validation must:

- Use save/change date logic, not document date or delivery date.
- Derive the current fiscal year using CFA's July-to-June fiscal year rule.
- Validate at PO line/account-assignment level.
- Block the full PO save if a relevant open line fails the check.
- Skip PO items that are delivery completed or finally invoiced.
- Skip deleted account assignment rows.
- Avoid checking unrelated historical PO lines that are not part of the current change.
- Distinguish the custom error from SAP standard budget consumption date messages.

## Objects And References

| Area | Value |
| --- | --- |
| Custom Logic implementation | `YY1_BD_MMPUR_FINAL_CHECK_PO` |
| BAdI | `BD_MMPUR_FINAL_CHECK_PO` |
| Completed scope | Purchase order change |
| Deferred scope | Purchase order create, purchase requisition |
| Account assignment table in BAdI | `PURCHASEORDERACCOUNTING` |
| Budget Period field | `BUDGETPERIOD` |
| PO item table | `PURCHASEORDERITEMS` |
| Item close indicators | `ISCOMPLETELYDELIVERED`, `ISFINALLYINVOICED` |
| Account assignment delete indicator | `ISDELETED` |
| Saved account assignment read | `I_PurOrdAccountAssignmentAPI01` |
| Custom message prefix | `CFA custom check:` |

## Why This BAdI Was Used

`BD_MMPUR_FINAL_CHECK_PO` was used for the completed PO change phase because it is triggered during PO save/check and can append error messages to block the PO save.

The BAdI also triggers during PO create, but testing showed that `PURCHASEORDERACCOUNTING` had zero rows during the tested create path. PO create is therefore documented as a separate follow-up and should be handled through a create/account-assignment context where Budget Period is available at the right time.

## Implementation Notes

1. Derive the current fiscal year from `cl_abap_context_info=>get_system_date( )`.
2. For CFA, add one to the calendar year when the system month is July or later.
3. Loop through `PURCHASEORDERITEMS`.
4. Skip items where `ISCOMPLETELYDELIVERED = 'X'` or `ISFINALLYINVOICED = 'X'`.
5. Compare each current item against `PURCHASEORDERITEMS_DB` to identify items changed in the current save.
6. If the item itself did not change, loop through its active account assignments and compare the current Budget Period with the saved Budget Period from `I_PurOrdAccountAssignmentAPI01`.
7. Only validate active account assignments for relevant items.
8. If the Budget Period is initial, skip the custom check.
9. If Budget Period is less than the current fiscal year, append an error message.
10. Prefix the error with `CFA custom check:` so users can distinguish this enhancement from SAP standard validations.

## Published Customer Logic

Implementation name:

- `YY1_BD_MMPUR_FINAL_CHECK_PO`

BAdI:

- `BD_MMPUR_FINAL_CHECK_PO`

Purpose:

- Block purchase order change save when a relevant open PO line/account assignment has Budget Period earlier than the current fiscal year.

```abap
DATA: ls_message LIKE LINE OF messages.
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

ENDLOOP.
```

## Message Control

Custom error example:

```text
CFA custom check: PO item 00010 Budget Period 2026 < FY 2027
```

SAP standard validations can still appear in the same message list. Example:

```text
Budget period 2026 is not valid for the consumption date 07/05/2026
```

The SAP standard message is not replaced or suppressed. It is SAP's own budget consumption date validation. The custom check is separate and only enforces CFA's rule that Budget Period must be at least the current fiscal year for relevant open PO line items.

## Validation Evidence

The working notes confirmed:

- `BUDGETPERIOD` is available under `PURCHASEORDERACCOUNTING`.
- `ISCOMPLETELYDELIVERED` and `ISFINALLYINVOICED` are available under `PURCHASEORDERITEMS`.
- `ISDELETED` is not available on the PO item structure and must not be used there.
- `PURCHASEORDERACCOUNTING` is a table and must be looped into a work area.
- `PURCHASEORDERACCOUNTING_DB` is not exposed by this BAdI.
- PO change with Budget Period `2026` during FY2027 was blocked successfully.
- PO create triggered the BAdI, but the account assignment row count was zero in the tested path.
- SAP standard budget consumption date validation can appear alongside the custom check.

## Test Script

| Test ID | Scenario | Expected Result |
| --- | --- | --- |
| BP-001 | Change existing open PO line with Budget Period `2026` during FY2027 | Save blocked with `CFA custom check:` error |
| BP-002 | Change existing open PO line with Budget Period equal to current FY | Save allowed by custom logic |
| BP-003 | Change existing open PO line with Budget Period greater than current FY | Save allowed by custom logic |
| BP-004 | Delivery completed PO item with old Budget Period | Item skipped |
| BP-005 | Finally invoiced PO item with old Budget Period | Item skipped |
| BP-006 | Deleted account assignment row | Row skipped |
| BP-007 | Unchanged historical line with old Budget Period | Line skipped unless item/account assignment is relevant to the save |
| BP-008 | Multi-account assignment item where one active split has old Budget Period | Save blocked for the relevant item |
| BP-009 | PO create hard test message | BAdI trigger confirmed |
| BP-010 | PO create Budget Period validation in this BAdI | Deferred because `PURCHASEORDERACCOUNTING` was empty in tested create path |
| BP-011 | Direct table component access | Fails because `PURCHASEORDERACCOUNTING` is a table without a header line |
| BP-012 | Item-level delete check | Fails because `ISDELETED` is not exposed on PO item structure |
| BP-013 | `PURCHASEORDERACCOUNTING_DB` comparison | Fails because DB account assignment table is not exposed in this BAdI |

## Rollback Plan

1. Remove or comment the custom Budget Period validation code.
2. Save and publish the Custom Logic implementation.
3. Confirm PO change processing returns to SAP standard validation only.
4. Keep the evidence pack and test cases for reactivation or redesign.

## Open Items

- Identify the correct create-PO extensibility point where Budget Period is populated during create.
- Repeat the pattern for purchase requisition after PO create is resolved.
- Confirm whether the final message text should be hardcoded or moved into a translatable code list/message approach.
