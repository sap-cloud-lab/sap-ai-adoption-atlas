# PR Budget Period Validation for Public Sector

## Accelerator Summary

This accelerator implements a public-sector Purchase Requisition validation where Budget Period must not be earlier than the current fiscal year.

For CFA, the fiscal year runs July to June. For example, 5 July 2026 belongs to FY2027, so Budget Period `2026` must be blocked and Budget Period `2027` or later is allowed.

## Extensibility Classification

- Extensibility option: In-App extensibility
- SAP capability: Custom Logic
- Business process: Purchase Requisition processing
- Primary object: Purchase Requisition
- Process object: Purchase Requisition account assignment
- Customer source type: Customer accelerator
- Implemented scope: PR create and PR change

## Business Requirement

When a CFA purchase requisition is created or changed, the PR account assignment Budget Period must be greater than or equal to the current CFA fiscal year.

The validation must:

- Use the current system date/check date, not delivery date.
- Derive current fiscal year using CFA's July-to-June rule.
- Validate Budget Period on PR account assignment rows.
- Raise a hard error when Budget Period is earlier than current fiscal year.
- Keep the custom message short enough for SAP's message display.
- Allow SAP standard budget consumption date checks to appear separately.

## Objects And References

| Area | Value |
| --- | --- |
| BAdI | `MM_PUR_S4_PR_CHECK` |
| Account assignment table | `PURCHASEREQACCASSGNMT_TABLE` |
| Budget Period field | `BUDGETPERIOD` |
| Delete indicator | `ISDELETED` |
| Custom message example | `CFA PR item 00010: BP 2026 < FY 2027` |
| Confirmed paths | PR create and PR change |

## Why This BAdI Was Used

`MM_PUR_S4_PR_CHECK` was selected because the tenant parameter list exposes the PR account assignment table `PURCHASEREQACCASSGNMT_TABLE`, including `BUDGETPERIOD`, `GRANTID`, `FUNCTIONALAREA`, WBS, cost center, profit center, and fund-related fields.

Testing confirmed the BAdI triggers for both PR create and PR change.

## Implementation Notes

1. Calculate current fiscal year from `cl_abap_context_info=>get_system_date( )`.
2. For CFA, increment the calendar year when the month is July or later.
3. Loop through `PURCHASEREQACCASSGNMT_TABLE`.
4. Skip deleted rows and blank Budget Period values.
5. Move `BUDGETPERIOD` into a string and condense it before numeric validation.
6. Validate that the condensed Budget Period contains only digits.
7. Raise a hard error when Budget Period is less than the current fiscal year.

## Published Customer Logic

```abap
************************************************************************
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

ENDLOOP.
```

## Test Evidence

| Test ID | Scenario | Result |
| --- | --- | --- |
| PR-BP-001 | Confirm `PURCHASEREQACCASSGNMT_TABLE` available | Passed |
| PR-BP-002 | Confirm `BUDGETPERIOD` available | Passed |
| PR-BP-003 | PR create with Budget Period `2026` during FY2027 | Passed - hard error triggered |
| PR-BP-004 | PR change with Budget Period `2026` during FY2027 | Passed - hard error triggered |
| PR-BP-005 | Short message format | Passed - readable in SAP message list |

## Message Handling

The first PR create test used a longer message and SAP cut off the text in the message popup. The final message was shortened to:

```text
CFA PR item 00010: BP 2026 < FY 2027
```

An intermediate version incorrectly showed `BP invalid` because Budget Period was treated as fixed-length character text with trailing blanks. The final code moves the value into a string and uses `CONDENSE ... NO-GAPS` before numeric validation.

SAP standard budget consumption validation can still appear separately, for example:

```text
Budget period 2026 is not valid for the consumption date 07/05/2026
```

## Rollback Plan

1. Open the Custom Logic implementation for `MM_PUR_S4_PR_CHECK`.
2. Remove, unpublish, or deactivate the custom Budget Period validation.
3. Retest PR create and change to confirm SAP standard behavior only.
4. Retain screenshots and this note as the implementation record.

## Open Follow-Up

Retain positive regression evidence for Budget Period `2027` and `2028`, even though the negative create/change tests already prove the blocking rule works.
