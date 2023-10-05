import {
  ElementType, MouseEvent, ReactNode,
} from 'react';

import { clsx } from 'clsx';
import styles from './ListItem.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';
import Icon from '../../../pages/PageHome/Icon.svg?react';
import { InfoRows } from '../InfoRows';

export interface ListItemProps {
  before?: ReactNode;
  after?: ReactNode;
  disabled?: boolean;
}

export const ListItem = <C extends ElementType>({
  className, children, before, after, disabled, onClick: onClickProp, ...rest
}: PolymorphicComponentProp<C, ListItemProps>) => {
  const hasAction = onClickProp;

  const rootClassName = clsx(className, styles.ListItem, {
    [styles.ListItem_interactive]: hasAction,
    [styles.ListItem_disabled]: disabled,
  });

  const onClick = (e: MouseEvent<ElementType>) => {
    if (disabled) { return; }

    onClickProp?.(e);
  };

  return (
    <Component
      className={rootClassName}
      onClick={onClick}
      {...rest}
    >
      {before && <div className={styles.ListItem__before}>{before}</div>}
      <div className={styles.ListItem__content}>
        {typeof children === 'string'
          ? <InfoRows className={styles.ListItem__content} primary={children} />
          : children}
      </div>
      {after && <div className={styles.ListItem__after}>{after}</div>}

      {hasAction && <Icon className={styles.ListItem__arrow} />}
    </Component>
  );
};
