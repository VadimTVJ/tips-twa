import {
  ComponentPropsWithoutRef, ReactNode, useId, // todo чек про ComponentPropsWithRef
} from 'react';

import { clsx } from 'clsx';
import styles from './SegmentedControl.module.scss';
import { Typography } from '../Typography';

type SegmentedControlItemValue = string;

interface SegmentedControlItem {
  label: ReactNode;
  value: SegmentedControlItemValue;
}

// todo декомпозировать items, вынести в отдельные компоненты
interface SegmentedControlProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  items: SegmentedControlItem[];
  name: string;
  onChange?: (value: SegmentedControlItemValue) => void;
  value: SegmentedControlItemValue;
}

export function SegmentedControl({
  className, name, items, onChange, value,
}: SegmentedControlProps) {
  const inputId = useId();

  const rootClassName = clsx(className, styles.SegmentedControl);

  return (
    <div className={rootClassName}>
      <div className={styles.SegmentedControl__in} role="radiogroup">
        <span
          aria-hidden
          className={styles.SegmentedControl__indicator}
          style={{
            width: `calc(100% / ${items.length})`,
            transform: `translateX(calc(100% * ${Math.max(0, items.findIndex(({ value: curValue }) => curValue === value))}))`,
          }}
        />

        {items.map(({ value: itemValue, label }) => (
          <label
            htmlFor={inputId}
            key={itemValue}
            className={styles.SegmentedControl__option}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={itemValue}
              checked={itemValue === value}
              onChange={({ target }) => onChange?.(target.value)}
            />

            <Typography
              variant="subtitle2"
              weight={500}
            >
              {label}
            </Typography>
          </label>
        ))}
      </div>
    </div>
  );
}
