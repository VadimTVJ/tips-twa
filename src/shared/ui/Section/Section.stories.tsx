import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '.';
import { SectionMode, SectionProps } from './Section';
import { ListItem } from '../ListItem';
import { Radio } from '../Radio';

const meta: Meta<SectionProps> = { // todo props instead of typeof
  title: 'Common/Section',
  component: Section,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    header: 'Section header',
    description: 'Section description',
    mode: SectionMode.COMPACT,
  },
  argTypes: {
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
