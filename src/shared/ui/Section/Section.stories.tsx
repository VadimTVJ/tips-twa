import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './index';
import { SectionMode, SectionProps } from './Section';
import { ListItem } from '../ListItem';
import { Radio } from '../Radio';

const meta: Meta<SectionProps> = {
  title: 'Common/Section',
  component: Section,

  args: {
    header: 'Section header',
    description: 'Section description',
    mode: SectionMode.COMPACT,
  },

  argTypes: {
    header: {
      description: 'Section header',
    },
    description: {
      description: 'Section description',
    },
    mode: {
      description: 'Section mode',
      table: {
        defaultValue: { summary: 'compact' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SectionProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <Section {...args}>
        <ListItem>ListItem</ListItem>
        <ListItem onClick={() => {}}>
          ListItem with action
        </ListItem>
        <Radio>Radio</Radio>
        <Radio disabled>Disabled radio</Radio>
      </Section>
    );
  },
};
