import {
  ElementType, MouseEvent, ReactNode,
} from 'react';

import { clsx } from 'clsx';
import styles from './ListItem.module.scss';
import { PolymorphicComponentProp } from '../generics';
import { Component } from '../Component';
import Icon from '../../../pages/PageHome/Icon.svg?react';
import { InfoRows } from '../InfoRows';

export type ListItemProps<C extends ElementType> = PolymorphicComponentProp<C, {
  before?: ReactNode;
  after?: ReactNode;
  disabled?: boolean;
}>;

// todo убедиться что все полиморф компоненты норм вынесен тип
export const ListItem = <C extends ElementType>({
  className, children, before, after, disabled, onClick: onClickProp, ...rest
}: ListItemProps<C>) => {
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
