import {
  ChangeEvent,
  ComponentPropsWithRef, forwardRef, ReactNode, useId,
} from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import styles from './SegmentedControl.module.scss';
import { SegmentedControlItem } from './parts';

type SegmentedControlValue = string | number | undefined;

export interface SegmentedControlProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange' | 'children'> {
  items: {
    label: ReactNode;
    value: HTMLInputElement['value'];
  }[];
  name?: string;
  onChange?: (value: SegmentedControlValue) => void;
  value?: SegmentedControlValue;
  withHaptic?: boolean;
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(({
  className, name, items, value, onChange, withHaptic = true, ...rest
}, ref) => {
  const id = useId();
  const SDK = useSDK();

  const rootClassName = clsx(className, styles.SegmentedControl);

  const changeHandler = ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement>) => {
    onChange?.(newValue);

    if (
      SDK.didInit
      && SDK.components
      && SDK.components.haptic.supports('selectionChanged')
      && withHaptic) {
      SDK.components.haptic.selectionChanged();
    }
  };

  return (
    <div className={rootClassName} ref={ref} {...rest}>
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
            onChange={changeHandler}
            checked={itemValue === value}
            value={itemValue}
          >
            {label}
          </SegmentedControlItem>
        ))}
      </div>
    </div>
  );
});
