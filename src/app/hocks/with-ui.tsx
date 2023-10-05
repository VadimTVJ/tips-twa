import { ComponentType } from 'react';
import { ConfigProvider } from '../../shared/ui';

export const withUIKit = (Component: ComponentType) => () => (
  <ConfigProvider theme="light">
    <Component />
  </ConfigProvider>
);
