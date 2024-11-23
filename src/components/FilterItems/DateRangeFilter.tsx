import {
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';

import { ShortcutContainer } from './ShortcutContainer';
import { FilterComponentProps, ShortcutComponentProps } from '@swypex/refilter';

export type DateRangeFilterValue = {
  label?: string;
  from?: Date;
  to?: Date;
} | null;

export function DateRangeFilter(
  props: FilterComponentProps<DateRangeFilterValue> & {
    hasFutureDate?: boolean;
  }
) {
  const { value, onChange } = props;

  return (
    <>
      <div className="flex justify-end">
        <button
          className={`me-2.5 text-xs font-semibold ${value === null ? 'text-gray-600' : 'text-blue-400'}`}
          disabled={value === null}
          onClick={() => {
            void onChange(null);
          }}
        >
					Reset
        </button>
      </div>
      <div className="flex flex-col gap-4 px-2 py-3">
        <input
		  type="date"
          onChange={async (e) => {
			const from = new Date(e.target.value);
            if (!from) {
              return;
            }
            let to = value?.to;

            if (to && from.getTime() > to.getTime()) {
              to = undefined;
            }

            void onChange({
              ...value,
              from: startOfDay(from),
              to,
            });
          }}

          value={ value?.from !== undefined ? format(value?.from, 'yyyy-MM-dd') : undefined}
          className="w-full"
        />
        <input
		  type="date"
          onChange={async (e) => {
			const to = new Date(e.target.value);
            if (!to) {
              return;
            }

            void onChange({
              ...value,
              to: endOfDay(to),
            });
          }}
          value={ value?.to !== undefined ? format(value?.to, 'yyyy-MM-dd') : undefined}
          className="w-full"
        />
      </div>
    </>
  );
}

function DateRangeFilterShortcut(
  props: ShortcutComponentProps<DateRangeFilterValue>
) {
  const { value, onChange, defaultValue } = props;

  if (!value) {
    return null;
  }

  return (
    <ShortcutContainer
      label="Date Label"
      onClick={() => {
        onChange(defaultValue);
      }}
    />
  );
}

DateRangeFilter.Shortcut = DateRangeFilterShortcut;

DateRangeFilter.comparator = (
  a: DateRangeFilterValue,
  b: DateRangeFilterValue
) => {
  return (
    a?.from?.getTime() === b?.from?.getTime() &&
    a?.to?.getTime() === b?.to?.getTime()
  );
};

DateRangeFilter.getBadgeCount = (value: DateRangeFilterValue) => {
  if (value === null) {
    return 0;
  }

  if (value.from !== undefined || value.to !== undefined) {
    return 1;
  }

  return 0;
};
