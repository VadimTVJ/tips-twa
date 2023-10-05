import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '.';
import { Section } from '../Section';
import { ListItemProps } from './ListItem';
import { InfoRows } from '../InfoRows';

const meta: Meta<ListItemProps> = { // todo props instead of typeof
  title: 'Common/ListItem',
  component: ListItem,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
  argTypes: {
    before: { table: { disable: true } },
    after: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<ListItemProps>;

export const Playground: Story = {
  render: ({ ...args }) => {
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
