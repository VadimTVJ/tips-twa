import type { Meta, StoryObj } from '@storybook/react';

import { Typography, TypographyVariant } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'qqqqggggg',
      control: {
        type: 'select',
      },
      options: Object.values(TypographyVariant),
    },
    normalize: {
      description: 'qqqq',
      control: 'boolean',
      defaultValue: 'true',
    },
    children: {
      control: 'input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = { args: { variant: 'h1', children: 'Hello world' } };
export const H2: Story = { args: { ...H1.args, variant: 'h2' } };
export const H3: Story = { args: { ...H1.args, variant: 'h3' } };
export const subtitle1: Story = { args: { ...H1.args, variant: 'subtitle1' } };
export const subtitle2: Story = { args: { ...H1.args, variant: 'subtitle2' } };
