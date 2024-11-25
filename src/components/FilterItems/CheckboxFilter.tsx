import { type ComponentType, useState } from 'react';

import { ShortcutContainer } from './ShortcutContainer';

import { FilterComponentProps, ShortcutComponentProps } from '@swypex/refilter';

import data from '../../fakeData.json';

export type CheckboxItems = string[];

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

export function CheckboxFilter(props: FilterComponentProps<CheckboxItems>) {
  const { value, onChange } = props;
  const [query, setQuery] = useState('');

  const categories = [...new Set(data.map((item) => item.category))];

  const items = filterItemsByQuery(query, categories, (item) => item);

  const handleChange = (item: string): void => {
    const itemExists = value.indexOf(item) !== -1;
    if (itemExists) {
      void onChange(value.filter((it) => it !== item));
    } else {
      void onChange([...value, item]);
    }
  };

  const isDisabledResetButton = !(value.length > 0 || query.length > 0);

  return (
    <div className="flex h-full flex-col">
      <div className="relative m-2 flex h-9 items-center justify-around ">
        <input
          placeholder="Search"
          value={query}
          maxLength={200}
          className="w-full border-2 rounded-lg p-2"
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
            <div className="flex mb-2 items-center gap-3" key={item}>
              <input
                className="w-4 h-4"
                id={item}
                type="checkbox"
                onChange={() => {
                  handleChange(item);
                }}
                checked={value.indexOf(item) !== -1}
              />

              <label htmlFor={item} className="flex items-center gap-2">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckboxFilterShortcut(props: ShortcutComponentProps<CheckboxItems>) {
  const { value = [], onChange } = props;
  if (value.length === 0) return null;

  const handleChange = (item: string): void => {
    const itemExists = value.indexOf(item) !== -1;
    if (itemExists) {
      onChange(value.filter((it) => item !== it));
    } else {
      onChange([...value, item]);
    }
  };

  return (
    <>
      {value.map((item) => (
        <ShortcutContainer
          label={item}
          onClick={() => {
            handleChange(item);
          }}
          key={item}
        />
      ))}
    </>
  );
}

CheckboxFilter.Shortcut = CheckboxFilterShortcut;

CheckboxFilter.comparator = (a: string[], b: string[]) => {
  return haveSameValues(a, b);
};

CheckboxFilter.getBadgeCount = (value: CheckboxItems) => {
  return value.length;
};
