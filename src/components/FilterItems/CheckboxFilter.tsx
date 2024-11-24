import { type ComponentType, useState } from 'react';

import { ShortcutContainer } from './ShortcutContainer';

import { FilterComponentProps, ShortcutComponentProps } from '@swypex/refilter';

export type CheckboxItems = Array<{ id: string; name: string }>;

export interface ExtraCheckboxFilterProps {
  useSearchQuery: (query: string) => {
    loading: boolean;
    items?: CheckboxItems;
    LoadMoreRows: ComponentType;
  };
}

export function haveSameValues<T>(arr1: T[] = [], arr2: T[] = []): boolean {
  const arr1Set = new Set(arr1);
  const arr2Set = new Set(arr2);

  return (
    arr1Set.size === arr2Set.size && arr1.every((item) => arr2Set.has(item))
  );
}

export function filterItemsByQuery<T>(
  query: string,
  options: T[],
  getDisplayValue: (item: T) => string
): T[] {
  const sanitizedQuery = query.toLowerCase().replace(/\s+/g, '');
  return sanitizedQuery === ''
    ? options
    : options.filter((option) => {
        const sanitizedOption = getDisplayValue(option).toLowerCase();
        const sanitizedOptionWords = sanitizedOption.split(/\s+/);

        const containsWord = sanitizedOptionWords.some((word) =>
          word.startsWith(sanitizedQuery)
        );

        return containsWord || sanitizedOption.startsWith(sanitizedQuery);
      });
}

const defaultItems = [
	{ id: '1', name: 'Apple' },
	{ id: '2', name: 'Banana' },
	{ id: '3', name: 'Cherry' },
	{ id: '4', name: 'Date' },

]

export function CheckboxFilter(
  props: FilterComponentProps<CheckboxItems>
) {
  const { value , onChange } = props;
  const [query, setQuery] = useState('');

  const items = filterItemsByQuery(query, defaultItems, (item) => item.name);
	console.log('items:', items)

  const handleChange = (item: { id: string; name: string }): void => {
    const itemExists = value.findIndex(({ id }) => item.id === id) >= 0;
    if (itemExists) {
      void onChange(value.filter(({ id }) => item.id !== id));
    } else {
      void onChange([...value, item]);
    }
  };

  const isDisabledResetButton = !(value.length > 0 || query.length > 0);

  return (
    <div className="flex h-full flex-col">
      <div className="relative m-2 flex h-9 items-center justify-around ">
        <input
          value={query}
          maxLength={200}
          className="h-10 w-full rounded-lg  border-0 p-2 px-9 text-sm leading-6 outline-none ring-1
          ring-inset ring-gray-300 placeholder:text-base
          placeholder:text-gray-800
          focus:text-gray-900 focus:ring-1 focus:ring-inset focus:ring-blue-200
          focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-100"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <div className="mx-2 flex-shrink-0">
          <button
            type="button"
            onClick={async () => {
              await onChange([]);
              setQuery('');
            }}
            disabled={isDisabledResetButton}
            className={`text-sm font-semibold ${isDisabledResetButton ? 'text-gray-600' : 'text-blue-400'}`}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="mx-3 font-normal text-gray-900">
          {items?.map((item) => (
						<div key={item.id}>
						<label className="flex items-center gap-2">
						{item.name}
						</label>
            <input
              id={item.id}
              type="checkbox"
              onChange={() => {
                handleChange(item);
              }}
              checked={value.findIndex(({ id }) => item.id === id) >= 0}
            />
			</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckboxFilterShortcut(
  props: ShortcutComponentProps<CheckboxItems>
) {
  const { value = [], onChange } = props;
  if (value.length === 0) return null;

  const handleChange = (item: { id: string; name: string }): void => {
    const itemExists = value.findIndex(({ id }) => item.id === id) >= 0;
    if (itemExists) {
      onChange(value.filter(({ id }) => item.id !== id));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <>
      {value.map((item) => (
        <ShortcutContainer
          label={item.name}
          onClick={() => {
            handleChange(item);
          }}
          key={item.id}
        />
      ))}
    </>
  );
}

CheckboxFilter.Shortcut = CheckboxFilterShortcut;

CheckboxFilter.comparator = (
  a: Array<{
    id: string;
    name: string;
  }>,
  b: Array<{
    id: string;
    name: string;
  }>
) => {
  return haveSameValues(
    a?.map((i) => i.id),
    b?.map((i) => i.id)
  );
};

CheckboxFilter.getBadgeCount = (value: CheckboxItems) => {
  return value.length;
};

