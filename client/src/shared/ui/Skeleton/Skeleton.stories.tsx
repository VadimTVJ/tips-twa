import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Section, SectionMode } from '../Section';

const meta: Meta = {
  title: 'Common/Skeleton',
  component: Skeleton,
};

export default meta;
type Story = StoryObj;

export const Playground: Story = {
  render: ({ ...args }) => (
    <Section
      header="Skeleton"
      mode={SectionMode.FULL}
      description="Skeleton width and height passed throw style prop"
    >
      <Skeleton
        style={{ width: 100, height: 100, margin: '12px auto' }}
        {...args}
      />
    </Section>
  ),
};
