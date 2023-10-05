import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { SegmentedControl, SegmentedControlProps } from './SegmentedControl';
import { Section } from '../Section';

const meta: Meta<SegmentedControlProps> = {
  title: 'Common/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SegmentedControlProps>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('first');

    return (
      <Section
        header="SegmentedControl"
        description="Является надстройкой над input[type=radio]"
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
