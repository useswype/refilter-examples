import { createStyledGenericFilter, GenericFilterProps } from "@swypex/refilter";
import { DateRangeFilter, DateRangeFilterValue } from "../FilterItems/DateRangeFilter";
import { useState } from "react";
import { CheckboxFilter, CheckboxItems } from "../FilterItems/CheckboxFilter";
import { AmountFilter, AmountFilterValue } from "../FilterItems/AmountRangeFilter";

export interface FilterValues {
  date: DateRangeFilterValue;
  text: CheckboxItems;
  amount: AmountFilterValue;
}

const GenericFilter = createStyledGenericFilter({});

  const filterItems: GenericFilterProps<FilterValues>['filterers'] = {
        date: {
          title: 'Date',
          FilterComponent: DateRangeFilter,
          defaultValue: null,
        },
        text: {
          title: 'Text',
          FilterComponent: CheckboxFilter,
          defaultValue: [],
        },
        amount: {
          title: 'Amount',
          defaultValue: null,
          FilterComponent: AmountFilter,
        },
      }

export function Filter() {

  const defaultFilterValue = {
      date: filterItems.date.defaultValue,
      text: filterItems.text.defaultValue,
      amount: filterItems.amount.defaultValue,
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
