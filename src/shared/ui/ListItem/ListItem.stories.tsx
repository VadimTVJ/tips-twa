import type { Meta, StoryObj } from '@storybook/react';
import { ElementType } from 'react';
import { ListItem } from '.';
import { Section } from '../Section';
import { ListItemProps } from './ListItem';
import { InfoRows } from '../InfoRows';

const meta: Meta<ListItemProps<ElementType>> = {
  title: 'Common/ListItem',
  component: ListItem,

  args: {
    disabled: false,
    hasAction: true,
  },

  argTypes: {
    disabled: {
      description: 'Is item disabled',
    },
    before: {
      description: 'Before node (left side), e.g. icon, avatar, InfoRow',
      control: false,
    },
    after: {
      description: 'After node (right side), e.g. icon, avatar, InfoRow',
      control: false,
    },
    hasAction: {
      description: 'Set hasAction if ListItem has some action, e.g. onClick, href. If hasAction is true, an arrow icon will be displayed on the right',
    },
    as: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ListItemProps<ElementType>>;

export const Playground: Story = {
  render: ({ onClick, ...args }) => {
    return (
      <Section>
        <ListItem
          {...args}
        >
          Static ListItem
        </ListItem>

        <ListItem
          as="button"
          onClick={() => console.log('clicked')}
          {...args}
        >
          ListItem with onClick prop
        </ListItem>

        <ListItem
          {...args}
        >
          <InfoRows
            primary="ListItem with InfoRows"
            secondary="Description"
          />
        </ListItem>

        <ListItem
          {...args}
          before={(
            <div style={{
              width: 32,
              height: 32,
              background: 'rgb(227, 227, 227)',
              borderRadius: 4,
            }}
            />
          )}
        >
          <InfoRows
            primary="ListItem with before prop"
            secondary="Description"
          />
        </ListItem>

        <ListItem
          {...args}
          after={(
            <InfoRows
              primary="12$"
              secondary="12:16"
            />
          )}
        >
          ListItem with after prop
        </ListItem>
      </Section>
    );
  },
};
