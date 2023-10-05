import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ConfigProvider, ConfigProviderProps } from './ConfigProvider';
import { Section } from '../Section';
import { Hero } from '../Hero';
import { ListItem } from '../ListItem';
import { Radio } from '../Radio';
import { SegmentedControl } from '../SegmentedControl';

const meta: Meta<ConfigProviderProps> = {
  title: 'App/ConfigProvider',
  component: ConfigProvider,

  args: {
    theme: 'light',
  },

  argTypes: {
  },
};

export default meta;
type Story = StoryObj<ConfigProviderProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    const [value, setValue] = useState('item1');

    return (
      <ConfigProvider {...args}>
        <Hero
          heading="Hero heading"
          subheading="Hero subheading"
        />

        <Section>
          <ListItem>ListItem</ListItem>
          <Radio>Radio</Radio>
        </Section>

        <Section>
          <SegmentedControl
            value={value}
            onChange={(newValue) => setValue(newValue as string)}
            items={[
              { label: 'Item 1', value: 'item1' },
              { label: 'Item 2', value: 'item2' },
            ]}
          />
        </Section>
      </ConfigProvider>
    );
  },
};
