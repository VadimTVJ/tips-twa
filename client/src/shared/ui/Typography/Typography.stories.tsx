import type { Meta, StoryObj } from '@storybook/react';

import { Typography, TypographyProps } from './Typography';
import { Section } from '../Section';

const meta: Meta<TypographyProps> = {
  title: 'Common/Typography',
  component: Typography,

  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    variant: 'h1',
    normalize: true,
    weight: 400,
    as: 'span',
  },

  argTypes: {
    variant: {
      description: 'The variant to use',
    },
    normalize: {
      description: 'Reset browser\'s margins',
    },
    children: {
      description: 'Text or children component',
    },
    weight: {
      description: 'Weight (or boldness) of the font',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <Section>
      <Typography {...args} />
    </Section>
  ),
};
