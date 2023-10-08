import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../Spinner';
import { PageProps, Page } from './Page';

const meta: Meta<PageProps> = {
  title: 'App/Page',
  component: Page,

  args: {
    centered: true,
  },

  argTypes: {
    centered: {
      description: 'Center page content',
    },
    backgroundColor: {
      description: 'Sends web_app_set_background_color event on open page throw @tma.js/sdk-react (if sdk inited and method supports)',
    },
    headerBackgroundColor: {
      description: 'Sends web_app_set_header_color event on open page throw @tma.js/sdk-react (if sdk inited and method supports)',
    },
    withCloseAppConfirmation: {
      description: 'Sends web_app_setup_closing_behavior=true event on open page throw @tma.js/sdk-react (if sdk inited and method supports)',
    },
    shouldExpanded: {
      description: 'Sends web_app_expand event on open page throw @tma.js/sdk-react (if sdk inited and method supports)',
    },
  },
};

export default meta;
type Story = StoryObj<PageProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <Page {...args}>
      <Spinner />
    </Page>
  ),
};
