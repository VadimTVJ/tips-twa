import { ComponentType } from 'react';
import { ConfigProvider } from '../../shared/ui';

export const withUIKit = (Component: ComponentType) => () => (
  <ConfigProvider>
    <Component />
  </ConfigProvider>
);
