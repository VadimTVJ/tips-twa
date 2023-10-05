import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';
import { Section } from '../Section';

const meta: Meta<SegmentedControlProps> = {
  title: 'Common/SegmentedControl',
  component: SegmentedControl,

  argTypes: {
    items: {
      description: 'Array of items',
      control: false,
    },
    name: {
      description: 'HTML attribute "name", which is thrown for each input [type=radio]',
    },
    onChange: {
      description: 'onChange handler',
    },
    value: {
      description: 'SegmentedControl value',
    },
  },
};

export default meta;
type Story = StoryObj<SegmentedControlProps>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('first');

    return (
      <Section
        header="SegmentedControl component"
        description="The SegmentedControl is a wrapper for the native HTML input[type=radio] elements"
      >
        <SegmentedControl
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          items={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
            { label: 'Third', value: 'third' },
          ]}
        />
      </Section>
    );
  },
};
