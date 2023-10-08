import {
  ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId,
} from 'react';

import { clsx } from 'clsx';
import { useSDK } from '@tma.js/sdk-react';
import styles from './Radio.module.scss';
import { Typography } from '../Typography';

const RadioIcon = (props: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.75" y="0.75" width="20.5" height="20.5" rx="10.25" stroke="currentcolor" strokeWidth="1.5" />

      <g className={styles.Radio__iconCheck}>
        <rect x="0.75" y="0.75" width="20.5" height="20.5" rx="10.25" stroke="#C8C7CB" strokeWidth="1.5" />
        <rect width="22" height="22" rx="11" fill="#007AFF" />
        <path d="M6.75 12L9.75 15.5L15.25 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  withHaptic?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className, children, onChange, withHaptic = true, id, ...rest
}, ref) => {
  const inputId = useId();
  const SDK = useSDK();

  const rootClassName = clsx(className, styles.Radio, {
    [styles.Radio_disabled]: rest.disabled,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);

    if (
      SDK.didInit
      && SDK.components
      && SDK.components.haptic.supports('selectionChanged')
      && withHaptic) {
      SDK.components.haptic.selectionChanged();
    }
  };

  return (
    <label
      className={rootClassName}
      htmlFor={id || inputId}
    >
      <div className={styles.Radio__in}>
        <input
          id={id || inputId}
          ref={ref}
          {...rest}
          type="radio"
          onChange={changeHandler}
        />

        <RadioIcon className={styles.Radio__icon} />

        {typeof children === 'string'
          ? <Typography variant="text">{children}</Typography>
          : children}
      </div>
    </label>
  );
});
