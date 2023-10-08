import type { Meta, StoryObj } from '@storybook/react';
import {
  Button, ButtonMode, ButtonProps, ButtonSize,
} from './Button';
import { Section } from '../Section';

const meta: Meta<ButtonProps> = {
  title: 'Common/Button',
  component: Button,

  args: {
    size: ButtonSize.MEDIUM,
    mode: ButtonMode.PRIMARY,
    stretched: false,
    disabled: false,
  },

  argTypes: {
    size: {
      description: 'Button size',
      control: 'select',
      options: Object.values(ButtonSize),
      table: {
        defaultValue: { summary: 'm' },
      },
    },
    mode: {
      description: 'Button mode',
      control: 'select',
      options: Object.values(ButtonMode),
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    stretched: {
      description: 'Is full width button',
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Is button disabled',
      table: {
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Section
        header="Button component"
        description="The Button is a wrapper for the native HTML button element"
      >
        <Button {...args}>
          Button
        </Button>
      </Section>
    );
  },
};
