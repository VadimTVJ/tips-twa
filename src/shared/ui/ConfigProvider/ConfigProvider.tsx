import { ReactNode } from 'react';

import styles from './ConfigProvider.module.scss';

export interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = (props: ConfigProviderProps) => {
  return (
    <div className={styles.ConfigProvider} {...props} />
  );
};
