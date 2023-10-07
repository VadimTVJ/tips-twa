import type { Meta, StoryObj } from '@storybook/react';
import { TextField, TextFieldProps } from './TextField';
import { Section } from '../Section';
import { Spinner } from '../Spinner';

const meta: Meta<TextFieldProps<'input' | 'textarea'>> = {
  title: 'Forms/TextField',
  component: TextField,

  args: {
    disabled: false,
  },

  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Is field disabled',
    },
    after: {
      control: 'select',
      description: 'After (right) node, e.g. spinner, button',
      options: ['Unset', 'Loader'],
    },
    as: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<TextFieldProps<'input' | 'textarea'>>;

export const Playground: Story = {
  render: ({ after, ...args }) => {
    return (
      <>
        <Section
          header="Input"
          description="The TextField is a wrapper for the native HTML input/textarea"
        >
          <TextField
            placeholder="First name"
            {...args}
          />
        </Section>

        <Section header="Input with loader">
          <TextField
            placeholder="First name"
            after={<Spinner />}
            {...args}
          />
        </Section>

        <Section header="Textarea with loader">
          <TextField
            placeholder="Last name"
            after={<Spinner />}
            as="textarea"
            {...args}
          />
        </Section>
      </>
    );
  },
};
