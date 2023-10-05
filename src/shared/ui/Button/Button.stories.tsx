import type { Meta, StoryObj } from '@storybook/react';
import {
  Button, ButtonMode, ButtonProps, ButtonSize,
} from './Button';
import { Section } from '../Section';

const meta: Meta<ButtonProps> = { // todo props instead of typeof
  title: 'Common/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    size: ButtonSize.MEDIUM,
    mode: ButtonMode.PRIMARY,
    stretched: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    mode: {
      control: 'select',
      options: Object.values(ButtonMode),
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Section>
        <Button {...args}>
          Button
        </Button>
      </Section>
    );
  },
};
