import { Decorator } from '@storybook/react';
import { ConfigProvider } from '../src/shared/ui';

export const withUIWrapper: Decorator = (Component, context) => {
  const { theme } = context.globals;

  return (
    <ConfigProvider theme={theme}>
      <Component />
    </ConfigProvider>
  );
};
