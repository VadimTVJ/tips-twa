import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../Section';
import { InfoRows, InfoRowsProps } from './InfoRows';
import { ListItem } from '../ListItem';
import { Radio } from '../Radio';

const meta: Meta<InfoRowsProps> = { // todo props instead of typeof
  title: 'Common/InfoRows',
  component: InfoRows,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    primary: 'Primary text',
    secondary: 'Secondary text',
  },
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<InfoRowsProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <Section>
          <InfoRows {...args} />
        </Section>

        <Section>
          <ListItem>
            <InfoRows {...args} />
          </ListItem>
          <Radio>
            <InfoRows {...args} />
          </Radio>
          <ListItem
            after={<InfoRows {...args} />}
          >
            After ListItem
          </ListItem>
        </Section>
      </>
    );
  },
};
