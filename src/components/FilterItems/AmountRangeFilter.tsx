import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { ShortcutContainer } from './ShortcutContainer';
import { FilterComponentProps, ShortcutComponentProps } from '@swypex/refilter';

const SLIDER_STEPS = 10;

export type AmountFilterValue = {
  min: number;
  max: number;
} | null;

export function AmountFilter(props: FilterComponentProps<AmountFilterValue>) {
  const { onChange, value } = props;
  const rangeMin = 0;
  const rangeMax = 1000;

  const min = value?.min ?? rangeMin;
  const max = value?.max ?? rangeMax;

  const handleCurrencyInput = (newValue: string, type: 'min' | 'max'): void => {
    const numValue =
      newValue === '' ? null : Number(newValue.replace(/,/g, ''));

    void onChange({
      ...value,
      min,
      max,
      [type]: numValue,
    });
  };

  return (
    <div className="h-full flex-col p-4">
      <div className="flex justify-between pt-2">
        <p className="text-sm font-semibold text-gray-800">Amount Range</p>
        <button
          className={'mt-1 text-xs font-semibold text-blue-400'}
          onClick={() => {
            void onChange(null);
          }}
        >
          Reset
        </button>
      </div>

      <div className="py-4">
        <Slider
          range
          step={SLIDER_STEPS}
          allowCross={false}
          value={[min, max]}
          min={rangeMin}
          max={rangeMax}
          styles={{
            handle: {
              background: 'white',
              boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
              zIndex: 10,
              borderColor: 'white',
              width: 16,
              opacity: 1,
              height: 16,
            },
            rail: {
              background: '#F1F1F1',
              height: 8,
            },
            track: {
              backgroundColor: '#0021CC',
              height: 8,
            },
          }}
          onChange={(newValue) => {
            void onChange({
              ...value,
              min: (newValue as number[])[0],
              max: (newValue as number[])[1],
            });
          }}
          autoFocus
        />
        <div dir="ltr" className="flex items-center justify-between">
          <span className="flex flex-col gap-1 text-xs font-semibold text-gray-600">
            <div className="h-3 w-px bg-gray-300" />
            {rangeMin}
          </span>
          <span className="flex flex-col items-end justify-center gap-1 text-xs font-semibold text-gray-600">
            <div className="h-3 w-px bg-gray-300" />
            {rangeMax}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <label>Min</label>
        <input
          type="number"
          value={min}
          onInput={(e) => {
            handleCurrencyInput(e.currentTarget.value, 'min');
          }}
        />
        <div className="mt-6 hidden h-2 w-px rotate-90 bg-gray-500 sm:block" />
        <label>Max</label>
        <input
          type="number"
          value={max}
          onInput={(e) => {
            handleCurrencyInput(e.currentTarget.value, 'max');
          }}
        />
      </div>
      <div className="-mx-4 my-5 h-px bg-gray-300 " />
    </div>
  );
}

export function AmountFilterShortcut(
  props: ShortcutComponentProps<AmountFilterValue>
) {
  const { value, onChange } = props;

  if (value === null) {
    return null;
  }

  return (
	<ShortcutContainer
	  label={`EGP ${value.min} - EGP ${value.max}`}
	  onClick={() => {
		onChange(null);
	  }}
	/>
  );
}

AmountFilter.Shortcut = AmountFilterShortcut;

AmountFilter.comparator = (a: AmountFilterValue, b: AmountFilterValue) => {
  return a?.min === b?.min && a?.max === b?.max;
};

AmountFilter.getBadgeCount = (value: AmountFilterValue) => {
  if (value === null) {
    return 0;
  }

  if (value.min && value.max) {
    return 1;
  }

  return 0;
};
