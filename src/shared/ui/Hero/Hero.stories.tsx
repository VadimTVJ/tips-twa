import type { Meta, StoryObj } from '@storybook/react';
import { Hero, HeroProps } from './Hero';

const meta: Meta<HeroProps> = { // todo props instead of typeof
  title: 'Common/Hero',
  component: Hero,
  parameters: {
    docs: {
      description: {
        component: 'Компонент-надрстройка над нативным input[type=radio]',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    heading: 'Hello world!',
    subheading: 'Описание',
    filled: false,
    stretched: false,
    icon: true,
  },
  argTypes: {
    heading: {
      // todo добавить пометку, что может принимать ReactNode - если стринг,
      //  то оборачивается в типографию
      description: 'Заголовок',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    subheading: {
      description: 'Подпись',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    icon: {
      control: 'boolean',
      description: 'qqq',
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
      />
    );
  },
};
