import type { Meta, StoryObj } from '@storybook/react';
import { Hero, HeroProps } from './Hero';
import { Button } from '../Button';

const meta: Meta<HeroProps> = {
  title: 'Common/Hero',
  component: Hero,

  args: {
    heading: 'Hello world!',
    subheading: 'Описание',
    filled: false,
    stretched: false,
    icon: true,
  },

  argTypes: {
    heading: {
      description: 'Hero heading',
    },
    subheading: {
      description: 'Hero subheading',
    },
    filled: {
      description: 'Fill Hero to content background',
      table: {
        defaultValue: { summary: false },
      },
    },
    stretched: {
      description: 'Stretch hero to full available height',
      table: {
        defaultValue: { summary: false },
      },
    },
    icon: {
      control: 'boolean',
      description: 'Hero icon',
    },
  },
};

export default meta;
type Story = StoryObj<HeroProps>;

export const Playground: Story = {
  render: ({ icon, ...args }) => {
    return (
      <Hero
        icon={icon && (
        <div style={{
          width: 64, height: 64, borderRadius: 12, background: '#e3e3e3',
        }}
        />
        )}
        {...args}
      >
        <Button>
          Hero action
        </Button>
      </Hero>
    );
  },
};
