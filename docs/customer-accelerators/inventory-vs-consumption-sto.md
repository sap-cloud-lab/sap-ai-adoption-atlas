# Inventory vs Consumption Indicator for STO

## Accelerator Summary

This accelerator introduces a plant-level material master custom field called `Consumption Indicator`. The indicator is used in Stock Transport Order processing to decide whether cost object entry, such as Cost Centre or WBS Element, should be allowed or blocked.

## Extensibility Classification

- Extensibility option: In-App extensibility
- SAP capability: Custom Fields and Custom Logic
- Business process: Stock Transport Order procurement
- Primary object: Material master at plant level
- Process object: Purchase Order / Stock Transport Order account assignment
- Customer source type: Customer accelerator
- Working source: `inv vs consumption.pdf`

## Business Problem

The customer had already implemented the system. A cleaner original design would have been to use material group or another standard classification to identify consumption materials. Because the system was already live, redesigning the master-data model was not practical.

The chosen workaround was to add a custom field to the material master and maintain it at plant level. The custom logic then uses this indicator during STO processing.

## Business Requirement

Define whether a material is inventory or consumable at the district/plant level. The source notes state that this logic does not apply to SLC.

Based on the identification, allow the business user to enter the relevant cost object on the STO where the material is marked as consumable:

- Cost Centre
- WBS Element

Where the material is marked as inventory, prevent the business user from creating an STO with consumption-style account assignment:

- Account assignment `K` - Cost Centre
- Account assignment `P` - Project / WBS

The working notes state:

- The code is set up for district plants except plant `2000`.
- The custom code can trigger only after users enter all required screen parameters, including account assignment fields.
- Plant `2000` is excluded because it represents the State Logistics Center / SLC scenario in the source example.

## Objects And References

| Area | Value |
| --- | --- |
| Custom field | `Consumption Indicator` |
| Custom field location | Material master, plant level |
| Custom field type | Checkbox |
| Custom field identifier | `YY1_ConsumptionIndicat` |
| Generated CDS/API field | `YY1_CONSUMPTIONINDICAT_PLT` |
| Business context | `PRODUCT_PLANT` - Master Data: Product Plant |
| Field values | Yes/No |
| API service enabled | `API_PRODUCT_SRV` |
| API entity enabled | `A_ProductPlantType` |
| CDS view enabled | `I_PRODUCTPLANT` |
| Additional OData service checked | `MD_C_PRODUCT_MAINTAIN_SRV` |
| Additional entity enabled | `C_ProductplantType` |
| Chosen BAdI | `MM_PUR_S4_PO_MODIFY_ACCOUNT` |
| BAdI description | Modify Purchase Order Account Assignment Data |
| Reviewed BAdI | `MM_PUR_S4_PO_MODIFY_ITEM` |
| Reviewed BAdI | `MM_PUR_S4_PO_CHECK_ALL_ITEMS` |
| API/CDS dependency | Custom field must be enabled for `I_PRODUCTPLANT` so the BAdI can read the product/plant indicator |
| Transport reference | `N2OK901863 - Inventory vs Consumption` |
| Build note | `SC - Custom Logic - MM - Version 4` |
| Configuration reference | `101655 - Allow for Cost Centre, WBS combination with Item Category U - Stock Transport Order` |
| Configuration reference | `102909 - Purchase Order Types` |
| PO document types in code | `UB`, `UD`, `ZUD` |
| Excluded plant in code | `2000` |
| Error message | `K/P Acc Asgmt not allowed for Inv. Mat at District` |

## Why This BAdI Was Chosen

Chosen:

- `MM_PUR_S4_PO_MODIFY_ACCOUNT`

Reason:

- It was the only reviewed BAdI that allowed the implementation to read material data and control account-assignment validation for this requirement.
- It gives access to the account assignment change context and message table needed to stop invalid STO entry.

Rejected or limited:

- `MM_PUR_S4_PO_MODIFY_ITEM`
  - It provides access to Account Assignment Indicator.
  - It does not allow error messages.
  - It only supports replacing or substituting values.
  - In this scenario, the released API/CDS access required for `I_PRODUCTPLANT` was not available in the way needed.
- `MM_PUR_S4_PO_CHECK_ALL_ITEMS`
  - It did not expose the fields required to perform the check.

## Implementation Steps

1. Confirm the exact business definition of inventory material vs consumable material.
2. Confirm whether the rule applies by plant, district, company code, material type, material group, or purchasing document type.
3. Create the material master custom field `Consumption Indicator`.
4. Use field type `Checkbox`.
5. Enable the custom field for the Product Plant business context.
6. Enable the custom field for the required APIs and CDS views so custom logic can read it:
   - `API_PRODUCT_SRV`
   - `A_ProductPlantType`
   - `I_PRODUCTPLANT`
   - `MD_C_PRODUCT_MAINTAIN_SRV` / `C_ProductplantType` where needed for maintenance and export.
7. Publish the custom field.
8. Maintain the indicator as Yes/No at material plant level for the relevant district plants.
9. Use Mass Maintenance Product to maintain or export the indicator at scale:
   - Export field `Consumption Indicator (MARC-YY1_CONSUMPTIONINDICAT_PLT)`.
   - Filter plants greater than `2000` for the district plant population if the same design applies.
   - Use the mass maintenance activation result as evidence.
10. Exclude SLC if it is outside scope.
11. Exclude plant `2000` if the same exclusion applies for the target customer.
12. Confirm configuration `101655` for Cost Centre/WBS combination with item category `U` for Stock Transport Orders.
13. Confirm allowed combinations include:
   - Item category `U` with account assignment `K` - Cost Centre
   - Item category `U` with account assignment `P` - Project
14. Confirm purchase order type configuration, including reference `102909` from the working notes.
15. Confirm STO document types in scope, especially `UB`, `UD`, and customer type `ZUD`.
16. Create custom logic using BAdI `MM_PUR_S4_PO_MODIFY_ACCOUNT`.
17. Read the material, plant, PO type, PO item, and account assignment category from the BAdI context.
18. Read `YY1_CONSUMPTIONINDICAT_PLT` from `I_PRODUCTPLANT`.
19. If the PO type is in scope, the plant is not `2000`, and account assignment is `K` or `P`, check whether the material is marked as consumption.
20. If the consumption indicator is blank/initial, raise error message `K/P Acc Asgmt not allowed for Inv. Mat at District`.
21. Publish the custom logic.
22. Test the rule with inventory materials, consumable materials, excluded plants, and missing indicator values.
23. Move the change through the customer's normal public-cloud transport process.

## Published Customer Logic

Implementation name:

- `YY1_MM_PUR_S4_PO_MODIFY_ACC`

BAdI:

- `MM_PUR_S4_PO_MODIFY_ACCOUNT`

Purpose:

- Check whether the material is marked as consumption or inventory.
- Stop account assignments `K` or `P` for materials treated as inventory at district plants.

```abap
* This enhancement is to check if the Material is Consumption or Inventory
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

ENDIF.
```

## Automation Notes For Reuse

When repeating this for another public cloud customer, parameterise these values instead of hardcoding them in the automation:

| Parameter | Source Example | Customer-Specific Decision |
| --- | --- | --- |
| PO types in scope | `UB`, `UD`, `ZUD` | Replace with customer STO document types |
| Excluded plant | `2000` | Replace with customer SLC/main logistics plant if required |
| Account assignments blocked for inventory | `K`, `P` | Confirm whether Cost Centre and WBS are both in scope |
| Custom field technical name | `YY1_CONSUMPTIONINDICAT_PLT` | Use generated field name from target tenant |
| Product plant CDS view | `I_PRODUCTPLANT` | Confirm field is enabled and released in target tenant |
| Error message | `K/P Acc Asgmt not allowed for Inv. Mat at District` | Agree final business-facing wording |

## Validation Evidence From Source PDF

The uploaded PDF includes screenshots showing:

- Custom Logic software collection `SC - Custom Logic - MM`, version `4`.
- Custom field `Consumption Indicator` and BAdI implementation `MM_PUR_S4_PO_MODIFY_ACCOUNT` in the software collection.
- Configuration `101655` for allowed item category/account assignment combinations.
- Item category `U` allowed with account assignment `K` and `P`.
- Purchase order types including `UB`, `UD`, and `ZUD`.
- Custom field enabled for `API_PRODUCT_SRV`, `A_ProductPlantType`, and `I_PRODUCTPLANT`.
- Product plant value maintained with `Consumption Indicator = No`.
- STO test where material `HELMCS` on plant `2105` uses item category `U` and account assignment `K`.
- Error result: `K/P Acc Asgmt not allowed for Inv. Mat at District`.
- Mass maintenance export/update for field `Consumption Indicator (MARC-YY1_CONSUMPTIONINDICAT_PLT)`.
- Mass maintenance activation with zero errors and zero warnings.

## Required Inputs Before Automation

To automate this for another customer, capture these values first:

| Input | Required Decision |
| --- | --- |
| Material classification source | Custom field, material group, material type, or other standard field |
| Custom field technical name | Final YY1/YY2 field name after creation |
| Field values | Yes/No, Inventory/Consumption, or coded values |
| Plants in scope | Include and exclude list |
| District/SLC rule | Whether SLC exclusion applies |
| Plant 2000 rule | Whether plant 2000 exclusion applies |
| Purchase document types | Which PO/STO document types are in scope |
| Item category | Whether item category `U` is required |
| Cost object rule | Cost Centre, WBS Element, either, both, or conditional |
| Error vs substitution | Whether to block, default, clear, or only warn |
| Message text | Final business-facing validation message |
| API/CDS availability | Confirm material/plant custom field can be read in the chosen BAdI |
| Transport path | Customer-specific transport and approval flow |

## Test Script

| Test ID | Scenario | Expected Result |
| --- | --- | --- |
| STO-001 | Consumable material with Cost Centre | STO item/account assignment accepted |
| STO-002 | Consumable material with WBS Element | STO item/account assignment accepted |
| STO-003 | Consumable material with no cost object | System blocks or warns according to final rule |
| STO-004 | Inventory material with Cost Centre | System blocks with message `K/P Acc Asgmt not allowed for Inv. Mat at District` |
| STO-005 | Inventory material with WBS Element | System blocks with message `K/P Acc Asgmt not allowed for Inv. Mat at District` |
| STO-006 | Material has blank Consumption Indicator | System follows agreed fallback behavior |
| STO-007 | Plant is excluded, such as `2000` | Logic does not apply |
| STO-008 | SLC scenario | Logic does not apply if SLC remains excluded |
| STO-009 | Item category is not `U` | Logic does not apply unless included by design |
| STO-010 | Mass maintenance updates indicator | STO logic reads the latest indicator |
| STO-011 | User lacks role for custom field maintenance | User cannot maintain indicator |
| STO-012 | Quarterly release regression | BAdI fields and API/CDS access still work |

## Evidence To Capture

- Material master before and after adding `Consumption Indicator`.
- Field enabled for relevant CDS/API usage.
- Material plant values for consumable and inventory examples.
- Configuration evidence for item category `U` and Cost Centre/WBS combinations.
- Purchase order type configuration for all in-scope STO types.
- Custom Logic object header.
- BAdI ID and description.
- Published code.
- Test STO examples for inventory and consumable materials.
- Screenshots of successful and blocked scenarios.
- Mass maintenance export and activation result.

## Rollback Plan

1. Unpublish or deactivate the custom logic implementation.
2. Keep the custom field but stop using it in process logic if transactional postings already reference it.
3. Remove the field from exposed UIs only after confirming no active reports, APIs, or integrations depend on it.
4. Restore the business process to the standard STO account assignment behavior.

## Open Items

- Confirm whether the target customer should use the same document types, plant exclusion, and message text.
- Confirm that `I_PRODUCTPLANT` and the generated custom field are released in the target customer tenant.
- Convert the hardcoded values into customer-specific constants or documented configuration before reusing the accelerator.
