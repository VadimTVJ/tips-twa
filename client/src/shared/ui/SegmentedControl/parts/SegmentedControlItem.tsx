import { ComponentPropsWithRef, useId } from 'react';
import styles from '../SegmentedControl.module.scss';
import { Typography } from '../../Typography';

export const SegmentedControlItem = ({
  className, children, ...rest
}: ComponentPropsWithRef<'input'>) => {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={styles.SegmentedControl__option}
    >
      <input
        id={inputId}
        type="radio"
        {...rest}
      />

      <Typography
        variant="subtitle2"
        weight={500}
      >
        {children}
      </Typography>
    </label>
  );
};
