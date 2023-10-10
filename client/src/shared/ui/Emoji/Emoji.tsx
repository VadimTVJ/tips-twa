import { ComponentPropsWithRef, CSSProperties, forwardRef } from 'react';

import { clsx } from 'clsx';
import styles from './Emoji.module.scss';

export interface EmojiProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  emoji: string | number;
  size?: number;
}

export const Emoji = forwardRef<HTMLSpanElement, EmojiProps>(({
  className, size = 24, emoji, style, ...rest
}, ref) => {
  const rootClassName = clsx(className, styles.Emoji);

  return (
    <span
      className={rootClassName}
      ref={ref}
      style={{
        ...style,
        '--Emoji_size': typeof size === 'string'
          ? size
          : `${size}px`,
      } as CSSProperties}
      {...rest}
    >
      {emoji}
    </span>
  );
});
