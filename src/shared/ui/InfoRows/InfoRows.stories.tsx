import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../Section';
import { InfoRows, InfoRowsProps } from './InfoRows';
import { ListItem } from '../ListItem';
import { Radio } from '../Radio';

const meta: Meta<InfoRowsProps> = {
  title: 'Common/InfoRows',
  component: InfoRows,

  args: {
    primary: 'Primary text',
    secondary: 'Secondary text',
  },

  argTypes: {
    primary: {
      description: 'Primary text',
    },
    secondary: {
      description: 'Secondary text',
    },
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
