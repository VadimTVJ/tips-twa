import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioProps } from './Radio';
import { Section } from '../Section';

const meta: Meta<RadioProps> = { // todo props instead of typeof
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
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
      <Section>
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
