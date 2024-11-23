import { createStyledGenericFilter, GenericFilterProps } from "@swypex/refilter";
import { DateRangeFilter, DateRangeFilterValue } from "./components/FilterItems/DateRangeFilter";
import { useState } from "react";

export interface FilterValues {
  date: DateRangeFilterValue;
  // merchants: SearchItems;
  // people: SearchItems;
  // departments: SearchItems;
  // method: CheckboxOptions[];
  // categories: SearchItems;
  // amount: AmountFilterValue;
  // recordedBy: SearchItems;
  // rejectedBy: SearchItems;
  // tags: SearchItems;
}

const GenericFilter = createStyledGenericFilter({});

  const filterItems: GenericFilterProps<FilterValues>['filterers'] = {
        date: {
          title: 'Date',
          FilterComponent: DateRangeFilter,
          defaultValue: null,
        },
        // merchants: {
        //   title: 'Text',
        //   FilterComponent: MerchantSearchFilter,
        //   defaultValue: [],
        // },
        // method: {
        //   title: 'Checkbox',
        //   defaultValue: transactionMethods,
        //   FilterComponent: CheckboxFilter,
        // },
        // amount: {
        //   title: 'Amount',
        //   defaultValue: null,
        //   FilterComponent: AmountFilter,
        // },
      }

export function Filter() {

  const defaultFilterValue = {
      date: filterItems.date.defaultValue,
    }
  const [filterValue, setFilterValue] = useState(defaultFilterValue);

  return (
	<GenericFilter
	  filterers={filterItems}
		value={filterValue}
		onChange={setFilterValue}
		onApply={() => {return true}}
	/>
  );
}
