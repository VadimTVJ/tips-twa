import type { Meta, StoryObj } from '@storybook/react';

import { ElementType } from 'react';
import { Typography, TypographyProps } from './Typography';
import { asPropArgType } from '../../../../.storybook/constants';

const meta: Meta<TypographyProps<'h1'>> = {
  title: 'Common/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    variant: 'h1',
    normalize: true,
    weight: 400,
    as: 'h1',
  },
  argTypes: {
    variant: {
      description: 'Стиль элемента',
    },
    normalize: {
      description: 'Флаг, который убирает стандартные margin-отступы',
    },
    children: {
      description: 'Текст',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    weight: {
      description: 'Насыщенность шрифта',
    },
    as: asPropArgType,
  },
};

export default meta;
type Story = StoryObj<TypographyProps<ElementType>>;

export const Playground: Story = {
  render: ({ ...args }) => <Typography {...args} />,
};
