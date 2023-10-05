import { ComponentPropsWithRef, useEffect } from 'react';

import { clsx } from 'clsx';
import styles from './ConfigProvider.module.scss';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeUnion = `${Theme}`;

// todo
interface ConfigProviderProps extends ComponentPropsWithRef<'div'> {
  theme: Theme | ThemeUnion;
}

export const ConfigProvider = ({
  className, theme = 'dark', ...rest
}: ConfigProviderProps) => {
  const rootClassName = clsx(
    className,
    styles.ConfigProvider,
  );

  useEffect(() => {
    const bodyClassName = `tipsUI_${theme}`;

    window.document.body.classList.add(bodyClassName);

    return () => {
      window.document.body.classList.remove(bodyClassName);
    };
  }, [theme]);

  return (
    <div className={rootClassName} {...rest} />
  );
};
