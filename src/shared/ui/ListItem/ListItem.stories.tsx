import type { Meta, StoryObj } from '@storybook/react';
import { ListItem, ListItemProps } from './ListItem';
import { Section } from '../Section';
import { InfoRows } from '../InfoRows';

const meta: Meta<ListItemProps> = {
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
    hasAction: {
      description: 'Set hasAction if ListItem has some action, e.g. onClick, href. If hasAction is true, an arrow icon will be displayed on the right',
    },
  },
};

export default meta;
type Story = StoryObj<ListItemProps>;

export const Playground: Story = {
  render: ({ onClick, ...args }) => {
    return (
      <>
        <Section>
          <ListItem {...args}>
            Static ListItem
          </ListItem>

          <ListItem {...args}>
            <InfoRows
              primary="ListItem with InfoRows"
              secondary="Description"
            />
          </ListItem>

          <ListItem {...args}>
            <ListItem.Side>
              <div style={{
                width: 32,
                height: 32,
                background: 'rgb(227, 227, 227)',
                borderRadius: 4,
              }}
              />
            </ListItem.Side>
            <ListItem.Body>
              <InfoRows
                primary="Rich ListItem"
                secondary="Description"
              />
            </ListItem.Body>
            <ListItem.Side side="right">
              <InfoRows
                primary="12$"
                secondary="12:16"
              />
            </ListItem.Side>
          </ListItem>
        </Section>

        <Section>
          <ListItem asChild {...args}>
            <a
              href="https://i.imgur.com/fJDSm0v.png"
              target="_blank"
              rel="noreferrer"
            >
              ListItem as link
            </a>
          </ListItem>
        </Section>
      </>
    );
  },
};
