import {
  ComponentPropsWithoutRef, ReactNode, useId,
} from 'react';

import { clsx } from 'clsx';
import styles from './SegmentedControl.module.scss';
import { SegmentedControlItem } from './parts';

type SegmentedControlValue = string | number | undefined;

export interface SegmentedControlProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'children'> {
  items: {
    label: ReactNode;
    value: HTMLInputElement['value'];
  }[];
  name?: string;
  onChange?: (value: SegmentedControlValue) => void;
  value?: SegmentedControlValue;
}

export function SegmentedControl({
  className, name, items, value, onChange, ...rest
}: SegmentedControlProps) {
  const id = useId();

  const rootClassName = clsx(className, styles.SegmentedControl);

  return (
    <div className={rootClassName} {...rest}>
      <div className={styles.SegmentedControl__in} role="radiogroup">
        <span
          aria-hidden
          className={styles.SegmentedControl__indicator}
          style={{
            width: `calc(100% / ${items.length})`,
            transform: `translateX(calc(100% * ${Math.max(0, items.findIndex(({ value: curValue }) => curValue === value))}))`,
          }}
        />

        {items.map(({ label, value: itemValue }) => (
          <SegmentedControlItem
            key={itemValue}
            name={name ?? id}
            onChange={({ target }) => onChange?.(target.value)}
            checked={itemValue === value}
            value={itemValue}
          >
            {label}
          </SegmentedControlItem>
        ))}
      </div>
    </div>
  );
}
