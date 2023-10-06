import { ReactNode, useEffect } from 'react';

import styles from './ConfigProvider.module.scss';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

type ThemeUnion = `${Theme}`;

export interface ConfigProviderProps {
  children: ReactNode;
  theme?: Theme | ThemeUnion;
}

export const ConfigProvider = ({
  theme = 'light' as ThemeUnion, ...rest
}: ConfigProviderProps) => {
  useEffect(() => {
    const bodyClassName = ['tipsUI', `tipsUI_${theme}`];

    window.document.body.classList.add(...bodyClassName);

    return () => {
      window.document.body.classList.remove(...bodyClassName);
    };
  }, [theme]);

  return (
    <div className={styles.ConfigProvider} {...rest} />
  );
};
