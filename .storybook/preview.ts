import type { Preview } from '@storybook/react';

import '../src/app/styles/index.scss';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withUIWrapper } from './decoratots';
import { Theme } from '../src/shared/ui';

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
    cartesian: { disabled: true },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: 'sun',
        items: [
          { value: Theme.LIGHT, title: 'Light Telegram theme' },
          { value: Theme.DARK, title: 'Dark Telegram theme' },
        ],
        title: 'Theme',
        dynamicTitle: true,
      },
    },
  },
  argTypes: {
    ref: { control: false, table: { disable: true } },
  },
  decorators: [withUIWrapper],
};

export default preview;
