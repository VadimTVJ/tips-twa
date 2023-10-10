import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioProps } from './Radio';
import { Section } from '../Section';

const meta: Meta<RadioProps> = {
  title: 'Forms/Radio',
  component: Radio,

  argTypes: {
    withHaptic: {
      description: 'Send web_app_trigger_haptic_feedback event (selectionChanged) on change throw @tma.js/sdk-react (if sdk inited and method supports)',
      table: {
        defaultValue: { summary: false },
        control: false,
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState<string>('first');

    const values = [
      { value: 'first', children: 'First value' },
      { value: 'second', children: 'Second value' },
      { value: 'disabled', children: 'Disabled value', disabled: true },
    ];

    return (
      <Section
        header="Radio component"
        description="The Radio is a wrapper for the native HTML input[type=radio] element"
      >
        {values.map((props) => (
          <Radio
            checked={props.value === value}
            onChange={({ target }) => setValue(target.value)}
            {...props}
          />
        ))}
      </Section>
    );
  },
};
