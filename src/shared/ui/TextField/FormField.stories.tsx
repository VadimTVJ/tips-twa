import type { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldProps } from './TextField';
import { Section } from '../Section';
import { Spinner } from '../Spinner';

const meta: Meta<TextFieldProps<'input' | 'textarea'>> = { // todo props instead of typeof
  title: 'Forms/FormField',
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=text], textarea',
      },
    },
  },
  tags: ['autodocs'], // todo section desc instead of autodocs
  args: {
    disabled: false,
    after: 'Unset',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Флаг, который убирает стандартные margin-отступы',
    },
    after: {
      control: 'select',
      description: 'after node example',
      options: ['Unset', 'Loader'],
    },
  },
};

export default meta;
type Story = StoryObj<TextFieldProps<'input' | 'textarea'>>;

export const Playground: Story = {
  render: ({ after, ...args }) => {
    return (
      <Section
        header="Account details"
      >
        <TextField
          placeholder="First name"
          after={after === 'Loader' ? <Spinner /> : undefined}
          {...args}
        />
      </Section>
    );
  },
};
