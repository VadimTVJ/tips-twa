import type { Preview } from '@storybook/react';

import '../src/app/styles/index.scss';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withUIWrapper } from './decoratots';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
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
      defaultValue: 'light',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light Telegram theme' },
          { value: 'dark', title: 'Dark Telegram theme' },
        ],
        title: 'Theme',
        dynamicTitle: true,
      },
    },
  },
  argTypes: {
    ref: { table: { disable: true } },
  },
  decorators: [withUIWrapper],
};

export default preview;
