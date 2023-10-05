import type { Meta, StoryObj } from '@storybook/react';
import { Spinner, SpinnerProps } from './Spinner';

const meta: Meta<SpinnerProps> = {
  title: 'Common/Spinner',
  component: Spinner,
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {
  render: ({ ...args }) => <Spinner {...args} />,
};
