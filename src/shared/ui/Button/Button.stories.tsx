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
    withHaptic: {
      description: 'Send web_app_trigger_haptic_feedback event (selectionChanged) on click throw @tma.js/sdk-react (if sdk inited and method supports)',
      table: {
        defaultValue: { summary: false },
        control: false,
      },
    },
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
      <>
        <Section
          header="Button component"
          description="The Button is a wrapper for the native HTML button element"
        >
          <Button {...args}>
            Button
          </Button>
        </Section>

        <Section
          header="Button component as anchor"
          description="Wrap anchor into Button component and add asChild prop"
        >
          <Button {...args} asChild>
            <a
              href="https://i.imgur.com/KFEnxtU.png"
              target="_blank"
              rel="noreferrer"
            >
              Im link!
            </a>
          </Button>
        </Section>
      </>
    );
  },
};
